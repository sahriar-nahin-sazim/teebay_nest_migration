import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../common/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
