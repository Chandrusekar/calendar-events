"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required(),
    DOB: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required()
});
exports.signupSchema = signupSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).required(),
    password: joi_1.default.string().min(6).required(),
});
exports.loginSchema = loginSchema;
