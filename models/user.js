import { Eta } from "eta";
import validator from 'validator';
import {db} from '../cfg/dataBase.js';
import tol from '../cfg/tools.js';
import ema from '../cfg/email.js';

const eta = new Eta({ views: process.argv[1].replace('app','templates') });

async function chkRegister(sNam,sEmi,sUip){
  const aMsg = [0,0,0,0];
  console.log('chk reg', sNam, sEmi);
  sNam = validator.escape(validator.stripLow(validator.trim(sNam ?? '')));
  sEmi = validator.normalizeEmail(validator.trim(sEmi ?? ''), { gmail_remove_dots: false, all_lowercase: true, outlookdotcom_remove_subaddress: false, }) || '';
  if(!sNam || sNam.trim() === ''){ aMsg[0] = 1; } else { if(!/^[a-zA-Z0-9_]{3,20}$/.test(sNam)){ aMsg[1] = 1; }}
  if(!sEmi || sEmi === ''){ aMsg[2] = 1; } else { if(!validator.isEmail(sEmi)){ aMsg[3] = 1;}}
  if(aMsg.every(v => v === 0)){
    let sWeb = 'http://%'+process.env.APP_DOM+':'+process.env.APP_PRT+'/deeplink/';
    let sDpl = await tol.genTok({ usu: sNam, emi: sEmi }); console.log('sDpl', sDpl);
    let bFlg = await savePR(sNam,sEmi,sDpl,sUip); console.log('bFlg', bFlg);
    let sHtm = await eta.render("./pre-register-email", { name: sNam, deelplink: sWeb+sDpl, legal: sWeb });
    let sRep = await ema.sendEmail(sEmi,'Academia Expertia Capacita','',sHtm);
    console.log('sRep',sRep);
  } else {
    req.session.data = { msg: aMsg, usu: sNam, emi: sEmi };
    res.redirect('/pre-register');
  } 
}

async function savePR(sNam,sEmi,sDpl,sUip){
  try {
    await db.collection('preRegister').findOneAndUpdate(
      { email: sEmi },
      {
        $push: { links: { sDeep: sDpl, sIp: sUip, dDate: new Date() } },
        $setOnInsert: {
          dCreate: new Date(),
          sName: sNam,
          sEmail: sEmi,
          createdAt: new Date()
        }
      },
      { upsert: true, returnDocument: 'after' }
    );    
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default { chkRegister }
