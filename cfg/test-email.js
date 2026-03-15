import nodemailer from 'nodemailer';

if(process.env.NODE_ENV !== "production"){ process.loadEnvFile('.env');}
const sKey =  process.env.APP_GMAIL;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'imourullo@gmail.com',
    pass: sKey
  },
});

let sInf = await transporter.sendMail({
  from: `"AcademiExpertiaCapacita" <no-reply@expertiaCapacita.com>`,
  to: 'martinlascano@gmail.com;',
  cc: 'imourullo@sapo.cv',
  subject: 'Academia Expertia Capacita',
  text: 'Funciona 🎉',
  html: '<h2>Funciona 🎉</h2>'
});

console.log('email:',sInf);

