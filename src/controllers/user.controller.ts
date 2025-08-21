import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { SuccessResponse, ErrorResponse } from '../utils/Response';
import { ApiError } from '../utils/ApiError';
import { AuthenticatedRequest } from '../types';

const generateAccessAndRefereshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError('Something went wrong while generating referesh and access token', 500);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === '')) {
      throw new ApiError('All fields are required', 400);
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError('User with email or username already exists', 409);
    }

    const avatar = `https://api.dicebear.com/6.x/initials/svg?seed=${fullName}`;

    const user = await User.create({
      fullName,
      avatar,
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if (!createdUser) {
      throw new ApiError('Something went wrong while registering the user', 500);
    }

    return SuccessResponse(req, res, createdUser, 201, 'User registered Successfully');
  } catch (error) {
    ErrorResponse(req, res, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!username && !email) {
      throw new ApiError('username or email is required', 400);
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new ApiError('User does not exist', 404);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError('Invalid user credentials', 401);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens((user._id as any).toString());

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json({
        success: true,
        message: 'User logged In Successfully',
        data: {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
      });
  } catch (error) {
    ErrorResponse(req, res, error);
  }
};

export const logoutUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json({
        success: true,
        message: 'User logged Out',
        data: {},
      });
  } catch (error) {
    ErrorResponse(req, res, error);
  }
};

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    return SuccessResponse(req, res, req.user, 200, 'User fetched successfully');
  } catch (error) {
    ErrorResponse(req, res, error);
  }
};