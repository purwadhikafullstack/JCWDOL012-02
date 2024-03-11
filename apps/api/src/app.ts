import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import strategies from './utils/passport';
import cookieParser from 'cookie-parser';
import { PORT } from './config';
import { ApiRouter } from './routers/api.router';
import { corsOptions } from './utils/cors';
import { deserializeUser } from './middleware/auth/authentication.middleware';

passport.use(strategies.google);

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors(corsOptions));
    this.app.use(json());
    this.app.use(cookieParser());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(deserializeUser);
    this.app.use(passport.initialize());
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        console.error('Error : ', err.stack);
        res.status(500).send('Error !');
      } else {
        next();
      }
    });
  }

  private routes(): void {
    const apiRouter = new ApiRouter();
    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Wellcome to Megatronics API!`);
    });
    this.app.use('/api/public', express.static(path.join(__dirname, '../public')));
    this.app.use('/api', apiRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
