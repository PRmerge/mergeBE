import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as compression from 'compression';
import 'dotenv/config';
import helmet from 'helmet';

const corsOption = {
  origin: true,
  credentials: true
};

class App {
  public app: express.Application = express();

  private init() {
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors(corsOption));
  }

  constructor() {
    this.init();
  }
}

export default App;