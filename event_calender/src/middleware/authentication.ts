import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { UserDocument } from '../models/users'; // Adjust the path and EmployeeDocument type as per your application structure

type VerifyCallback = (err: any, user?: UserDocument | false, info?: any) => void;

const verifyCallback = (req: Request, res: Response, next: NextFunction, resolve: () => void, reject: (reason?: any) => void): VerifyCallback => (err, user, info) => {
  if (err || info || !user) {
    reject(info);
  }
  req.user = user;
  resolve();
};

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  return new Promise<void>((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, res, next, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => {
      next(err);
    });
};

export { auth };