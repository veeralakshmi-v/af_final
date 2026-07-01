const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If SMTP is not configured, we'll try to create a test account using ethereal.email
  let transporter;
  
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    console.log('Using Ethereal Email for testing');
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const fromName = process.env.FROM_NAME || 'AlphaFly';
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

  const message = {
    from: `${fromName} <${fromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  
  // If using Ethereal email, log the URL to preview the email
  if (!process.env.SMTP_HOST) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

module.exports = sendEmail;
