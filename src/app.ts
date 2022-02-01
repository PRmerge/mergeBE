import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as compression from 'compression';
import 'dotenv/config';
import helmet from 'helmet';
import { connectMySQL } from './entity';
import { connectMongoDB } from './schema';

class App {
  public app: express.Application = express();

  private readonly corsOption = {
    origin: true,
    credentials: true
  };

  private init() {
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors(this.corsOption));
  }

  private mongoDB() {
    connectMongoDB().then((): void => {
      console.log(`MongoDB 연결 성공`);
    });
  }

  private MySQL() {
    connectMySQL().then((): void => {
      console.log(`MySQL 연결 성공`);
    });
  }

  constructor() {
    this.init();
    this.MySQL();
    this.mongoDB();
  }
}

export default App;