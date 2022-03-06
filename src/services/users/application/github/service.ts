import axios from 'axios';

export class GithubApi {
  getUserProfile = async (userName: string, githubToken: string) => {
      // const githubToken = res.locals.githubToken;
      return axios({
        method: 'GET',
        url: `https://api.github.com/users/${userName}`,
        headers: {
          Authorization: `token ${githubToken}`
        }
      });
  };
}