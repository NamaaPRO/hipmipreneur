import { createClient } from '@/utils/supabase/server';
import { chatJSON } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Create an investor pitch deck in JSON (10 slides):
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
}`;

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { projectId, idea, analysis, canvas, persona, roadmap } = await request.json();

  if (!projectId || !idea) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const deck = await chatJSON(
      `Idea: ${idea}\nCanvas: ${JSON.stringify(canvas)}\nPersona: ${JSON.stringify(persona)}\nRoadmap: ${JSON.stringify(roadmap)}`,
      SYSTEM_PROMPT
    );

    await supabase.from('projects').update({ investor_deck: deck }).eq('id', projectId);

    return NextResponse.json({ deck });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}