import { Request, Response, NextFunction, Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { UserService } from '../../../services/users/application/service';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();

router.post('/users/stacks', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stacks } = req.body;
    const { githubIndex } = res.locals;

    const response = await userService.updateStack(githubIndex, stacks);
    res.json({
      data: response.stack,
    });
  } catch (err) {
    next(err);
  }
});

export default router;