import express from 'express';
import actorRoutes from './routes/actor';

const app = express();

app.use(express.json());

app.use('/api/actors', actorRoutes)
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(1337, () => {
  console.log('Server is listening on port 1337');
});

