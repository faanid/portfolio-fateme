import { db } from '@/lib/neon/client';

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM skills ORDER BY proficiency DESC, name ASC'
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return Response.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}
