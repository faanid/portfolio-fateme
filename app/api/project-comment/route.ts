import { sendPortfolioEmail } from "@/lib/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project_id, project_title, name, email, comment } = body;

    if (!project_id || !name || !email || !comment) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await sendPortfolioEmail({
      subject: `New comment on project: ${project_title || project_id}`,
      text: `Project: ${project_title || project_id} (${project_id})\nName: ${name}\nEmail: ${email}\n\nComment:\n${comment}`,
      replyTo: email,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error sending project comment:", error);
    return Response.json({ error: "Failed to submit comment" }, { status: 500 });
  }
}
