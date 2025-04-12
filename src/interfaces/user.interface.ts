export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createAt: Date;
  updateAt?: Date;
}
