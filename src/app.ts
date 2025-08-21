import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

import formRouter from './routes/form.routes';
import questionRouter from './routes/question.routes';
import responseRouter from './routes/response.routes';

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/forms', formRouter);
app.use('/api/questions', questionRouter);
app.use('/api/responses', responseRouter);

export default app;
