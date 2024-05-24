import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../common/entities/users.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly em;
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    this.em = this.userRepository.getEntityManager();
  }
  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      email: dto.email,
    });

    if (!user || !this._matchPassword(user.password, dto.password))
      throw new BadRequestException('Invalid email or password');

    return this._signToken(user.id, user.email);
  }

  async register(dto: RegisterDto) {
    try {
      const hashedPassword = await this._hashPassword(dto.password);
      const user = await this.userRepository.create({
        ...dto,
        password: hashedPassword,
      });
      await this.em.persistAndFlush(user);
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid Input');
    }
  }

  async getAllUser() {
    return this.userRepository.findAll();
  }

  private async _hashPassword(password: string) {
    return argon.hash(password);
  }

  private async _matchPassword(password: string, savedPassword: string) {
    return argon.verify(password, savedPassword);
  }

  private async _signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRY'),
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      token,
      user: userId,
    };
  }
}
