import express, { Express, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import passport from 'passport';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

import jwtStrategy from './config/passport';

const app: Express = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

import userRoute from './routes/user';
import eventRouter from './routes/events';

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Set security HTTP headers
app.use(helmet());

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

const corsOptions:CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods:['GET','POST','PUT','DELETE','PATCH'],
  preflightContinue:true
};

// Allow Cross-Origin requests
app.use(cors(corsOptions));

interface CustomRequest extends Request {
  id?: string;
}

// Define the custom token
morgan.token('id', function getId(req: CustomRequest) {
  return req.id || '-';
});

app.use(morgan(':remote-addr :date[web] :id :method :url :response-time', { stream: accessLogStream }))

app.get('', (req, res) => {
  res.json({ "greet": "welcome" })
})

app.use('/api', [userRoute, eventRouter]);

// Custom error handler middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({'msg':err.message});
});

export default app;
