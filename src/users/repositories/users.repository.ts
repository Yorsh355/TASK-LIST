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

  async findUserById(id: string): Promise<UserEntity> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where('user.id = :id', { id })
      .andWhere('user.isActive = :isActive', { isActive: true })
      .getOne();

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .select(['user.email', 'user.password', 'user.role'])
      .where('user.email = :email', { email })
      .andWhere('user.isActive = :isActive', { isActive: true })
      .getOne();

    console.log(user);
    return user;
  }
}
