const mailer = require('nodemailer');

const transport = mailer.createTransport({
    host: 'smtp.live.com',
    port: 465,
    secureConnection: false,
    debug: true,
    logger: true,
    secure: false,
    requireTLS: false,
    auth: {
        user: 'cursobackendtest@hotmail.com',
        pass: 'Colombia2023'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const sendEmail = async (Email, Subject, Message, bcco = "correo de copia") => {
    const envio = await transport.sendMail({
        from: 'cursobackendtest@hotmail.com',
        to: Email,
        bcc: bcco,
        subject: Subject,
        html: Message
    });
}

module.exports = sendEmail;