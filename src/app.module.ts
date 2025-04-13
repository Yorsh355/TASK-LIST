import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourseConfig } from './config/data.source';
import { TasksModule } from './tasks/tasks.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourseConfig }),
    UsersModule,
    TasksModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
