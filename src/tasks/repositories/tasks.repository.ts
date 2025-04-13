import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '../../common/repository/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { ITasksRepository } from './tasks.repository.interface';

@Injectable()
export class TasksRepository
  extends BaseAbstractRepository<TaskEntity>
  implements ITasksRepository
{
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {
    super(tasksRepository);
  }
}
