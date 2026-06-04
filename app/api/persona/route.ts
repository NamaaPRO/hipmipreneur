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

  const { projectId, idea, analysis } = await request.json();

  if (!projectId || !idea) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Generate a detailed buyer persona in JSON format: name, age, job_title, goals, pain_points, motivations, preferred_channels, obj_idols. Be specific and realistic.`,
        },
        {
          role: 'user',
          content: `For business: ${idea}`,
        },
      ],
    });

    const persona = JSON.parse(completion.choices[0].message.content);

    await supabase
      .from('projects')
      .update({ buyer_persona: persona })
      .eq('id', projectId);

    return NextResponse.json({ persona });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}