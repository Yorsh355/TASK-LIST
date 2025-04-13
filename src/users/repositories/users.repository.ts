import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '../../common/repository/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsersRepository } from './users.repository.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<UserEntity>
  implements IUsersRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
}
