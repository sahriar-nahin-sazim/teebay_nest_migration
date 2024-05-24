import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Product } from 'src/common/entities/products.entity';

@Injectable()
export class ProductsService {
  private readonly em;
  constructor(
    @InjectRepository(Product)
    private productRepository: EntityRepository<Product>,
  ) {
    this.em = this.productRepository.getEntityManager();
  }

  async createProduct(userId: string, dto: CreateProductDto) {
    const product = await this.productRepository.create({
      ...dto,
      owner: userId,
    });
    await this.em.persistAndFlush(product);
    return product;
  }

  async updateProduct(
    userId: string,
    productid: string,
    dto: UpdateProductDto,
  ) {
    const product = await this.previewProduct(productid);
    this.checkAuthorization(product, userId);
    Object.assign(product, dto, { merge: true });
    await this.em.persistAndFlush(product);
    return product;
  }

  async deleteProduct(userId: string, productid: string) {
    const product = await this.previewProduct(productid);
    this.checkAuthorization(product, userId);
    this.em.remove(product).flush();
  }

  async viewProduct(productId: string) {
    const product = await this.previewProduct(productId);
    product.view += 1;
    await this.em.persistAndFlush(product);
    return product;
  }
  // productid
  async previewProduct(productId: string) {
    const product = await this.productRepository.findOne(productId);
    if (!product) throw new NotFoundException('Post does not exist');
    return product;
  }

  async viewAllProducts() {
    return this.productRepository.findAll();
  }
  //userid
  async getAllProductByUser(userId: string) {
    return this.productRepository.find({
      owner: {
        id: userId,
      },
    });
  }

  private async checkAuthorization(product: Product, userId: string) {
    if (product.owner.id !== userId)
      throw new UnauthorizedException(
        'You are not authorized for this Operation',
      );
  }
}
