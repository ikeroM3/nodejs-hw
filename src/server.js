import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import { errors } from 'celebrate';
import userRouter from './routes/userRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://09-auth-gamma-cyan.vercel.app', 'http://localhost:3001'],
    credentials: true,
  }),
);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', notesRouter);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
