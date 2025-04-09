import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPomodoroSessionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { setupAuth } from "./auth";

// Middleware to ensure user is authenticated
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized - Please login" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app);
  
  // Pomodoro session routes - restricted to authenticated users
  app.post("/api/pomodoro-sessions", ensureAuthenticated, async (req: Request, res: Response) => {
    try {
      // Add the current user ID to the session data
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User ID not found" });
      }
      
      const sessionData = insertPomodoroSessionSchema.parse({
        ...req.body,
        userId
      });
      
      const session = await storage.createPomodoroSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error creating pomodoro session:", error);
        res.status(500).json({ error: "Failed to create pomodoro session" });
      }
    }
  });

  app.get("/api/pomodoro-sessions", ensureAuthenticated, async (req: Request, res: Response) => {
    try {
      // Get only the current user's sessions
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User ID not found" });
      }
      
      const sessions = await storage.getPomodoroSessionsByUserId(userId);
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Error fetching pomodoro sessions:", error);
      res.status(500).json({ error: "Failed to fetch pomodoro sessions" });
    }
  });

  app.patch("/api/pomodoro-sessions/:id/complete", ensureAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid session ID" });
      }
      
      // Verify ownership of the session
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User ID not found" });
      }
      
      const session = await storage.getPomodoroSessionById(id);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      if (session.userId !== userId) {
        return res.status(403).json({ error: "Forbidden - You don't own this session" });
      }
      
      const completed = req.body.completed === true;
      const updatedSession = await storage.updatePomodoroSessionCompleted(id, completed);
      
      res.status(200).json(updatedSession);
    } catch (error) {
      console.error("Error updating pomodoro session:", error);
      res.status(500).json({ error: "Failed to update pomodoro session" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
