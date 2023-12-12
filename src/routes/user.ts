import express from 'express';
import userCtrl from '../controllers/user';
const router = express.Router();


router.post('/signup', userCtrl.signup);

router.post('/local', userCtrl.login);

router.get('/me', userCtrl.me)

router.post('/change-password', userCtrl.changePassword)

export default router