import { Request, Response, NextFunction } from 'express';

interface Error {
  message?: string;
  status?: number;
  name?: string;
  stack?: string;
}

export function errorHandler(err: Error, req: Request, res: Response) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).send(err.message);
}

export function routerError(req: Request, res: Response, next: NextFunction) {
  const error: Error = new Error(`${req.method} ${req.originalUrl} 라우터 에러입니다.`);
  error.status = 404;
  next(error);
}
