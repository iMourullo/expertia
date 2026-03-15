import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MongoClient } from 'mongodb';

let sCon = '';
let sDbn = '';
if(process.env.NODE_ENV !== "production"){ 
  process.loadEnvFile('.env');
  sCon = process.env.MONGO_LNK_LOC;
} else {
  sCon = process.env.MONGO_LNK;
}
sDbn = process.env.MONGB_DB;

const poolMongo = new MongoClient(sCon);
await poolMongo.connect();
const db = poolMongo.db(sDbn);
console.log('✅ MongoDB connected');

//  console.error('❌ Error connecting MongoDB:', e.message);

const sid = session({
  secret: process.env.SES_PSW,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: sCon + sDbn}),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
});

export {db, sid}
