import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../infrastructure/repository';

export class UserService {
  // create intro
  public saveUserIntro = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { intro } = req.body;
      console.log(intro);
      const userService = getCustomRepository(UserRepository);
      const githubIndex: number = res.locals.githubIndex;
      await userService.updateUserIntro(githubIndex, intro);

      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  };
}