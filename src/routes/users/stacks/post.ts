import { Request, Response, NextFunction, Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { UserService } from '../../../services/users/application/service';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();

router.post('/users/stacks', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stacks } = req.body;
    // Todo: 로그인 인증 생성시 구현
    // const { githubIndex } = res.locals;
    const response = await userService.updateStack(84619866, stacks);
    res.json({
      data: response.stack,
    });
  } catch (err) {
    next(err);
  }
});

export default router;