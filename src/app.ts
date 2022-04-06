import * as express from 'express';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMysql } from './db';
import { globalRoutes } from './routes';
import { errorHandler, routerError } from './middlewares/error-handler';

class App {
  public app: express.Application = express();

  private init() {
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({origin: true}));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(compression());
  }

  // routes Handler
  private routesHandler() {
    this.app.use('/', globalRoutes);
    this.app.use(routerError);
    this.app.use(errorHandler);
  }

  // connect Mysql
  private DB() {
    connectMysql().then(() => {
      console.log('MySQL 연결 성공');
    });
    // connectMongo().then(() => {
    //   console.log('MongoDB 연결 성공');
    // });
  }

  constructor() {
    this.init();
    this.DB();
    this.routesHandler();
  }
}

export default App;