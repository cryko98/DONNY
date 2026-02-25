import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route to fetch tweets
  app.get("/api/tweets", async (req, res) => {
    const token = process.env.TWITTER_BEARER_TOKEN;
    
    if (!token) {
      // Fallback mock data if no token is provided
      return res.json([
        { text: "The sun is warm, but the charts are cold. I prefer the charts.", created_at: new Date().toISOString() },
        { text: "Analyzing Solana whale movements. Something big is crawling under the surface.", created_at: new Date().toISOString() },
        { text: "Reptilian logic dictates: Buy low, shed skin, moon high.", created_at: new Date().toISOString() }
      ]);
    }

    try {
      // 1. Get User ID for SirDonnyLizard
      const userRes = await fetch("https://api.twitter.com/2/users/by/username/SirDonnyLizard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      
      if (!userData.data) {
        console.error("Twitter User Lookup Failed:", userData);
        throw new Error(userData.errors?.[0]?.detail || "User not found");
      }

      // 2. Get Tweets
      const tweetsRes = await fetch(`https://api.twitter.com/2/users/${userData.data.id}/tweets?max_results=5&tweet.fields=created_at`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const tweetsData = await tweetsRes.json();
      
      if (!tweetsData.data && tweetsData.errors) {
        console.error("Twitter Tweets Fetch Failed:", tweetsData);
        throw new Error(tweetsData.errors?.[0]?.detail || "Failed to fetch tweets");
      }

      res.json(tweetsData.data || []);
    } catch (error: any) {
      console.error("Twitter API Error:", error.message);
      
      // Fallback to mock data on ANY API error so the UI doesn't break
      res.json([
        { text: "The sun is warm, but the charts are cold. I prefer the charts.", created_at: new Date().toISOString() },
        { text: "Analyzing Solana whale movements. Something big is crawling under the surface.", created_at: new Date().toISOString() },
        { text: "Reptilian logic dictates: Buy low, shed skin, moon high.", created_at: new Date().toISOString() }
      ]);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
