import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export class GithubApi {
  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const githubToken = res.locals.githubToken;
      const userProfile = await axios({
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: {
          Authorization: `token ${githubToken}`
        }
      });

      res.status(200).json(userProfile.data);
    } catch (err) {
      next(err);
    }
  };
}