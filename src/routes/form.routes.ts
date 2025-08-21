import { Router } from 'express';
import FormController from '../controllers/form.controller';

const formController = new FormController();

const formRouter = Router();

formRouter.get('/', formController.getAllForms);

formRouter.post('/', formController.createForm);

formRouter.get('/:id', formController.getFormById);

formRouter.put('/:id', formController.updateFormById);

formRouter.delete('/:id', formController.deleteFormById);

export default formRouter;
