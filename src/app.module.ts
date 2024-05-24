import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductsModule } from './products/products.module';
import config from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MikroOrmModule.forRoot(config),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
