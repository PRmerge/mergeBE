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
    user.update('', '', intro, null);
    return this.userRepository().save(user);
  };

  // Add user's stacks
  async updateStack(githubIndex: number, stacks: string[]) {
    const user = await this.userRepository().findByGithubId(githubIndex);
    user.update('', '', '', stacks);
    return this.userRepository().save(user);
  }

  // Get github'infos (most language, commit ...)
  async updateGithubInfos(userId: string, githubIndex: number, githubToken: string) {

    const user = await this.userRepository().findByGithubId(githubIndex);

    if (!user) {
      throw new Error('not such user not found.');
    }

    const getRepoList = await axios({
      method: 'GET',
      url: `https://api.github.com/users/${ userId }/repos`,
      headers: {
        authorization: `token ${ githubToken }`,
      },
    });

    // FIXME: repo가 없는 경우에 대한 if문 작성 필요
    const repoList: string[] = getRepoList.data.map((repo) => repo.languages_url);
    const countRepos = repoList.length;

    const languageList = await Promise.all(repoList.map(async (repo) => {
      const getLanguage = await axios({
        method: 'GET',
        url: repo,
        headers: {
          authorization: `token ${ githubToken }`,
        },
      });
      return getLanguage.data;
    }));

    const mostLanguageList = {};
    for (let i = 0; i < languageList.length; i++) {
      Object.keys(languageList[i]).map((language) => {
        if (language in mostLanguageList) {
          mostLanguageList[language] += languageList[i][language];
        } else {
          mostLanguageList[language] = languageList[i][language];
        }
      });
    }

    // Todo: commits 관련 해결 필요
    user.infos = JSON.stringify({ countRepos, mostLanguageList });
    console.log(JSON.parse(user.infos));
    return this.userRepository().save(user);
  }
}