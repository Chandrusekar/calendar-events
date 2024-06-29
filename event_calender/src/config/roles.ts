
type Role = 'user' | 'admin';
type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Deleted';

interface RoleRights {
  [key: string]: string[];
}
const roles: Role[] = ['user', 'admin'];

const Appointment: AppointmentStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'Deleted'];

const roleRights: RoleRights = {
  [roles[0]]: ['getAllAppoinments'],
  [roles[1]]: ['getUsers', 'manageUsers','getAllAppoinments', 'getAppoinmentByUser'],
};

export { roles, roleRights, Appointment };