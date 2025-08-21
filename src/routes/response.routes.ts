import { Router } from 'express';
import ResponseController from '../controllers/response.controller';

const responseController = new ResponseController();

const responseRouter = Router();

responseRouter.post('/', responseController.createResponse);

responseRouter.get('/:id', responseController.getResponseById);

responseRouter.put('/:id', responseController.updateResponseById);

responseRouter.delete('/:id', responseController.deleteResponseById);

export default responseRouter;
