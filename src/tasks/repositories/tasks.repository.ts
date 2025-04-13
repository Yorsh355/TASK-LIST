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

  async findTaskById(id: string): Promise<TaskEntity> {
    const queryBuilder = this.tasksRepository.createQueryBuilder('task');

    const task = queryBuilder
      .where('task.id = :id', { id })
      .andWhere('task.isActive = :isActive', { isActive: true })
      .getOne();

    return task;
  }
}
