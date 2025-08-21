import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ACCESS_TOKEN_SECRET } from '../constants.js';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils/Response.js';

export const verifyJWT = async (
  req: Request,
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

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

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
