import { Resend } from "resend";

// Initialize inside functions so dotenv loads first
const getResend = () => new Resend(process.env.RESEND_API_KEY);

const FROM = "Market Mitra <onboarding@resend.dev>";

export const sendContactNotification = async ({
  name,
  email,
  phone,
  subject,
  message,
  service,
}) => {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: "contactmarketmitra@gmail.com",
    subject: `📬 New Enquiry [${service}] — ${name}`,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1b2e;border-radius:12px;overflow:hidden;color:#F4F3EF;">
      <div style="background:linear-gradient(135deg,#1A2E4A,#0f1f35);padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.07);">
        <table width="100%"><tr>
          <td><span style="font-size:20px;font-weight:700;color:#F5A623;">Market</span><span style="font-size:20px;font-weight:700;color:#F4F3EF;">मित्र</span></td>
          <td align="right"><span style="background:#1D9E75;color:#fff;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;">New Lead</span></td>
        </tr></table>
      </div>
      <div style="padding:32px;">
        ${[
          ["👤 Name", name],
          [
            "📧 Email",
            `<a href="mailto:${email}" style="color:#F5A623;">${email}</a>`,
          ],
          ["📞 Phone", phone || "—"],
          ["🛠 Service", service],
          ["📌 Subject", subject],
        ]
          .map(
            ([l, v]) =>
              `<table width="100%" style="margin-bottom:12px;"><tr><td width="120" style="font-size:11px;color:rgba(244,243,239,0.4);text-transform:uppercase;">${l}</td><td style="font-size:14px;color:#F4F3EF;">${v}</td></tr></table>`,
          )
          .join("")}
        <div style="background:rgba(255,255,255,0.03);border-left:3px solid #1D9E75;padding:16px 20px;margin-top:16px;border-radius:0 8px 8px 0;">
          <p style="margin:0 0 6px;font-size:11px;color:rgba(244,243,239,0.35);text-transform:uppercase;">Message</p>
          <p style="margin:0;font-size:14px;color:rgba(244,243,239,0.8);line-height:1.75;">${message}</p>
        </div>
        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:#F5A623;color:#1A2E4A;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">Reply to ${name.split(" ")[0]} →</a>
        </div>
      </div>
      <div style="padding:12px 32px;background:rgba(0,0,0,0.25);text-align:center;">
        <p style="margin:0;font-size:11px;color:rgba(244,243,239,0.2);">MarketMitra · Nagpur, Maharashtra</p>
      </div>
    </div>`,
  });
};

export const sendAutoReply = async ({ name, email, message, service }) => {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `We got your message, ${name.split(" ")[0]}! 🙌 — Market Mitra`,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1b2e;border-radius:12px;overflow:hidden;color:#F4F3EF;">
      <div style="background:linear-gradient(135deg,#1A2E4A,#0f1f35);padding:28px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.07);">
        <p style="margin:0;font-size:22px;font-weight:700;"><span style="color:#F5A623;">Market</span><span style="color:#F4F3EF;">मित्र</span></p>
        <p style="margin:4px 0 0;font-size:12px;color:rgba(244,243,239,0.35);font-style:italic;">Growth feels better with a friend</p>
      </div>
      <div style="padding:36px 32px;">
        <h2 style="margin:0 0 12px;font-size:20px;color:#F4F3EF;">Hey ${name.split(" ")[0]}, thanks for reaching out! 👋</h2>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(244,243,239,0.55);line-height:1.8;">
          We've received your enquiry about <strong style="color:#F5A623;">${service}</strong> and our team will get back to you within <strong style="color:#1D9E75;">24 hours</strong>.
        </p>
        <div style="background:rgba(29,158,117,0.07);border:1px solid rgba(29,158,117,0.18);border-radius:10px;padding:18px 20px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:11px;color:rgba(244,243,239,0.35);text-transform:uppercase;">Your message</p>
          <p style="margin:0;font-size:14px;color:rgba(244,243,239,0.7);line-height:1.75;font-style:italic;">"${message}"</p>
        </div>
        <p style="margin:0 0 14px;font-size:14px;color:rgba(244,243,239,0.45);">Want to talk sooner?</p>
        <a href="/book" style="display:inline-block;background:#F5A623;color:#1A2E4A;font-weight:700;font-size:14px;padding:13px 28px;border-radius:8px;text-decoration:none;">📅 Book a Free 30-Min Call</a>
      </div>
      <div style="padding:12px 32px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05);">
        <p style="margin:0;font-size:11px;color:rgba(244,243,239,0.25);text-align:center;">contactmarketmitra@gmail.com · Nagpur, Maharashtra</p>
      </div>
    </div>`,
  });
};
