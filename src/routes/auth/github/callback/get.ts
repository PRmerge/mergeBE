import { Router, Request, Response, NextFunction } from 'express';
import { GithubLoginService } from '../../../../services/users/application/github/login/service';

const router = Router();
const githubLoginService = new GithubLoginService();

router.get('/auth/github/callback', async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.query;

  try {
    const [ loginToken, githubToken ] = await githubLoginService.getGithubCallback(code as string);

    res.status(201).json({ loginToken, githubToken, });
  } catch (err) {
    next(err);
  }
});

export default router;
