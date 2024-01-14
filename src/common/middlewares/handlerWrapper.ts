import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class handlerWrapper implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // TODO: fix any
    return async (fn: any) => {
      const fnReturn = fn(req, res, next);
      try {
        return await Promise.resolve(fnReturn);
      } catch (e) {
        next(e);
      }
    };
  }
}
