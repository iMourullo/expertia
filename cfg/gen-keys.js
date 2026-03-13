import fs from 'fs';
import crypto from 'crypto';

// Generate key HMAC (HS256)
if(fs.existsSync('./keys/hmac.pem')){
  console.log('Key [HMAC] exists and it wan not generated!');
} else {
  const hmacKey = crypto.randomBytes(64); // 512 bits
  fs.writeFileSync('./keys/hmac.pem', hmacKey);
  console.log('Key [HMAC] generated in the folder: /keys');
}

// Generate key AES (A256GCM)
if(fs.existsSync('./keys/aes.pem')){
    console.log('Key [AES] exists and it wan not generated!');
} else {
  const aesKey = crypto.randomBytes(32); // 256 bits
  fs.writeFileSync('./keys/aes.pem', aesKey);
  console.log('Key [AES] generated in the folder: /keys');
}
