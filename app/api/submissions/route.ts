import { sendPortfolioEmail } from "@/lib/email/mailer";

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
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await sendPortfolioEmail({
      subject: `New project submission: ${project_title}`,
      text: [
        `Company: ${company_name}`,
        `Contact: ${contact_name}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Project title: ${project_title}`,
        `Budget range: ${budget_range || "-"}`,
        `Timeline: ${timeline || "-"}`,
        `Priority: ${priority || "medium"}`,
        `Technologies: ${(technologies || []).join(", ") || "-"}`,
        "",
        "Description:",
        project_description,
      ].join("\n"),
      replyTo: email,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error sending project submission:", error);
    return Response.json({ error: "Failed to submit project" }, { status: 500 });
  }
}
