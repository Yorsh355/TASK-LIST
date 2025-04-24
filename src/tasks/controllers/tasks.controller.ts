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
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { TaskEntity } from '../entities/task.entity';
import { QueryParamsDto } from '../dto/query-params.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  findAllTask(
    @Request() req,
    @Query() queryParamsDto: QueryParamsDto,
  ): Promise<TaskEntity[]> {
    return this.tasksService.findAllTask(req.user, queryParamsDto);
  }

  @Get(':id')
  findOneTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOneTask(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  removeTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.removeTask(id);
  }
}
