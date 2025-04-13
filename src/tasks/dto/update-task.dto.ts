import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../constants/enums';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
