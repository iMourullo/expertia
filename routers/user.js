import { Router } from 'express';
import usu from '../models/user.js';

const router = Router();
const dToday = new Date();

router.post('/validate/', async(req, res) => {
  const { name, email } = req.body;
  const bFlag = usu.chkRegister(name, email, req.ip);
  res.redirect('/sent-email');
});

export default router;
