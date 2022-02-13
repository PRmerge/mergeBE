import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../../infrastructure/repository';

export class GithubLoginService {
  // github auth
  private readonly github = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    redirectURI: process.env.GITHUB_REDIRECT
  };

  // authorize 후 redirect 되는 주소
  private redirectAuthURI: string = 'https://github.com/login/oauth/authorize?client_id=' + this.github.clientID
    + '&redirect_uri=' + this.github.redirectURI;

  // To et accessToken URI
  private accessTokenURI(code: string): string {
    return `https://github.com/login/oauth/access_token?client_id=${this.github.clientID}&client_secret=${this.github.clientSecret}&code=${code}`;
  }

  // get Access Token
  private getAccessToken(code) {
    return axios({
      method: 'POST',
      url: this.accessTokenURI(code),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  // get user information
  private getUserInformation(accessToken) {
    return axios({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        authorization: `token ${accessToken}`
      }
    });
  }

  // get auth
  public getGithubAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.redirect(this.redirectAuthURI);
    } catch (err) {
      next(err);
    }
  };

  // github callback URI and get accessToken
  public getGithubCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code } = req.query;
      const userRepository = getCustomRepository(UserRepository);

      // get access token
      const accessToken = await this.getAccessToken(code);
      const splitAccessToken: string = accessToken.data.split('&')[0].split('=')[1];
      const userInformation = await this.getUserInformation(splitAccessToken);

      const { login, avatar_url, id }: { login: string, avatar_url: string, id: number } = userInformation.data;
      const isUser = await userRepository.findByGihubId(id);

      if (!isUser) {
        await userRepository.saveUser(login, avatar_url, splitAccessToken, id);
      } else {
        await userRepository.updateUser(isUser, login, avatar_url, splitAccessToken);
      }

      const [ jwtLoginToken, jwtGithubToken ]: string[] = await Promise.all([
        jwt.sign({ login, avatar_url, id }, process.env.JTW_SECRET_KEY),
        jwt.sign({ splitAccessToken }, process.env.JTW_SECRET_KEY)
      ]);

      // Todo: localStorage 로 변경필요
      res.cookie('loginToken', jwtLoginToken);
      res.cookie('GithubToken', jwtGithubToken);
      res.status(200).json({
        loginToken: jwtLoginToken,
        githubToken: jwtGithubToken
      });

    } catch (err) {
      next(err);
    }
  };
}