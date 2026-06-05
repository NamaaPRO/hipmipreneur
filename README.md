# Hipmipreneur

AI-powered entrepreneurship platform.

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/NamaaPRO/hipmipreneur.git
cd hipmipreneur

# Install
npm install

# Setup Supabase
# 1. Go to supabase.com
# 2. Create new project
# 3. Run SQL from database/schema.sql in SQL Editor
# 4. Get URL and anon key

# Setup Environment
cp .env.local.example .env.local
# Fill in your keys

# Run
npm run dev
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes / Flask (Python)
- **AI:** OpenRouter (FREE models)
- **Database:** Supabase (PostgreSQL)

## 📁 Project Structure

```
hipmipreneur/
├── app/                    # Next.js app router
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Dashboard pages
│   └── api/                # API routes
├── components/             # React components
│   └── ui/                 # UI components
├── lib/                    # Utilities
│   ├── supabase.ts         # Supabase client
│   └── openrouter.ts       # OpenRouter AI
├── backend/                # Python Flask backend
│   ├── main.py
│   ├── routes/
│   └── ai.py
└── database/
    └── schema.sql          # Database schema
```


## 🔧 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analyze` | POST | AI idea analysis |
| `/api/canvas` | POST | Business Model Canvas |
| `/api/persona` | POST | Buyer Persona |
| `/api/roadmap` | POST | Execution Roadmap |
| `/api/deck` | POST | Investor Pitch Deck |

## 🤖 Free AI Models


Default: `meta-llama/llama-3.1-8b-instruct`

Other free models:
- `google/gemma-2-9b-it`
- `mistralai/mistral-7b-instruct`
- `anthropic/claude-3-haiku`

## 📄 License

MIT
