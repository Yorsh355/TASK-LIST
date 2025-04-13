import { ROLES } from '../constants/enums';

export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: ROLES;
  isActive: boolean;
  createAt: Date;
  updateAt?: Date;
}
