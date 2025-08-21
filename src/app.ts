import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import type { Request, Response } from 'express';

import formRouter from './routes/form.routes';
import questionRouter from './routes/question.routes';
import responseRouter from './routes/response.routes';
import userRouter from './routes/user.routes';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/forms', formRouter);
app.use('/api/questions', questionRouter);
app.use('/api/responses', responseRouter);
app.use('/api/users', userRouter);

export default app;
