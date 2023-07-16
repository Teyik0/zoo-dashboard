import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import * as cors from 'cors';
import areaRouter from './routes/area.router';
import animalRouter from './routes/animal.router';
import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';
import specieRouter from './routes/specie.router';
import visitorRouter from './routes/visitor.router';
import billetRouter from './routes/billet.router';

export const prisma = new PrismaClient();

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/area', areaRouter);
app.use('/animal', animalRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/specie', specieRouter);
app.use('/visitor', visitorRouter);
app.use('/billet', billetRouter);

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
