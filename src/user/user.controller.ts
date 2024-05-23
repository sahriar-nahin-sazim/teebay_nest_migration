import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from './decorator/user.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

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
