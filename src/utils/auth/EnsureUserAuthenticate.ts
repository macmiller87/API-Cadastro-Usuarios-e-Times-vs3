import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@utils/config/AuthConfig';
import { AppError } from '@utils/errors/AppError';
import { Injectable, NestMiddleware } from '@nestjs/common';

interface IPayload {
  sub: string;
}

@Injectable()
export class EnsureUserAuthenticate implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
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
}