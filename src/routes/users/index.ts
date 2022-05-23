import { privateIntro } from './intro';
import { privateLanguage } from './language';
import { privateGithubId } from './_githubId';

export const privateUsersRouter = [...privateIntro, ...privateLanguage, ...privateGithubId];
