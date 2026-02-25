# Donny the Lizard - Solana AI Agent

This project is a React + Vite application featuring Donny the Lizard, an autonomous AI agent on Solana.

## Vercel Deployment

This project is 100% compatible with Vercel. To deploy:

1. **Push to GitHub/GitLab/Bitbucket.**
2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your repository.
   - Vercel will automatically detect **Vite** as the Framework Preset.
3. **Environment Variables:**
   - If you use the Gemini API features, add `GEMINI_API_KEY` to your Vercel Project Settings under "Environment Variables".
4. **Deploy!**

## Local Development

```bash
npm install
npm run dev
```

## Features

- **Twitter Timeline:** Real-time feed from @SirDonnyLizard.
- **Responsive UI:** Built with Tailwind CSS 4.
- **Animations:** Powered by Motion.
- **SPA Routing:** Configured via `vercel.json`.
