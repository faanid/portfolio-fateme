import { db } from '@/lib/neon/client';

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
