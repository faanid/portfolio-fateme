import nodemailer from "nodemailer";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

interface SendPortfolioEmailOptions {
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendPortfolioEmail({
  subject,
  text,
  replyTo,
}: SendPortfolioEmailOptions) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Portfolio Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject,
    text,
    replyTo,
  });
}
