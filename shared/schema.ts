import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Pomodoro Session types
export const sessionTypes = ["work", "break", "longBreak"] as const;
export type SessionType = (typeof sessionTypes)[number];

export const pomodoroSessions = pgTable("pomodoro_sessions", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: sessionTypes }).notNull(),
  name: text("name").notNull(),
  duration: integer("duration").notNull(), // in milliseconds
  completed: boolean("completed").notNull().default(false),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  // We could add a foreign key to users if we implement authentication
});

export const insertPomodoroSessionSchema = createInsertSchema(pomodoroSessions).pick({
  type: true,
  name: true,
  duration: true,
  completed: true,
});

export type InsertPomodoroSession = z.infer<typeof insertPomodoroSessionSchema>;
export type PomodoroSession = typeof pomodoroSessions.$inferSelect;
