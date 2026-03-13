import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_KEY }
});

async function sendEmail({ to, name, subject, html, text }) {
  const mailOptions = {
    from: `"AcademiExpertiaCapcita" <no-reply@expertiaCapacita.com>`,
    to: name ? `"${name}" <${to}>` : to,
    subject,
    text,
    html
  };
  return transporter.sendMail(mailOptions);
}

export default { sendEmail }
