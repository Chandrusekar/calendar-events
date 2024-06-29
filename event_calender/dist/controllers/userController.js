"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = exports.signup = void 0;
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchamaValidation_1 = require("../middleware/userSchamaValidation"); // Adjust the path as per your application structure
const users_1 = __importDefault(require("../models/users")); // Adjust the path and EmployeeDocument type as per your application structure
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true // remove unknown props
};
const signup = async (req, res, next) => {
    try {
        const result = await userSchamaValidation_1.signupSchema.validateAsync(req.body, options);
        const doesExist = await users_1.default.find({ email: result.email });
        if (doesExist.length > 0) {
            throw new Error(`${result.email} is already registered`);
        }
        const employee = new users_1.default({ ...result, userId: `Emp-${Math.floor(Math.random() * 10000)}` });
        const savedUser = await employee.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const result = await userSchamaValidation_1.loginSchema.validateAsync(req.body, options);
        const { email, password } = req.body;
        const employee = await users_1.default.findOne({ email }).select("+password");
        if (!employee || !(await employee.correctPassword(password, employee.password))) {
            throw new Error(`Invalid User ${email}`);
        }
        const accessTokenExpires = (0, moment_1.default)().add(60, "minutes");
        const payload = {
            sub: employee.id,
            iat: (0, moment_1.default)().unix(),
            exp: accessTokenExpires.unix()
        };
        const token = await jsonwebtoken_1.default.sign(payload, process.env.SECRETKEY || '');
        res.status(200).json({ ...employee.toJSON(), token }); // Using toJSON() to exclude sensitive fields like password
    }
    catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
};
exports.login = login;
const dashboard = async (req, res, next) => {
    try {
        res.send("Welcome");
    }
    catch (error) {
        next(error);
    }
};
exports.dashboard = dashboard;
