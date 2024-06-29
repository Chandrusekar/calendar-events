"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const appointmentController_1 = require("../controllers/appointmentController");
const eventRouter = express_1.default.Router();
eventRouter.get("/ping", (req, res) => res.send("pong"));
eventRouter.post('/events', (0, authentication_1.auth)(), appointmentController_1.createAppointment);
eventRouter.put('/events', (0, authentication_1.auth)(), appointmentController_1.updateAppointment);
eventRouter.delete('/event/:eventId', (0, authentication_1.auth)(), appointmentController_1.deleteAppointment);
eventRouter.get('/event-list', (0, authentication_1.auth)(), appointmentController_1.getAllAppointments);
eventRouter.get('/events-by-user/:userId', (0, authentication_1.auth)(), appointmentController_1.getAppointmentByUser);
exports.default = eventRouter;
