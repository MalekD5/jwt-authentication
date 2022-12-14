import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

const REFRESH_TOKEN_EXPIRY = '1d';
const ACCESS_TOKEN_EXIPRY = '30s';

export const createAccessToken = (user: IUser): string => {
  return jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXIPRY }
  );
};

export const createRefreshToken = (user: IUser): string => {
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

export const createTokens = (user: IUser): string[] => {
  return [createAccessToken(user), createRefreshToken(user)];
};

export const jwtCookieOptions: CookieOptions = {
  httpOnly: true, // prevent browser javascript from accessing the cookie
  //secure: true, // this forces the cookie to be sent over https only, remove in development
  sameSite: 'none',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export const jwtClearCookieOptions = {
  httpOnly: jwtCookieOptions.httpOnly,
  sameSite: jwtCookieOptions.sameSite,
  //secure: jwtCookieOptions.secure,
};
