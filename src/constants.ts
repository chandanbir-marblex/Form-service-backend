import { Secret } from 'jsonwebtoken';

export const API_URL = process.env.API_URL || 'http://localhost:3000';
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const PORT = process.env.PORT || 3000;
export const DB_NAME = process.env.DB_NAME || 'form';

export const SALT_ROUNDS = 10;

export const ACCESS_TOKEN_SECRET: Secret =
  process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';

export const REFRESH_TOKEN_SECRET: Secret =
  process.env.REFRESH_TOKEN_SECRET || ACCESS_TOKEN_SECRET;

export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '1Hours';
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7Days';
