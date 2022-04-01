import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { UserRepository } from '../../../infrastructure/repository';
import { User } from '../../../domain/model';

export class GithubLoginService {
  private userRepository = UserRepository;

  // github auth
  private readonly github = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectURI: process.env.GITHUB_REDIRECT,
  };

  // authorize 후 redirect 되는 주소
  redirectAuthURI: string = 'https://github.com/login/oauth/authorize?client_id=' + this.github.clientID
    + '&redirect_uri=' + this.github.redirectURI;

  // To et accessToken URI
  private accessTokenURI(code: string): string {
    return `https://github.com/login/oauth/access_token?client_id=${ this.github.clientID }&client_secret=${ this.github.clientSecret }&code=${ code }`;
  }

  // get Access Token
  private getAccessToken(code) {
    return axios({
      method: 'POST',
      url: this.accessTokenURI(code),
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  // get user information
  private getUserInformation(accessToken) {
    return axios({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        authorization: `token ${ accessToken }`,
      },
    });
  }

  // github callback URI and get accessToken
  async getGithubCallback(code: string) {

    // get access token
    const accessToken = await this.getAccessToken(code);
    const splitAccessToken: string = accessToken.data.split('&')[0].split('=')[1];
    const userInformation = await this.getUserInformation(splitAccessToken);
    const { login, avatar_url, id }: { login: string, avatar_url: string, id: number } = userInformation.data;
    const user = await this.userRepository().findByGithubId(id);

    if (!user) {
      await this.userRepository().save(User.create(login, avatar_url, splitAccessToken, id));
    } else {
      user.update(avatar_url, splitAccessToken);
      await this.userRepository().save(user);
    }

    const [ jwtLoginToken, jwtGithubToken ]: string[] = await Promise.all([
      jwt.sign({ login, avatar_url, id }, process.env.JTW_SECRET_KEY),
      jwt.sign({ splitAccessToken }, process.env.JTW_SECRET_KEY),
    ]);

    // Todo: localStorage 로 변경필요
    return [ jwtLoginToken, jwtGithubToken ];

  };
}