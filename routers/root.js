import { Router } from 'express';

const router = Router();
const dToday = new Date();

router.get('/', (req, res) => {
  res.render('root', { title: 'Bienvenidos', year: dToday.getFullYear() } );
})

router.get('/pre-register', (req, res) => {
  const oEta = { title: 'Pre Registro', year: dToday.getFullYear(), usu: '', emi: '', msg: [] };
  if(req.session.data){
    oEta.usu = req.session.data.usu;
    oEta.emi = req.session.data.emi;
    oEta.msg = req.session.data.msg;
    delete req.session.data;
  }
  console.log('oEta',oEta);
  res.render('pre-register', oEta);
})

router.get('/sent-email', (req, res) => {
  res.render('sent-email', { title: 'Email Enviado', year: dToday.getFullYear() } );
})

router.use((req, res, next) => {
  res.status(404).send('Sorry, the requested page was not found.');
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error!');
});

export default router;
