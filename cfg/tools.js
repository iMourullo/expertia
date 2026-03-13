import * as oJo from 'jose';
import crypto from 'crypto';
import fs from 'fs';

const hmacSecret = fs.readFileSync('./keys/hmac.pem');
const aesSecret = fs.readFileSync('./keys/aes.pem');

async function genTok(oBoy){
  try {
    console.log('genTok',oBoy);
    if( oBoy == undefined ){ 
      return 'Undefined error token';
    } else {
      const signedJWT = await new oJo.SignJWT(oBoy).setProtectedHeader({alg:'HS256'}).sign(hmacSecret);
      const encoder = new TextEncoder();
      const encryptedJWT = await new oJo.CompactEncrypt(encoder.encode(signedJWT)).setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }).encrypt(aesSecret);
      return  encryptedJWT;
    }
  } catch (err) {
    console.error(err);
    return 'Error creating token';
  }
}

export default { genTok };