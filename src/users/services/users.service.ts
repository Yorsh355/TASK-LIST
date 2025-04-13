import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(private readonly usersRepository: UsersRepository) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.usersRepository.save({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.usersRepository.findAll();

      return users;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('No users found');
    }
  }

  async findUserById(id: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findUserById(id);

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('No users found');
    }
  }
}
