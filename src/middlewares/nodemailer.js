const nodemailer = require('nodemailer');
const nodemailerConfig = require('../../config/nodemailer');

const transporter = nodemailer.createTransport({
  host: nodemailerConfig.host,
  port: nodemailerConfig.port,
  secure: nodemailerConfig.secure,
  auth: {
    user: nodemailerConfig.user,
    pass: nodemailerConfig.pass,
  },
  tls: { rejectUnauthorized: false },
});

const mailOptions = {
  from: `APP Auth <${nodemailerConfig.user}>`,
  to: undefined,
  subject: undefined,
  html: undefined,
};

module.exports = {
  sendMail(to, subject, htmlText) {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = htmlText;

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(new Error(`Email não pode ser enviado.\n\t${err}`));
      } else {
        console.info(`Email enviado: ${info.response}`);
      }
      // callback(err, info);
    });
  },
};
