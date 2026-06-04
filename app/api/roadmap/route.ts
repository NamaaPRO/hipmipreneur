import { createClient } from '@/utils/supabase/server';
import { chatJSON } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Create an execution roadmap in JSON:
{
  "phases": [
    {"phase": "Phase 1: Discovery", "duration": "2 weeks", "tasks": ["task 1"], "milestones": ["milestone 1"]},
    {"phase": "Phase 2: Validation", "duration": "3 weeks", "tasks": ["task 1"], "milestones": ["milestone 1"]},
    {"phase": "Phase 3: MVP", "duration": "4 weeks", "tasks": ["task 1"], "milestones": ["milestone 1"]},
    {"phase": "Phase 4: Scale", "duration": "ongoing", "tasks": ["task 1"], "milestones": ["milestone 1"]}
  ]
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
    const roadmap = await chatJSON(`For: ${idea}`, SYSTEM_PROMPT);

    await supabase.from('projects').update({ roadmap }).eq('id', projectId);

    return NextResponse.json({ roadmap });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}