import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as validUrl from 'valid-url';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
      const { url } = req.params;
      if (typeof url !== 'string') {
        return res.status(400).json({ message: 'Invalid URL parameter.' });
      }
    } else if (req.method === 'POST') {
      const { url } = req.body;
      if (!validUrl.isHttpUri(url) && !validUrl.isHttpsUri(url)) {
        return res
          .status(400)
          .json({ message: 'Invalid URL in request body.' });
      }
    }
    next();
  }
}
