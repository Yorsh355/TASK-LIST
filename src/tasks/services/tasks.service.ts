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

  async findAllTask(): Promise<TaskEntity[]> {
    try {
      const tasks = await this.tasksRepository.findAll();

      return tasks;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('No tasks found');
    }
  }

  async findOneTask(id: string): Promise<TaskEntity> {
    try {
      const user = await this.tasksRepository.findTaskById(id);

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('No users found');
    }
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    //if(task.affected === 0) throw new NotFoundException('Task not found');
    try {
      const findTask = await this.findOneTask(id);

      if (!findTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

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

  async removeTask(id: string): Promise<string> {
    const findTask = await this.findOneTask(id);

    if (!findTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    try {
      await this.tasksRepository.remove(findTask);

      return `La tarea con ID ${id} ha sido eliminada`;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error deleting task');
    }
  }
}
