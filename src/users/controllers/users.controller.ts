import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ValidRoles } from '../../auth/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
@Auth(ValidRoles.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(ValidRoles.ADMIN)
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @Auth()
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }
}
