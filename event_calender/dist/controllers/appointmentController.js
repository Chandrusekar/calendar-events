"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentByUser = exports.getAllAppointments = exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = void 0;
const appointmentSchemaValidation_1 = require("../middleware/appointmentSchemaValidation");
const appointments_1 = __importDefault(require("../models/appointments"));
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true // remove unknown props
};
const createAppointment = async (req, res, next) => {
    try {
        const result = await appointmentSchemaValidation_1.appointmentSchema.validateAsync(req.body, options);
        const appointment = new appointments_1.default({ ...result, appId: `E-${Math.floor(Math.random() * 100)}` });
        const createAppointment = await appointment.save();
        res.status(201).json(createAppointment);
    }
    catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
};
exports.createAppointment = createAppointment;
const updateAppointment = async (req, res, next) => {
    try {
        const result = await appointmentSchemaValidation_1.appointmentSchema.validateAsync(req.body, options);
        const filter = { appId: result.appId };
        console.log(result.appId);
        const updateAppointment = await appointments_1.default.findOneAndUpdate(filter, result, { returnOriginal: false });
        res.status(201).json(updateAppointment);
    }
    catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res, next) => {
    try {
        const filter = { appId: req.params.eventId };
        const deleteAppointment = await appointments_1.default.findOneAndDelete(filter);
        res.status(201).json(deleteAppointment);
        res.send("Welcome");
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAppointment = deleteAppointment;
const getAllAppointments = async (req, res, next) => {
    try {
        const allAppointments = await appointments_1.default.find({});
        res.status(201).json(allAppointments);
    }
    catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
};
exports.getAllAppointments = getAllAppointments;
const getAppointmentByUser = async (req, res, next) => {
    try {
        const filter = { userId: req.params.userId };
        const allAppointmentsByUser = await appointments_1.default.findOne(filter);
        res.status(201).json(allAppointmentsByUser);
    }
    catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
};
exports.getAppointmentByUser = getAppointmentByUser;
