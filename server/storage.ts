import { 
  users, 
  type User, 
  type InsertUser, 
  pomodoroSessions, 
  type PomodoroSession, 
  type InsertPomodoroSession, 
  type SessionType 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Pomodoro session methods
  createPomodoroSession(session: InsertPomodoroSession): Promise<PomodoroSession>;
  getPomodoroSessions(): Promise<PomodoroSession[]>;
  updatePomodoroSessionCompleted(id: number, completed: boolean): Promise<PomodoroSession | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Pomodoro session methods
  async createPomodoroSession(session: InsertPomodoroSession): Promise<PomodoroSession> {
    const [newSession] = await db.insert(pomodoroSessions).values(session).returning();
    return newSession;
  }
  
  async getPomodoroSessions(): Promise<PomodoroSession[]> {
    return await db.select()
      .from(pomodoroSessions)
      .orderBy(desc(pomodoroSessions.timestamp))
      .limit(100); // Limit to prevent huge result sets
  }
  
  async updatePomodoroSessionCompleted(id: number, completed: boolean): Promise<PomodoroSession | undefined> {
    const [updatedSession] = await db
      .update(pomodoroSessions)
      .set({ completed })
      .where(eq(pomodoroSessions.id, id))
      .returning();
    return updatedSession;
  }
}

export const storage = new DatabaseStorage();
