import nodemailer from 'nodemailer';

const sLogoPath = process.argv[1].replace('app','public') +  '\\img\\aec.png';

if(process.env.NODE_ENV !== "production"){ process.loadEnvFile('.env');}
const sKey = process.env.APP_GMAIL;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'imourullo@gmail.com',
    pass: sKey
  },
});

async function sendEmail(sLis,sJet,sTxt,sHtm) {
  let sMsg = '';
  try {
   sMsg = await transporter.sendMail({
      // from: `"AcademiExpertiaCapacita" <no-reply@expertiaCapacita.com>`,
      from: 'imourullo@gmail.com',
      to: sLis,
      // to: 'martinlascano@gmail.com;',
      // cc: 'imourullo@sapo.com',
      subject: sJet,
      text: sTxt,
      html: sHtm,
      attachments: [
        {
          filename: 'aec.png',
          path: sLogoPath,       // o podés usar "content" con el buffer
          cid: 'logo_expertia'  // este ID se referencia en el HTML
        }
      ]      
    });
  } catch(e){
    console.log('error:',e);
  }
  return sMsg.messageId;
}

export default { sendEmail }
