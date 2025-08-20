import { Request, Response } from 'express';

export function ErrorResponse(
  req: Request,
  res: Response,
  error: AppError | Error
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
export function SuccessResponse(req: Request, res: Response, data: any) {
  return res.status(200).json(data);
}
