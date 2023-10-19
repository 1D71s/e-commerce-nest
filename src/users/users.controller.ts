import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from 'src/guards/auth.service.guard';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
  
  @Post('/create')
  @UseGuards(AuthGuard)
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto)
  }

  @Post('/getuser')
  async getUserByEmail(@Body('email') email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (user) return user;
    
    else return { message: 'Пользователь не найден' };
  }
}
