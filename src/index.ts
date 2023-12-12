import express from 'express';
import actorRoutes from './routes/actor';
import movieRoutes from './routes/movie';
import userRoutes from './routes/user';
import mongoose from "mongoose";
import 'dotenv/config';
const app = express();

// @ts-ignore
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use(express.json());

app.use('/api/actors', actorRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/auth', userRoutes)
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(1337, () => {
  console.log('Server is listening on port 1337');
});

