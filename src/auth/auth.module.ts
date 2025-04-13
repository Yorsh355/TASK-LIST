import { Global, Module } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { AuthController } from '../auth/controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/repositories/users.repository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity]), UsersModule],
})
export class AuthModule {}
