import { BaseInterfaceRepository } from '../../common/repository/base.interface.repository';
import { UserEntity } from '../entities/user.entity';

export type IUsersRepository = BaseInterfaceRepository<UserEntity>;
