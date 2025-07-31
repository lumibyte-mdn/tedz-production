import { NextRequest, NextResponse } from 'next/server';

import { getLatestProjectsApi } from '@/api/projects';

export async function GET(request: NextRequest) {
  try {
    const projects = await getLatestProjectsApi();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
