import { db } from '@/lib/neon/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      company_name,
      contact_name,
      email,
      phone,
      project_title,
      project_description,
      budget_range,
      timeline,
      technologies,
      priority,
    } = body;

    if (
      !company_name ||
      !contact_name ||
      !email ||
      !project_title ||
      !project_description
    ) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db.query(
      `INSERT INTO project_submissions (
        company_name, contact_name, email, phone, project_title, 
        project_description, budget_range, timeline, technologies, priority
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        company_name,
        contact_name,
        email,
        phone || null,
        project_title,
        project_description,
        budget_range || null,
        timeline || null,
        technologies || [],
        priority || 'medium',
      ]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return Response.json({ error: 'Failed to submit project' }, { status: 500 });
  }
}
