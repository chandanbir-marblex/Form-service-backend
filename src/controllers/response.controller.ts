import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../utils/Response';
import { Responses } from '../models/response.model';
import { ApiError } from '../utils/ApiError';

class ResponseController {
  async createResponse(req: Request, res: Response) {
    try {
      const { formId, answers } = req.body;
      const response = await Responses.create({ formId, answers });
      return SuccessResponse(req, res, { response });
    } catch (error) {
      return ErrorResponse(req, res, error);
    }
  }

  async getResponseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await Responses.findById(id)
        .populate('formId')
        .populate('answers.questionId');
      if (!response) {
        throw new ApiError('Response not found', 404);
      }
      return SuccessResponse(req, res, { response });
    } catch (error) {
      return ErrorResponse(req, res, error);
    }
  }

  async updateResponseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { answers } = req.body;
      const response = await Responses.findByIdAndUpdate(
        id,
        { answers },
        { new: true }
      );
      if (!response) {
        throw new ApiError('Response not found', 404);
      }
      return SuccessResponse(req, res, { response });
    } catch (error) {
      return ErrorResponse(req, res, error);
    }
  }

  async deleteResponseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await Responses.findByIdAndDelete(id);
      if (!response) {
        throw new ApiError('Response not found', 404);
      }
      return SuccessResponse(req, res, {
        message: 'Response deleted successfully',
      });
    } catch (error) {
      return ErrorResponse(req, res, error);
    }
  }
}

export default ResponseController;
