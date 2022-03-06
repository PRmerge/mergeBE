import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users/application/service';

const router = Router();
const userService = new UserService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getTenUser();
    console.log(response);

    res.json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

export default router;