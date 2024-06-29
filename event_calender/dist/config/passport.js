"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("../models/users"));
dotenv_1.default.config();
const jwtOptions = {
    secretOrKey: process.env.SECRETKEY || '',
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
async function jwtVerify(payload, done) {
    try {
        const user = await users_1.default.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, jwtVerify);
exports.default = jwtStrategy;
