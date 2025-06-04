const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
  });
};

module.exports = {
  sendEmail,
};
