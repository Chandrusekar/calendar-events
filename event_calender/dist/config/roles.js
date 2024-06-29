"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.roleRights = exports.roles = void 0;
const roles = ['user', 'admin'];
exports.roles = roles;
const Appointment = ['Scheduled', 'Completed', 'Cancelled', 'Deleted'];
exports.Appointment = Appointment;
const roleRights = {
    [roles[0]]: ['getAllAppoinments'],
    [roles[1]]: ['getUsers', 'manageUsers', 'getAllAppoinments', 'getAppoinmentByUser'],
};
exports.roleRights = roleRights;
