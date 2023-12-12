import * as express from 'express';
import movieCtrl from "../controllers/movie";

const router = express.Router();

//@ts-ignore
router.post('/',  movieCtrl.CreateMovies);
//@ts-ignore
router.get('/',  movieCtrl.GetAllMovie);
// @ts-ignore
router.get('/:id',   movieCtrl.GetOneMovie);

router.delete('/:id',   movieCtrl.DeleteMovie);

router.put('/:id',  movieCtrl.modifyMovie)

export default router