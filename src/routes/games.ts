import express from 'express';
import gamesCtrl from '../controllers/games';
import userCtrl from "../controllers/user";
const router = express.Router();

router.get('', gamesCtrl.getAllGames);
router.get('/:id', gamesCtrl.GetOneGame)
router.post('', gamesCtrl.createGame);
router.put('/:id', gamesCtrl.modifyGame);
router.delete('/:id', gamesCtrl.deleteGame);

export default router