import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { GetUser } from 'src/user/decorator/user.decorator';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(
    @GetUser('userId') userId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.createProduct(userId, dto);
  }

  @Get()
  viewAllProducts() {
    return this.productService.viewAllProducts();
  }

  @Get('all')
  viewAllByUser(@GetUser('userId') userId: string) {
    return this.productService.getAllProductByUser(userId);
  }

  @Patch(':id')
  updateProduct(
    @GetUser('userId') userId: string,
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(userId, productId, dto);
  }

  @Get(':id')
  viewProduct(@Param('id') productId: string) {
    return this.productService.viewProduct(productId);
  }

  @Delete(':id')
  deleteProduct(
    @GetUser('userId') userId: string,
    @Param('id') productId: string,
  ) {
    return this.productService.deleteProduct(userId, productId);
  }
}