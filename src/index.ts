import express, {Router} from 'express';
import userRoutes from './routes/user';
import auth from './middleware/auth'
import mongoose from "mongoose";
import 'dotenv/config';
import cors from 'cors';

const app = express();
// @ts-ignore
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use(express.json());
app.use(cors());

const apiRouter = Router()

apiRouter.use('/auth', userRoutes)

app.use('', apiRouter)

app.listen(3012, () => {
  console.log('Server is listening on port 3012');
});

