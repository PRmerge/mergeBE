import post from './post';
import { publicPreLogin } from './pre';

export const publicLogin = [post, ...publicPreLogin];
