// Require the nodemailer library
// import nodemailer from "nodemailer";

const sendMail = (text) => {

//
// // Create a transporter object
//     const transporter = nodemailer.createTransport({
//         service: 'mail.ru',
//         auth: {
//             user: 'cmdrgou@mail.ru',
//             pass: '8X7UBQ8n8SBv340wCxxQ'
//         }
//     });
//
// // Create mail options
//     const mailOptions = {
//         from: 'cmdrgou@mail.ru',
//         // to: '101market@gomel.mchs.gov.by',
//         to: 'avervalpet@gmail.com',
//         subject: 'Test Email',
//         text: `Добрый день! Это тестовое письмо. Вы указали следующие адреса для отправки: ${JSON.stringify(text)}`
//     };
//
// // Send mail
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });

    console.log('Email has send');
}

export default sendMail;