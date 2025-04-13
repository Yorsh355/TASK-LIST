import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TasksRepository } from './repositories/tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  exports: [TasksRepository],
})
export class TasksModule {}
