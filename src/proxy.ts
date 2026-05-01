import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const sectionHashes: Record<string, string> = {
  '/project': 'projects',
  '/projects': 'projects',
  '/stack': 'stack',
};

export function proxy(request: NextRequest) {
  const hash = sectionHashes[request.nextUrl.pathname];

  if (!hash) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/';
  url.search = '';
  url.hash = hash;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/project', '/projects', '/stack'],
};
