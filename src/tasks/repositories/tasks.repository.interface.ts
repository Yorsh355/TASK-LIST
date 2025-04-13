import { BaseInterfaceRepository } from '../../common/repository/base.interface.repository';
import { TaskEntity } from '../entities/task.entity';

export type ITasksRepository = BaseInterfaceRepository<TaskEntity>;
