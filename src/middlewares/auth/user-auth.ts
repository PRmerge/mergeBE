import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export class UserAuth {
  // loginUser auth
  public loginUserAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // @ts-ignore
      // const { loginToken, githubToken } = req.headers.authorization;

      const splitLoginToken = req.headers.authorization.split(' ')[1];

      // console.log(req.headers);
      // const [ decodeLoginToken, decodeGithubToken ] = await Promise.all([
      //   jwt.decode(loginToken) as JwtPayload,
      //   jwt.decode(githubToken) as JwtPayload
      // ]);

      const decodeLoginToken = await jwt.decode(splitLoginToken) as JwtPayload;
      // Todo: 우선 이렇게 작업
      res.locals.userName = decodeLoginToken.login;
      res.locals.id = decodeLoginToken.id;
      res.locals.githubToken = "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";
      next();
    } catch (err) {
      next(err);
    }
  };
}