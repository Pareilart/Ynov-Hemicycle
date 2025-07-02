import { Request, Response, NextFunction } from 'express';
import { log } from '../utils/logger';

interface RequestWithTime extends Request {
  startTime?: number;
}

export const requestLogger = (req: RequestWithTime, res: Response, next: NextFunction) => {
  req.startTime = Date.now();

  log.http(`${req.method} ${req.originalUrl}`);

  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any, cb?: any): Response {
    const responseTime = req.startTime ? Date.now() - req.startTime : 0;
    log.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${responseTime}ms`);
    return originalEnd.call(this, chunk, encoding, cb) as Response;
  };

  next();
};
