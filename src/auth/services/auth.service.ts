import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
    return 'This action adds a new auth';
  }
}
