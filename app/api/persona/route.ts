import { createClient } from '@/utils/supabase/server';
import { chatJSON } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Create a buyer persona in JSON:
{
  "name": " persona name",
  "age": 35,
  "job_title": "job title",
  "goals": ["goal 1"],
  "pain_points": ["pain point 1"],
  "motivations": ["motivation 1"],
  "preferred_channels": ["channel 1"],
  "objection_icons": ["icon 1"],
  "budget_range": "$X-$Y/month"
}`;

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { projectId, idea, analysis } = await request.json();

  if (!projectId || !idea) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const persona = await chatJSON(`For business: ${idea}`, SYSTEM_PROMPT);

    await supabase.from('projects').update({ buyer_persona: persona }).eq('id', projectId);

    return NextResponse.json({ persona });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}