import { Request, Response } from 'express';
import { Form } from '../models/form.model';
import { Question } from '../models/question.model';

class QuestionController {
  async createQuestion(req: Request, res: Response) {
    try {
      const { formId, questionText, questionType, isRequired, options } =
        req.body;

      const question = await Question.create({
        questionText,
        questionType,
        isRequired: isRequired ? isRequired : false,
        options: options && options.length > 0 ? options : [],
      });

      if (formId) {
        await Form.findByIdAndUpdate(formId, {
          $push: { questions: question._id },
        });
      }

      return res.status(201).json(question);
    } catch (error) {
      console.error('Error creating question:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await Question.findById(id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      return res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Question.findByIdAndDelete(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting question:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error('Error updating question:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default QuestionController;
