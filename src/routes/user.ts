import express from 'express';
import userCtrl from '../controllers/user';
const router = express.Router();


router.post('/signup', userCtrl.signup);

router.post('/local', userCtrl.login);

export default router