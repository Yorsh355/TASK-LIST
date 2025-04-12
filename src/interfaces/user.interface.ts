export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  createAt: Date;
  updateAt?: Date;
}
