const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: process.env.SMTP_PORT as string,
  secure: true,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export default async function sendMail({ to, subject, text }:{ to: string, subject: string, text: string }) {
  const mailOptions = {
    from: process.env.EMAIL as string,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
}