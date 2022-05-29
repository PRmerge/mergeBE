import { Router } from 'express';
import { UserService } from '../services/users/application/service';
import { UserAuth } from '../middlewares/auth';

const router = Router();
const userService = new UserService();
const userAuth = new UserAuth();

router.get('/', userAuth.loginUserAuth, async (req, res, next) => {
  try {
    // TODO: random 10명 뽑는 방식으로 선출해야한다.
    const userList = await userService.list();

    res.json({ data: userList });
  } catch (err) {
    next(err);
  }
});

export default router;
