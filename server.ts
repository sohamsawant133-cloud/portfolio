import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const { message } = req.body;
      const systemInstruction = 
        "You are an AI assistant for Soham Sawant's personal portfolio. " +
        "You know that Soham is a Diploma student in Computer Engineering at DKTE YCP. " +
        "Keep your answers helpful, strictly professional, concise, and related to Soham or his portfolio items: " +
        "skills (C, C++, Java, Python, HTML, DBMS), hobbies (Cricket, AI, Music, Gaming), education (Aadarsh Vidya Mandir, DKTE YCP).";

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: systemInstruction + "\n\nUser Question: " + message }] }
        ]
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
