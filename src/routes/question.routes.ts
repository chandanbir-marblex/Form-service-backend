import { Router } from 'express';
import QuestionController from '../controllers/question.controller';

const questionRouter = Router();

const questionController = new QuestionController();

questionRouter.get('/:id', questionController.getQuestionById);

questionRouter.post('/', questionController.createQuestion);

questionRouter.delete('/:id', questionController.deleteQuestion);

questionRouter.put('/:id', questionController.updateQuestion);

export default questionRouter;
