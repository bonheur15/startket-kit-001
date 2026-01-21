import { HubMail } from "hubmail";

const hubmail = new HubMail();

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  try {
    await hubmail.send({
      from: "starter-kit-v9yqx-free@hubmail.space", // Using a generic sender for now or placeholder
      to: [email],
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    // Since sending is optional/kind of optional, we don't throw to break the flow, but log it.
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  try {
    await hubmail.send({
      from: "starter-kit-v9yqx-free@hubmail.space",
      to: [email],
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
};
