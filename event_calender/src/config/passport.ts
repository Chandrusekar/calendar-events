import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Model } from 'mongoose';
import dotenv from 'dotenv';
import UserModel, { UserDocument } from '../models/users'
dotenv.config();

const jwtOptions = {
  secretOrKey: process.env.SECRETKEY || '',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};


// Define the types for payload and done callback
interface JwtPayload {
  sub: string; // Adjust based on your JWT payload structure
  // Add other fields from JWT payload as needed
}

type JwtDoneCallback = (error: Error | null, user?: UserDocument | boolean) => void;

async function jwtVerify(payload: JwtPayload, done: JwtDoneCallback) {
  try {
    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error: any) {
    done(error, false);
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;