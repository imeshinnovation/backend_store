const mailer = require('nodemailer');

const transport = mailer.createTransport({
    host: 'smtp.hotmail.com',
    port: 587,
    secureConnection: false,
    debug: false,
    logger: true,
    secure: false,
    requireTLS: false,
    auth: {
        user: '',
        pass: ''
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const sendEmail = async (Email, Subject, Message, bcco = "correo de copia") => {
    const envio = await transport.sendMail({
        from: 'correo de hotmail',
        to: Email,
        bcc: bcco,
        subject: Subject,
        html: Message
    });
}

module.exports = sendEmail;