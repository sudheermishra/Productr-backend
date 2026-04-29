import { BrevoClient } from "@getbrevo/brevo";

let client = null;

export const sendOtpEmail = async (email, otp) => {
  if (!process.env.BREVO_API_KEY) {
    console.log(`\n========================================`);
    console.log(`  OTP for ${email}: ${otp}`);
    console.log(`  (Configure BREVO_API_KEY in .env for real emails)`);
    console.log(`========================================\n`);
    return true;
  }

  // Initialize client lazily so process.env.BREVO_API_KEY is available
  if (!client) {
    client = new BrevoClient({
      apiKey: process.env.BREVO_API_KEY,
    });
  }

  try {
    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; max-width: 420px; margin: 0 auto; padding: 40px 30px; background: #ffffff; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1849D6; font-size: 24px; margin: 0;">Productr</h1>
        </div>
        <h2 style="color: #1A1A2E; font-size: 20px; text-align: center; margin-bottom: 10px;">Verification Code</h2>
        <p style="color: #6B7280; font-size: 14px; text-align: center; margin-bottom: 30px;">Enter this code to verify your identity</p>
        <div style="background: #F5F6FA; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 30px;">
          <span style="font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #1849D6;">${otp}</span>
        </div>
        <p style="color: #9CA3AF; font-size: 12px; text-align: center;">This code expires in 5 minutes. Do not share it with anyone.</p>
      </div>
    `;

    await client.transactionalEmails.sendTransacEmail({
      subject: "Your Productr OTP Verification Code",
      sender: {
        name: "Productr",
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email }],
      htmlContent: htmlContent,
    });

    console.log(`OTP email sent to ${email} via Brevo API`);
    return true;
  } catch (error) {
    console.error("Brevo email send error:", error?.message || error);
    console.log(`FALLBACK - OTP for ${email}: ${otp}`);
    return true; // Still return true so the flow continues
  }
};
