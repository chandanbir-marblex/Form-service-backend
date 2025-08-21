import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { ACCESS_TOKEN_SECRET } from '../constants';
import { Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils/Response';
import { ApiError } from '../utils/ApiError';
import { AuthenticatedRequest } from '../types';

export const verifyJWT = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError('Unauthorized request', 401);
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET) as any;

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );

    if (!user) {
      throw new ApiError('Invalid Access Token', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    ErrorResponse(req, res, error);
  }
};
