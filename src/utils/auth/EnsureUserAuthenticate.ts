import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/AuthConfig';
import { AppError } from '../errors/AppError';

interface IPayload {
  sub: string;
}

// eslint-disable-next-line prettier/prettier
export async function ensureUserAuthenticate(request: Request, response: Response, next: NextFunction) {

  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT Token is Missing !', 401);
    }

    const [, token] = authHeader.split(' ');

    /* eslint-disable prettier/prettier */
    const { sub: user_id } = verify(token, AuthConfig.jwt.secret_token) as IPayload;

    request.user = {
      user_id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid Token', 400);
  }
}