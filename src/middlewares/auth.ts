import { verify } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export class UserAuth {
  // login user auth
  async loginUserAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { token }: { token: string } = req.headers as any;

      const splitToken = token.split(' ')[1];
      const verifyToken = verify(splitToken, process.env.JTW_SECRET_KEY!) as JwtPayload;

      res.locals.githubId = verifyToken.githubId;
      next();
    } catch (err) {
      next(err);
    }
  }
}
