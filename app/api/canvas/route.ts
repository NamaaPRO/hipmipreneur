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
          content: `Generate a Business Model Canvas in JSON format with these sections: value_propositions, customer_segments, channels, customer_relationships, revenue_streams, key_resources, key_activities, key_partnerships, cost_structure. Keep each section to 3-5 bullet points.`,
        },
        {
          role: 'user',
          content: `Idea: ${idea}\nAnalysis: ${JSON.stringify(analysis)}`,
        },
      ],
    });

    const canvas = JSON.parse(completion.choices[0].message.content);

    await supabase
      .from('projects')
      .update({ business_canvas: canvas })
      .eq('id', projectId);

    return NextResponse.json({ canvas });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}