import express, { Request, Response, Router } from 'express';
import { auth } from '../middleware/authentication';
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentByUser, updateAppointment } from '../controllers/appointmentController';
import { roleRights } from '../config/roles';

const eventRouter: Router = express.Router();

eventRouter.get("/ping", (req: Request, res: Response) => res.send("pong"));

eventRouter.post('/events', auth(), createAppointment);
eventRouter.put('/events', auth(), updateAppointment);
eventRouter.delete('/event/:eventId', auth(), deleteAppointment)
eventRouter.get('/event-list', auth(), getAllAppointments);
eventRouter.get('/events-by-user/:userId', auth(), getAppointmentByUser);

export default eventRouter;