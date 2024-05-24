import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/common/entities/users.entity';
import { Product } from 'src/common/entities/products.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, User])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
