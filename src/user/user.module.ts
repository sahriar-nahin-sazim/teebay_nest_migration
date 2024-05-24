import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../common/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
