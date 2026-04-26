import { db } from '@/lib/neon/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  
  if (!projectId) {
    return Response.json({ error: 'projectId is required' }, { status: 400 });
  }

  try {
    const result = await db.query(
      'SELECT * FROM project_comments WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return Response.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project_id, name, email, comment } = body;

    if (!project_id || !name || !email || !comment) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db.query(
      'INSERT INTO project_comments (project_id, name, email, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [project_id, name, email, comment]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return Response.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
