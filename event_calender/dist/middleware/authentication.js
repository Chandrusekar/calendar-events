"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const passport_1 = __importDefault(require("passport"));
const verifyCallback = (req, res, next, resolve, reject) => (err, user, info) => {
    if (err || info || !user) {
        reject(info);
    }
    req.user = user;
    resolve();
};
const auth = () => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate('jwt', { session: false }, verifyCallback(req, res, next, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => {
        next(err);
    });
};
exports.auth = auth;
