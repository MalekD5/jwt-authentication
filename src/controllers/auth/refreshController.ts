import { Request, Response } from 'express';
import { createAccessToken } from '../../utils/JWTUtils';
import userModel from '../../models/userModel';
import jwt from 'jsonwebtoken';

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;

  const user = await userModel.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err || user?.username != decoded.username) return res.sendStatus(403);
      const accessToken = createAccessToken(user);
      res.status(200).json({ accessToken });
    }
  );
};
