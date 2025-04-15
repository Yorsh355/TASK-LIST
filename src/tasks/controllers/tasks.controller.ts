import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { TaskEntity } from '../entities/task.entity';

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
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ): Promise<TaskEntity[]> {
    return this.tasksService.findAllTask(req.user, take, skip);
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
