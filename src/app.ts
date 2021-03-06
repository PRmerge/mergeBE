import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as compression from 'compression';
import { connectMysql } from './config/mysql';
import { globalRouter } from './routes';
import 'dotenv/config';
import { errorHandler, routerError } from './middlewares/error-handler';

class App {
  app: express.Application = express();

  private init() {
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({ origin: true }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(compression());
  }

  private routerHandler() {
    this.app.use('/', globalRouter);
    this.app.use(routerError);
    this.app.use(errorHandler);
  }

  constructor() {
    this.init();
    this.routerHandler();
    connectMysql().then(() => {
      console.log('connect Mysql!');
    });
  }
}

export default App;
