import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user-dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly usersRepository: UsersRepository) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { password, email } = loginUserDto;

    const user = await this.usersRepository.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException('Not valids credentials (email)');

    if (bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Not valids credentials (password)');

    return user;
  }
}
