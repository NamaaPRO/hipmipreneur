# Hipmipreneur

AI-powered entrepreneurship platform to turn your ideas into businesses.

## 🚀 Features

- **AI Analysis** - Validate your idea with AI
- **Business Canvas** - Generate business model canvas
- **Buyer Persona** - Create ideal customer profiles  
- **Roadmap** - Step-by-step execution plan
- **Investor Deck** - Auto-generate pitch deck

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **AI:** OpenRouter (FREE models - Llama 3.1, Gemma, Mistral)
- **Database:** Supabase (PostgreSQL + Auth)

## ⚡️ Quick Start

```bash
# Clone
git clone https://github.com/NamaaPRO/hipmipreneur.git
cd hipmipreneur

# Install
npm install

# Setup environment
cp .env.local.example .env.local
# Add your keys:
# - Supabase URL & anon key from supabase.com
# - OpenRouter API key from openrouter.ai (FREE credits)

# Run
npm run dev
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `OPENROUTER_API_KEY` | Get free key at openrouter.ai/credits |

## 📦 API Routes

| Endpoint | Description |
|----------|-------------|
| `/api/analyze` | AI analysis of idea |
| `/api/canvas` | Business Model Canvas |
| `/api/persona` | Buyer Persona |
| `/api/roadmap` | Execution Roadmap |
| `/api/deck` | Investor Pitch Deck |

## 🤖 Free AI Models

Default: `meta-llama/llama-3.1-8b-instruct`

Other available free models:
- `google/gemma-2-9b-it`
- `mistralai/mistral-7b-instruct`
- `anthropic/claude-3-haiku`


## 📄 License

MIT
