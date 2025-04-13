import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user-dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../../users/repositories/users.repository';
import { JwtPayload } from '../../interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.usersRepository.save({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<IUser> {
    const { password, email } = loginUserDto;

    const user = await this.usersRepository.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException('Not valids credentials (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Not valids credentials (password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  /*   async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  } */

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
