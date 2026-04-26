import { db } from '@/lib/neon/client';

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM collaborations ORDER BY created_at DESC'
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    return Response.json({ error: 'Failed to fetch collaborations' }, { status: 500 });
  }
}
