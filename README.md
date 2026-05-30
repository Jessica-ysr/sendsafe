# SendSafe

**Send with confidence, not regret.**

SendSafe is an AI-powered conflict detection tool that analyzes your messages before you send them. It detects aggressive tone, flags problematic phrases, and rewrites your message in a calmer version — so you never send something you'll regret.

🔗 **Live Demo**: [sendsafe-neon.vercel.app](https://sendsafe-neon.vercel.app)

---

## What it does

- Analyzes any message, email, or text for conflict potential
- Returns a conflict score from 0 to 100
- Highlights specific phrases causing the conflict
- Generates a calmer rewrite while preserving your intent
- Tracks live stats — messages analyzed and conflicts prevented

---

## Tech Stack

**Frontend**
- React
- CSS-in-JS with custom design system
- Deployed on Vercel

**Backend**
- Python + FastAPI
- Groq API (LLaMA 3.3 70B) for AI analysis
- Deployed on Render

---

## How it works

1. User pastes a message into the input panel
2. React sends it to the FastAPI backend
3. Backend sends it to Groq's LLaMA model with a structured prompt
4. AI returns conflict score, flagged phrases, and a rewrite
5. Results display instantly in the analysis panel

---

## Run locally

**Backend**
```bash
cd sendsafe-backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd sendsafe
npm install
npm start
```

Set your Groq API key as an environment variable: GROQ_API_KEY=your_key_here

---

## Built by

Jessica — 3rd year CSE student at Sathyabama University  
Full Stack + AI/ML path  
[LinkedIn](#) | [GitHub](https://github.com/Jessica-ysr)
