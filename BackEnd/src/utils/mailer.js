const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});
const sendEmail = async (email, otp) => {
  const htmlContent = `<!DOCTYPE html>
    <html>
      <head>
        <title>Mã xác thực</title>
      </head>
      <body>
        <h1>Mã xác thực ứng dụng</h1>
        <p>Mã xác thực của bạn là: <strong>${otp}</strong></p>
      </body>
    </html>`;

  try {
    let info = await transporter.sendMail({
      from: process.env.MAIL,
      to: email,
      subject: "Mã xác thực cho ứng dụng",
      html: htmlContent,
    });
    return info;
  } catch (error) {
    return e;
  }
};

module.exports = sendEmail;
