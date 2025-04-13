import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAllTask() {
    return this.tasksService.findAllTask();
  }

  @Get(':id')
  findOneTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOneTask(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.removeTask(id);
  }
}
