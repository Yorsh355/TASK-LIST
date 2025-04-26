import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksRepository } from '../repositories/tasks.repository';
import { TaskEntity } from '../entities/task.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { QueryParamsDto } from '../dto/query-params.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService');

  constructor(private readonly tasksRepository: TasksRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const user = await this.tasksRepository.save(createTaskDto);

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAllTask(
    user: UserEntity,
    queryParamsDto: QueryParamsDto,
  ): Promise<TaskEntity[]> {
    try {
      const { take, skip } = queryParamsDto;

      if (user.role.includes('ADMIN')) {
        // ADMIN: Devolver todas las tareas
        return await this.tasksRepository.findAllTasks(take, skip);
      } else {
        // USER: Devolver solo las tareas del usuario
        return await this.tasksRepository.findTaskByUserId(user.id, take, skip);
      }
    } catch (err) {
      this.logger.error(`Error fetching tasks: ${err.message}`);
      throw new InternalServerErrorException('Failed to retrieve tasks');
    }
  }

  async findOneTask(id: string, user: UserEntity): Promise<TaskEntity> {
    let task: TaskEntity;
    try {
      if (user.role.includes('ADMIN')) {
        task = await this.tasksRepository.findTaskById(id);
      } else {
        task = await this.tasksRepository.findTaskByUserIdAndTaskId(
          user.id,
          id,
        );
      }

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return task;
    } catch (err) {
      this.logger.error(err);
      if (err instanceof NotFoundException) {
        throw err; // Re-lanza la NotFoundException
      }
      throw new InternalServerErrorException(
        'Something went wrong while fetching the task',
      );
    }
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    try {
      const findTask = await this.findOneTask(id, user);

      const updatedTask = {
        ...findTask,
        ...updateTaskDto,
      };

      const task = await this.tasksRepository.save(updatedTask);

      return task;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error updating task');
    }
  }

  async removeTask(id: string, user: UserEntity): Promise<string> {
    const findTask = await this.findOneTask(id, user);

    try {
      await this.tasksRepository.remove(findTask);

      return `La tarea con ID ${id} ha sido eliminada`;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error deleting task');
    }
  }
}
