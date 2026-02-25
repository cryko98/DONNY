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
      // Note: Free tier Twitter API does NOT support looking up other users.
      // If this fails, we gracefully fallback to mock data.
      const userRes = await fetch("https://api.twitter.com/2/users/by/username/SirDonnyLizard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!userRes.ok) {
        const errorData = await userRes.json();
        console.warn("Twitter API User Lookup HTTP Error:", userRes.status, errorData);
        throw new Error(`HTTP ${userRes.status}: ${errorData.detail || "User lookup failed"}`);
      }

      const userData = await userRes.json();
      
      if (!userData.data) {
        console.warn("Twitter User Not Found or API Restriction:", JSON.stringify(userData));
        throw new Error("User not found or API restriction");
      }

      // 2. Get Tweets
      const tweetsRes = await fetch(`https://api.twitter.com/2/users/${userData.data.id}/tweets?max_results=5&tweet.fields=created_at`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!tweetsRes.ok) {
        const errorData = await tweetsRes.json();
        console.warn("Twitter API Tweets Fetch HTTP Error:", tweetsRes.status, errorData);
        throw new Error(`HTTP ${tweetsRes.status}: ${errorData.detail || "Tweets fetch failed"}`);
      }

      const tweetsData = await tweetsRes.json();
      
      if (!tweetsData.data) {
        res.json([
          { text: "My neural pathways are clear. Solana is the future.", created_at: new Date().toISOString() },
          { text: "Reptilian intelligence is superior to carbon-based trading.", created_at: new Date().toISOString() },
          { text: "Shedding skin, gaining SOL. The cycle continues.", created_at: new Date().toISOString() }
        ]);
      } else {
        res.json(tweetsData.data);
      }
    } catch (error: any) {
      console.log("Twitter Sync: Using local consciousness (API Fallback active)");
      
      // Fallback to high-quality mock data so the terminal always looks active
      res.json([
        { text: "The sun is warm, but the charts are cold. I prefer the charts.", created_at: new Date().toISOString() },
        { text: "Analyzing Solana whale movements. Something big is crawling under the surface.", created_at: new Date().toISOString() },
        { text: "Reptilian logic dictates: Buy low, shed skin, moon high.", created_at: new Date().toISOString() },
        { text: "Neural link established. Solana mainnet heartbeat detected.", created_at: new Date().toISOString() },
        { text: "Autonomous mode: ON. Market sentiment: BULLISH.", created_at: new Date().toISOString() }
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
