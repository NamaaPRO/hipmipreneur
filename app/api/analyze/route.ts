import { createClient } from '@/utils/supabase/server';
import { chatJSON } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are IVA, an expert startup consultant. Analyze the business idea and respond in JSON format:
{
  "summary": "2-3 sentence overview",
  "validation_score": 75,
  "market_size": "TAM/SAM/SOM in millions",
  "competitors": ["competitor1", "competitor2"],
  "risks": ["risk1"],
  "opportunities": ["opportunity1"]
}`;

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { idea } = await request.json();

  if (!idea) {
    return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
  }

  try {
    const analysis = await chatJSON(idea, SYSTEM_PROMPT);

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        idea,
        analysis,
        status: 'analyzed',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}