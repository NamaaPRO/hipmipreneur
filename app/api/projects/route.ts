import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

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
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        idea,
        status: 'pending',
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