export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: boolean;
  isActive: boolean;
  createAt: Date;
  updateAt?: Date;
  userId: string;
}
