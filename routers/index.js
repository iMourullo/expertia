import { Router } from 'express';
import rotRou from './root.js';
import usuRou from './user.js';

const router = Router();

router.use('/user', usuRou);
router.use('/', rotRou);

export default router;
