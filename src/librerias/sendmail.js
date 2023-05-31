const mailer = require('nodemailer');

const transport = mailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
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

const sendEmail = async (Email, Subject, Message, bcco = "cursobackendtest@hotmail.com") => {
    const envio = await transport.sendMail({
        from: 'cursobackendtest@hotmail.com',
        to: Email,
        bcc: bcco,
        subject: Subject,
        html: Message
    });
}

//sendEmail('willian.15102017@gmail.com', 'Prueba Curso 2', 'Que pasa bro, estas mechudito!!')

module.exports = sendEmail;