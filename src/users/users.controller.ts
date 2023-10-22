import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('/getuser')
  async getUserByEmail(@Body('email') email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (user) return user;
    
    else return { message: 'Пользователь не найден' };
  }
}
