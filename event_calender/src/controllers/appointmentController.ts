import { Request, Response, NextFunction } from 'express';
import { appointmentSchema } from '../middleware/appointmentSchemaValidation';
import Appointments from '../models/appointments';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO, format
} from 'date-fns';
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true // remove unknown props
};

interface CustomError extends Error {
  isJoi?: boolean;
  status?: number;
}

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await appointmentSchema.validateAsync(req.body, options);

    const newEvent = {
      ...result,
      id: `E-${Math.floor(Math.random() * 100)}`,
      created_date: new Date(),
      start : parseISO(addDays(startOfDay(new Date(result.start)), 1).toISOString()),
      end : parseISO(addDays(new Date(result.end), 2).toISOString())
    }

    const appointment = new Appointments(newEvent);
    const createAppointment = await appointment.save();

    res.status(201).json(createAppointment);
  } catch (error) {
    if ((error as CustomError).isJoi === true) {
      (error as CustomError).status = 422;
    }
    next(error);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await appointmentSchema.validateAsync(req.body, options);

    const filter = { appId: result.appId };
    console.log(result.appId)
    const updateAppointment = await Appointments.findOneAndUpdate(filter, result, { returnOriginal: false })

    res.status(201).json(updateAppointment);
  } catch (error) {
    if ((error as CustomError).isJoi === true) {
      (error as CustomError).status = 422;
    }
    next(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = { appId: req.params.eventId };
    const deleteAppointment = await Appointments.findOneAndDelete(filter)

    res.status(201).json(deleteAppointment);
    res.send("Welcome");
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allAppointments = await Appointments.find({});
    res.status(201).json(allAppointments);
  } catch (error) {
    if ((error as CustomError).isJoi === true) {
      (error as CustomError).status = 422;
    }
    next(error);
  }
};

export const getAppointmentByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = { userId: req.params.userId }
    const allAppointmentsByUser = await Appointments.findOne(filter)
    res.status(201).json(allAppointmentsByUser);
  } catch (error) {
    if ((error as CustomError).isJoi === true) {
      (error as CustomError).status = 422;
    }
    next(error);
  }
};