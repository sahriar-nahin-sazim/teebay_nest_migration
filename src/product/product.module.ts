import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/common/entities/user.entity';
import { Product } from 'src/common/entities/product.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, User])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
