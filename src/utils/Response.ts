import { Request, Response } from 'express';

export function ErrorResponse(
  req: Request,
  res: Response,
  error: ApiError | Error | any
) {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json({ error: error.message, success: false });
  } else {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', success: false });
  }
}
export function SuccessResponse(
  req: Request,
  res: Response,
  data: any,
  statusCode: number = 200,
  message: string = 'Success'
) {
  return res.status(statusCode).json({ message, data, success: true });
}
