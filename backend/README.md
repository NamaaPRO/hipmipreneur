# Hipmipreneur Python Backend

Flask-based AI backend for Hipmipreneur platform.

## 🚀 Quick Start

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\\Scripts\\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Set environment
cp .env.example .env
# Add OPENROUTER_API_KEY

# Run
python run.py
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analyze` | POST | Analyze business idea |
| `/api/canvas` | POST | Generate business canvas |
| `/api/persona` | POST | Generate buyer persona |
| `/api/roadmap` | POST | Generate roadmap |
| `/api/deck` | POST | Generate pitch deck |

## 🔑 Environment Variables

```env
OPENROUTER_API_KEY=your_api_key
```
