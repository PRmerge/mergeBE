import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export class UserAuth {
  // loginUser auth
  public loginUserAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // FIXME: authorization 에 대한 토큰 받아오는 로직 수정 필요. 프론트 배포 시
      const { logintoken, githubtoken }: { logintoken: string, githubtoken: string } = req.headers as any;

      const splitLoginToken = logintoken.split(' ')[1];
      const splitGithubToken = githubtoken.split(' ')[1];
      const [ decodeLoginToken, decodeGithubToken ] = await Promise.all([
        jwt.decode(splitLoginToken) as JwtPayload,
        jwt.decode(splitGithubToken) as JwtPayload,
      ]);

      res.locals.user = decodeLoginToken.login;
      res.locals.githubIndex = decodeLoginToken.id;
      res.locals.githubToken = decodeGithubToken.splitAccessToken;
      next();
    } catch (err) {
      next(err);
    }
  };
}