import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from '../decorators/user.decorator';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllUser(@GetUser('userId') userId: any) {
    console.log(userId);
    return this.userService.getAllUser();
  }
}
