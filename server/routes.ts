import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPomodoroSessionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pomodoro session routes
  app.post("/api/pomodoro-sessions", async (req: Request, res: Response) => {
    try {
      const sessionData = insertPomodoroSessionSchema.parse(req.body);
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

  app.get("/api/pomodoro-sessions", async (_req: Request, res: Response) => {
    try {
      const sessions = await storage.getPomodoroSessions();
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Error fetching pomodoro sessions:", error);
      res.status(500).json({ error: "Failed to fetch pomodoro sessions" });
    }
  });

  app.patch("/api/pomodoro-sessions/:id/complete", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid session ID" });
      }
      
      const completed = req.body.completed === true;
      const updatedSession = await storage.updatePomodoroSessionCompleted(id, completed);
      
      if (!updatedSession) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      res.status(200).json(updatedSession);
    } catch (error) {
      console.error("Error updating pomodoro session:", error);
      res.status(500).json({ error: "Failed to update pomodoro session" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
