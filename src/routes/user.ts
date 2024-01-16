import express from 'express';
import userCtrl from '../controllers/user';
const router = express.Router();


router.get('/check-auth', userCtrl.isconnect);


export default router