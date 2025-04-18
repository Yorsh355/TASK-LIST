import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from '../../users/repositories/users.repository';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces/jwt.payload.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UsersRepository,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;

    const user = await this.userRepository.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Token not valid');

    console.log({ user });

    return user;
  }
}
