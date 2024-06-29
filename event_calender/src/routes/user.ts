import express, { Request, Response, Router } from 'express';
import { signup, login, dashboard } from '../controllers/userController'; // Adjust the path as per your application structure
import { auth } from '../middleware/authentication'; // Adjust the path as per your application structure

const userRouter: Router = express.Router();

userRouter.get("/ping", (req: Request, res: Response) => res.send("pong"));

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/dashboard', auth(), dashboard);

export default userRouter;