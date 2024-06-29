"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController"); // Adjust the path as per your application structure
const authentication_1 = require("../middleware/authentication"); // Adjust the path as per your application structure
const userRouter = express_1.default.Router();
userRouter.get("/ping", (req, res) => res.send("pong"));
userRouter.post('/signup', userController_1.signup);
userRouter.post('/login', userController_1.login);
userRouter.get('/dashboard', (0, authentication_1.auth)(), userController_1.dashboard);
exports.default = userRouter;
