import express from 'express';
import userCtrl from '../controllers/user';
const router = express.Router();


router.post('/add', userCtrl.signup);
router.post('/connect', userCtrl.login);
router.post('/isconnect', userCtrl.isconnect)

export default router