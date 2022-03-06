import { Router, Request, Response, NextFunction } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { GithubApi } from '../../../services/users/application/github/service';

// Todo: login Auth
const router = Router();
// const userAuth = new UserAuth();
const github = new GithubApi();

router.get('/users/:userName', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = req.params;
    const user = await github.getUserProfile(userName, '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');

    const { login, avatar_url, url, repos_url } = user.data;
    res.json({
      data: {
        nickname: login,
        imgUrl: avatar_url,
        userUrl: url,
        reposUrl: repos_url,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;