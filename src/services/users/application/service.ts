import { UserRepository } from '../infrastructure/repository';
import axios from 'axios';

export class UserService {
  private userRepository = UserRepository;
  // get 10 users
  getTenUser() {
    return this.userRepository().findRandom();
  }

  // create intro
  async saveUserIntro(intro: string, githubIndex: number) {
    const user = await this.userRepository().findByGithubId(githubIndex);
    user.introUpdate(intro);
    return this.userRepository().save(user);
  };

  // Add user's stacks
  async updateStack(githubIndex: number, stacks: string[]) {
    const user = await this.userRepository().findByGithubId(githubIndex);
    user.updateStack(stacks);
    return this.userRepository().save(user);
  }

  // Get github'infos (most language, commit ...)
  async updateGithubInfos(user: string, githubToken: string) {
    const getRepoList = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${user}/repos`,
      headers: {
        authorization: `token ${githubToken}`
      }
    });

    const repoList: string[] = getRepoList.data.map((repo) => repo.languages_url);
    const languageList = await Promise.all([...repoList.map(async (repo) => {
      const getLanguage = await axios({
        method: 'GET',
        url: repo,
        headers: {
          authorization: `token ${githubToken}`
        }
      });
      return getLanguage.data;
    })]);

    const mostLanguageList = {};
    for (let i=0; i<languageList.length; i++) {
      Object.keys(languageList[i]).map((language) => {
        if (language in mostLanguageList) {
          mostLanguageList[language] += languageList[i][language];
        } else {
          mostLanguageList[language] = languageList[i][language];
        }
      })
    }
    return mostLanguageList
  }
}