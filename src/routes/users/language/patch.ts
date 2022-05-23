import { Router } from 'express';
import { UserService } from '../../../services/users/application/service';
import { UserAuth } from '../../../middlewares/auth';

const router = Router();
const userService = new UserService();
const userAuth = new UserAuth();

router.patch('/users/language', userAuth.loginUserAuth, async (req, res, next) => {
  const { githubId, githubToken } = res.locals;
  const { repoList }: { repoList: string[] } = req.body;

  try {
    // TODO: 사용하는 언어 관련 서비스
    res.json('1');
  } catch (err) {
    next(err);
  }
});

export default router;
