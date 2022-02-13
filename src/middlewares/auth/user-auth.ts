import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export class UserAuth {
  // loginUser auth
  public loginUserAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { loginToken, GithubToken } = req.cookies;
      const [ decodeLoginToken, decodeGithubToken ] = await Promise.all([
        jwt.decode(loginToken) as JwtPayload,
        jwt.decode(GithubToken) as JwtPayload
      ]);

      res.locals.userName = decodeLoginToken.login;
      res.locals.id = decodeLoginToken.id;
      res.locals.githubToken = decodeGithubToken.splitAccessToken;
      next();
    } catch (err) {
      next(err);
    }
  };
}