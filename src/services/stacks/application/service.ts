import { Request, Response, NextFunction } from 'express';
import { StackRepository } from '../infrastructure/repository';
import { UserRepository } from '../../users/infrastructure/repository';


export class StackService {
  private stackRepository = StackRepository;

  // create stack
  public async createStack(req: Request, res: Response, next: NextFunction) {
    try {
      const { stack } = req.body;
      const { githubIndex } = res.locals;
      const userRepository = new UserRepository();
      const user = await userRepository.findByGithubId(githubIndex);
      console.log(user);
      const a = await this.stackRepository().creatStack(user, stack);
      console.log(a);
      res.json({
        message: 'success'
      })
    } catch (err) {
      next(err);
    }
  }
}