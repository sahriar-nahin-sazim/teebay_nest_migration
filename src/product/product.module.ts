import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './entity/product.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, User])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
