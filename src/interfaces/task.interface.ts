import { TaskStatus } from '../constants/enums';

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  isActive: boolean;
  createAt: Date;
  updateAt?: Date;
  userId: string;
}
