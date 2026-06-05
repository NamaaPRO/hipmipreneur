# Hipmipreneur Python Backend
# AI-powered business analysis using OpenRouter

import os
import json
import requests
from typing import Optional
from dataclasses import dataclass

# OpenRouter API
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# Free models
FREE_MODELS = [
    "meta-llama/llama-3.1-8b-instruct",
    "google/gemma-2-9b-it",
    "mistralai/mistral-7b-instruct",
]

DEFAULT_MODEL = FREE_MODELS[0]


@dataclass
class AnalysisResult:
    summary: str
    validation_score: int
    market_size: str
    competitors: list
    risks: list
    opportunities: list


class AIBackend:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or OPENROUTER_API_KEY
        self.model = DEFAULT_MODEL
    
    def _call_api(self, messages: list, model: str = None) -> str:
        """Call OpenRouter API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://hipmipreneur.com",
            "X-Title": "Hipmipreneur",
        }
        
        payload = {
            "model": model or self.model,
            "messages": messages,
            "max_tokens": 2000,
        }
        
        response = requests.post(
            f"{OPENROUTER_BASE_URL}/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
        )
        
        if response.status_code != 200:
            raise Exception(f"API Error: {response.text}")
        
        return response.json()["choices"][0]["message"]["content"]
    
    def analyze_idea(self, idea: str) -> AnalysisResult:
        """Analyze a business idea"""
        system_prompt = """You are IVA, an expert startup consultant. Analyze the business idea and respond in JSON format:
{
  "summary": "2-3 sentence overview",
  "validation_score": 75,
  "market_size": "TAM/SAM/SOM in millions",
  "competitors": ["competitor1", "competitor2"],
  "risks": ["risk1"],
  "opportunities": ["opportunity1"]
}"""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": idea}
        ]
        
        result = self._call_api(messages)
        data = json.loads(result)
        
        return AnalysisResult(
            summary=data.get("summary", ""),
            validation_score=data.get("validation_score", 50),
            market_size=data.get("market_size", ""),
            competitors=data.get("competitors", []),
            risks=data.get("risks", []),
            opportunities=data.get("opportunities", [])
        )
    
    def generate_canvas(self, idea: str, analysis: dict) -> dict:
        """Generate Business Model Canvas"""
        system_prompt = """Generate a Business Model Canvas in JSON:
{
  "value_propositions": ["value prop 1"],
  "customer_segments": ["segment 1"],
  "channels": ["channel 1"],
  "customer_relationships": ["relationship 1"],
  "revenue_streams": ["revenue stream 1"],
  "key_resources": ["resource 1"],
  "key_activities": ["activity 1"],
  "key_partnerships": ["partner 1"],
  "cost_structure": ["cost 1"]
}"""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Idea: {idea}\nAnalysis: {json.dumps(analysis)}"}
        ]
        
        result = self._call_api(messages)
        return json.loads(result)
    
    def generate_persona(self, idea: str) -> dict:
        """Generate Buyer Persona"""
        system_prompt = """Create a buyer persona in JSON:
{
  "name": "persona name",
  "age": 35,
  "job_title": "job title",
  "goals": ["goal 1"],
  "pain_points": ["pain point 1"],
  "motivations": ["motivation 1"],
  "preferred_channels": ["channel 1"],
  "objection_icons": ["icon 1"],
  "budget_range": "$X-$Y/month"
}"""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"For business: {idea}"}
        ]
        
        result = self._call_api(messages)
        return json.loads(result)
    
    def generate_roadmap(self, idea: str) -> dict:
        """Generate Execution Roadmap"""
        system_prompt = """Create an execution roadmap in JSON:
{
  "phases": [
    {"phase": "Phase 1: Discovery", "duration": "2 weeks", "tasks": ["task 1"], "milestones": ["milestone 1"]},
    {"phase": "Phase 2: Validation", "duration": "3 weeks", "tasks": ["task 1"], "milestones": ["milestone 1"]},
    {"phase": "Phase 3: MVP", "duration": "4 weeks", "tasks": ["task 1"], "milestones": ["milestone 1"]},
    {"phase": "Phase 4: Scale", "duration": "ongoing", "tasks": ["task 1"], "milestones": ["milestone 1"]}
  ]
}"""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"For: {idea}"}
        ]
        
        result = self._call_api(messages)
        return json.loads(result)
    
    def generate_deck(self, idea: str, canvas: dict, persona: dict, roadmap: dict) -> dict:
        """Generate Investor Pitch Deck"""
        system_prompt = """Create an investor pitch deck in JSON (10 slides):
{
  "slides": [
    {"title": "Problem", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Solution", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Market", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Product", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Business Model", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Traction", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Team", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Financials", "content": "...", "bullets": ["bullet 1"]},
    {"title": "The Ask", "content": "...", "bullets": ["bullet 1"]},
    {"title": "Contact", "content": "...", "bullets": ["bullet 1"]}
  ]
}"""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Idea: {idea}\nCanvas: {json.dumps(canvas)}\nPersona: {json.dumps(persona)}\nRoadmap: {json.dumps(roadmap)}"}
        ]
        
        result = self._call_api(messages)
        return json.loads(result)


# Flask API Server
from flask import Flask, request, jsonify

app = Flask(__name__)
ai = AIBackend()

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.json
    idea = data.get("idea")
    
    if not idea:
        return jsonify({"error": "Idea is required"}), 400
    
    result = ai.analyze_idea(idea)
    return jsonify({
        "summary": result.summary,
        "validation_score": result.validation_score,
        "market_size": result.market_size,
        "competitors": result.competitors,
        "risks": result.risks,
        "opportunities": result.opportunities
    })

@app.route("/api/canvas", methods=["POST"])
def canvas():
    data = request.json
    idea = data.get("idea")
    analysis = data.get("analysis", {})
    
    result = ai.generate_canvas(idea, analysis)
    return jsonify(result)

@app.route("/api/persona", methods=["POST"])
def persona():
    data = request.json
    idea = data.get("idea")
    
    result = ai.generate_persona(idea)
    return jsonify(result)


@app.route("/api/roadmap", methods=["POST"])
def roadmap():
    data = request.json
    idea = data.get("idea")
    
    result = ai.generate_roadmap(idea)
    return jsonify(result)


@app.route("/api/deck", methods=["POST"])
def deck():
    data = request.json
    idea = data.get("idea")
    canvas = data.get("canvas", {})
    persona = data.get("persona", {})
    roadmap = data.get("roadmap", {})
    
    result = ai.generate_deck(idea, canvas, persona, roadmap)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
