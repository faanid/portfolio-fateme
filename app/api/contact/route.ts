import { sendPortfolioEmail } from "@/lib/email/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await sendPortfolioEmail({
      subject: subject ? `Portfolio contact: ${subject}` : "New portfolio contact message",
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
