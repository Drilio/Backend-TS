import * as express from 'express';
import actorCtrl from "../controllers/actor";
import actor from "../controllers/actor";

const router = express.Router();

//@ts-ignore
router.post('/', actorCtrl.CreateActors);
//@ts-ignore
router.get('/', actorCtrl.GetAllActors);

export default router