import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'src/constants/enums';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
