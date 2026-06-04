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

  const { projectId, idea, analysis, canvas, persona, roadmap } = await request.json();


  if (!projectId || !idea) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Create an investor pitch deck in JSON format: slides[{title, content, bullets}]\\n. Include 10 slides: Problem, Solution, Market, Product, Business Model, Traction, Team, Financials, Ask, Contact.`,
        },
        {
          role: 'user',
          content: `Idea: ${idea}\nCanvas: ${JSON.stringify(canvas)}\nPersona: ${JSON.stringify(persona)}\nRoadmap: ${JSON.stringify(roadmap)}`,
        },
      ],
    });

    const deck = JSON.parse(completion.choices[0].message.content);

    await supabase
      .from('projects')
      .update({ investor_deck: deck })
      .eq('id', projectId);

    return NextResponse.json({ deck });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}