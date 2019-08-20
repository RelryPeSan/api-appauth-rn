const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "reratos.suporte@gmail.com",
        pass: "XUyT4pOIx3C7C3O",
    },
    tls: { rejectUnauthorized: false }
});

const mailOptions = {
    from: 'APP Auth <reratos.suporte@gmail.com>',
    to: undefined,
    subject: undefined,
    html: undefined,
};

module.exports = {
    sendMail(to, subject, htmlText){
        mailOptions.to = to;
        mailOptions.subject = subject;
        mailOptions.html = htmlText;

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.error(new Error('Email não pode ser enviado.\n\t' + err));
            } else {
                console.info('Email enviado: ' + info.response);
            }
            // callback(err, info);
        });
    }
}