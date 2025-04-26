import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { TaskEntity } from '../entities/task.entity';
import { QueryParamsDto } from '../dto/query-params.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('tasks')
@Auth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAllTask(
    @Request() req: ExpressRequest,
    @Query() queryParamsDto: QueryParamsDto,
  ): Promise<TaskEntity[]> {
    const user = req.user as UserEntity;

    return this.tasksService.findAllTask(user, queryParamsDto);
  }

  @Get(':id')
  findOneTask(
    @Request() req: ExpressRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = req.user as UserEntity;

    return this.tasksService.findOneTask(id, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  updateTask(
    @Request() req: ExpressRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const user = req.user as UserEntity;

    return this.tasksService.updateTask(id, updateTaskDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  removeTask(
    @Request() req: ExpressRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = req.user as UserEntity;

    return this.tasksService.removeTask(id, user);
  }
}
