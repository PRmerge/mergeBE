import { Request, Response, NextFunction, Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { UserService } from '../../../services/users/application/service';
import axios from 'axios';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();


// Todo:
router.patch('/users/infos', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  const user: string = res.locals.userName;

  const temp = await axios({
    method: 'GET',
      url: `https://api.github.com/users/${user}/repos`,
    headers: {
      authorization: `token ${res.locals.githubToken}`
    }
  })
  const repos = [];
  for (let reposLanguage of temp.data) {
    repos.push(reposLanguage.languages_url);
  }


  for (let i = 0; i < repos.length; i++) {
    let language = await axios({
      method: 'GET',
      url: repos[i],
      headers: {
        authorization: `token ${res.locals.githubToken}`
      }
    })
    console.log(language.data);
  }

  res.json();

})

export default router;
