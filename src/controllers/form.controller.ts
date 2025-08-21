import { Request, Response } from 'express';
import { Form } from '../models/form.model';
import { Question } from '../models/question.model';
import { logger } from '../utils/Logger';

class FormController {
  async createForm(req: Request, res: Response) {
    const { title, description, theme, steps, settings, published, savedAt } =
      req.body;
    try {
      // Prepare steps with question references
      const formSteps = [];
      if (steps && steps.length > 0) {
        for (const step of steps) {
          const questionDocs = await Question.insertMany(step.elements);
          formSteps.push({
            id: step.id,
            title: step.title,
            elements: questionDocs.map((q: any) => q._id),
          });
        }
      }

      const form = await Form.create({
        title,
        description,
        theme,
        steps: formSteps,
        settings,
        published: published ?? false,
        savedAt,
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
      const form = await Form.findById(id).populate('steps.elements');
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
      const { title, description, theme, steps, settings, published, savedAt } =
        req.body;
      console.log('Updating form:', req.params.id);

      // If steps are provided, update questions for each step
      let formSteps = undefined;
      if (steps && steps.length > 0) {
        formSteps = [];
        for (const step of steps) {
          // Insert new questions for this step
          const questionDocs = await Question.insertMany(step.elements);
          formSteps.push({
            id: step.id,
            title: step.title,
            elements: questionDocs.map((q: any) => q._id),
          });
        }
      }

      const updateObj: any = {
        title,
        description,
        theme,
        settings,
        published,
        savedAt,
      };
      if (formSteps) updateObj.steps = formSteps;

      const form = await Form.findByIdAndUpdate(req.params.id, updateObj, {
        new: true,
      });

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
