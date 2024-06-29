"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const appointmentSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    appId: joi_1.default.string(),
    start_time: joi_1.default.date().required(),
    end_time: joi_1.default.date().required(),
    userId: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
});
exports.appointmentSchema = appointmentSchema;
