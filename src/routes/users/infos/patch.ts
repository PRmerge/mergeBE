import { Request, Response, NextFunction, Router } from 'express';
import { UserAuth } from '../../../middlewares/auth/user-auth';
import { UserService } from '../../../services/users/application/service';
import axios from 'axios';

const router = Router();
const userAuth = new UserAuth();
const userService = new UserService();

router.patch('/users/infos', userAuth.loginUserAuth, async (req: Request, res: Response, next: NextFunction) => {
  const user: string = res.locals.user;

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

  const languageList = await Promise.all([...repos.map(async (repo) => {
    const getLanguage = await axios({
      method: 'GET',
      url: repo,
      headers: {
        authorization: `token ${res.locals.githubToken}`
      }
    })
    return getLanguage.data;
  })])

  const mostLanguageList = {};
  for (let i=0; i<languageList.length; i++) {
    Object.keys(languageList[i]).map((language => {
      if (language in mostLanguageList) {
        mostLanguageList[language] += languageList[i][language];
      } else {
        mostLanguageList[language] = languageList[i][language];
      }
    }))
  }
  res.status(200).json({ data: {...mostLanguageList}});
})

export default router;
