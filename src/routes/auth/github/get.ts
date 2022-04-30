// TODO: 프론트에서 작업할 내용
import { NextFunction, Request, Response, Router } from 'express';
import { GithubLoginService } from '../../../services/users/application/github/login/service';

const router = Router();
const githubLoginService = new GithubLoginService();

router.get('/auth/github', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.redirect(githubLoginService.redirectAuthURI);
  } catch (err) {
    next(err);
  }
});

export default router;