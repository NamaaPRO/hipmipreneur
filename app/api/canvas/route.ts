import { createClient } from '@/utils/supabase/server';
import { chatJSON } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Generate a Business Model Canvas in JSON:
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
    const canvas = await chatJSON(`Idea: ${idea}\nAnalysis: ${JSON.stringify(analysis)}`, SYSTEM_PROMPT);

    await supabase.from('projects').update({ business_canvas: canvas }).eq('id', projectId);

    return NextResponse.json({ canvas });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}