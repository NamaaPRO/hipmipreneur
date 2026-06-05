import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${next}`);
  }

  return NextResponse.redirect('/auth/login');
}
