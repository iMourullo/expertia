import express from "express"
import sys from './cfg/sys.js';
import { sid } from './cfg/dataBase.js';
import rou from './routers/index.js';

if (process.env.NODE_ENV !== "production") { process.loadEnvFile('.env');}

const app = express();
app.use(express.static(process.argv[1].replace('app','public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("eta", sys.etaEngine());
app.set("view engine", "eta");
app.disable('x-powered-by');

app.use(sid);

app.use('/', rou);
try {
  let port = sys.normalizePort(process.env.PORT || process.env.APP_PRT || '7070');
  app.listen(port, () => {
    console.log('✅ Academia Expertia Capacita, listening at http://%s:%s', process.env.APP_DOM, process.env.APP_PRT);
  })
} catch (error) {
  console.error('❌ Error loading .env file:', error.message);
}
