import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { NODE_ENV, PORT } from './config';
import { ApiRouter } from './routers/api.router';

// import '../src/auth/local.auth';
import '../src/auth/social.auth';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    );
    this.app.use(json());
    this.app.use(cookieParser());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(
      session({
        name: 'session',
        secret: 'megatronics',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: NODE_ENV === 'production',
        },
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
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
    this.app.use('/api', apiRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
