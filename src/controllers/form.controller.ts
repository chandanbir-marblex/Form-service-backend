import { Request, Response } from 'express';
import { Form } from '../models/form.model';
import { Question } from '../models/question.model';
import { logger } from '../utils/Logger';

class FormController {
  async createForm(req: Request, res: Response) {
    const { title, description, questions } = req.body;
    try {
      const questionIds: string[] = [];

      if (questions && questions.length > 0) {
        const questionDocs = await Question.insertMany(questions);
        questionIds.push(...questionDocs.map((q: any) => q._id));
      }

      const form = await Form.create({
        title,
        description,
        questions: questionIds,
      });
      await form.save();
      return res.status(201).json(form);
    } catch (error) {
      console.error('Error creating form:', error);
      return res.status(500).json({ message: 'Error creating form', error });
    }
  }
  async getFormById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const form = await Form.findById(id).populate('questions');
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      return res.json(form);
    } catch (error) {
      console.error('Error fetching form:', error);
      return res.status(500).json({ message: 'Error fetching form', error });
    }
  }

  async deleteFormById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      logger.info(`Deleting form with ID: ${id}`);
      const form = await Form.findByIdAndDelete(id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      return res.json({ message: 'Form deleted successfully' });
    } catch (error) {
      console.error('Error deleting form:', error);
      return res.status(500).json({ message: 'Error deleting form', error });
    }
  }

  async updateFormById(req: Request, res: Response) {
    try {
      const { title, description, isPublic } = req.body;

      console.log('Updating form:', req.params.id);

      const form = await Form.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          isPublic,
        },
        { new: true }
      );

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      return res.status(200).json(form);
    } catch (error) {
      console.error('Error updating form:', error);
      return res.status(500).json({ message: 'Error updating form', error });
    }
  }
}

export default FormController;
