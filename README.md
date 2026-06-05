# Hipmipreneur

AI-powered entrepreneurship platform.

## 🚀 Quick Start

### Using Docker

```bash
# Clone and setup
git clone https://github.com/NamaaPRO/hipmipreneur.git
cd hipmipreneur

# Copy environment file
cp .env.local.example .env.local
# Fill in your API keys

# Start all services
docker-compose up
```

### Manual Setup

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

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| Next.js | 3000 | Frontend |
| Flask | 5000 | Python AI Backend |
| PostgreSQL | 5432 | Database |

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes / Flask (Python)
- **AI:** OpenRouter (FREE models)
- **Database:** Supabase (PostgreSQL)
- **Docker:** Multi-stage builds

## 📁 Project Structure

```
hipmipreneur/
├── app/                    # Next.js app router
├── components/             # React components
├── lib/                    # Utilities
├── types/                  # TypeScript types
├── backend/                # Python Flask backend
├── database/               # Database schema
└── Dockerfile              # Docker configuration
```

## 🤖 Free AI Models

Default: `meta-llama/llama-3.1-8b-instruct`

Other free models:
- `google/gemma-2-9b-it`
- `mistralai/mistral-7b-instruct`
- `anthropic/claude-3-haiku`

## 📄 License

MIT
