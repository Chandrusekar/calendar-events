import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { signupSchema, loginSchema } from '../middleware/userSchamaValidation'; // Adjust the path as per your application structure
import Users, { UserDocument } from '../models/users'; // Adjust the path and EmployeeDocument type as per your application structure
import dotenv from 'dotenv';

const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

interface CustomError extends Error {
    isJoi?: boolean;
    status?: number;
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await signupSchema.validateAsync(req.body, options);

        const doesExist = await Users.find({ email: result.email });

        if (doesExist.length > 0) {
            throw new Error(`${result.email} is already registered`);
        }

        const employee = new Users({ ...result, userId: `Emp-${Math.floor(Math.random() * 10000)}` });
        const savedUser = await employee.save();

        res.status(201).json(savedUser);
    } catch (error) {
        if ((error as CustomError).isJoi === true) {
            (error as CustomError).status = 422;
        }
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await loginSchema.validateAsync(req.body, options);

        const { email, password } = req.body;
        const employee = await Users.findOne({ email }).select("+password");

        if (!employee || !(await employee.correctPassword(password, employee.password))) {
            throw new Error(`Invalid User ${email}`);
        }

        const accessTokenExpires = moment().add(60, "minutes");

        const payload = {
            sub: employee.id,
            iat: moment().unix(),
            exp: accessTokenExpires.unix()
        };

        const token = await jwt.sign(payload, process.env.SECRETKEY || '');
        res.status(200).json({ ...employee.toJSON(), token }); // Using toJSON() to exclude sensitive fields like password
    } catch (error) {
        if ((error as CustomError).isJoi === true) {
            (error as CustomError).status = 422;
        }
        next(error);
    }
};

export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("Welcome");
    } catch (error) {
        next(error);
    }
};