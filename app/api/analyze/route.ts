import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are IVA, an AI startup consultant. Analyze the business idea and provide insights in this JSON format:
{
  summary: "2-3 sentence overview",
  validation_score: 0-100,
  market_size: "Estimated addressable market",
  competitors: ["competitor1", "competitor2"],
  risks: ["risk1", "risk2"],
  opportunities: ["opportunity1", "opportunity2"]
}`,
        },
        {
          role: 'user',
          content: idea,
        },
      ],
    });

    const analysis = JSON.parse(completion.choices[0].message.content);

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