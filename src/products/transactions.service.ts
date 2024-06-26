import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Transaction,
  ETransactionType,
} from '../common/entities/transactions.entity';
import { EntityRepository } from '@mikro-orm/core';
import { ProductsService } from './products.service';

@Injectable()
export class TransactionsService {
  private readonly em;
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: EntityRepository<Transaction>,
    private productService: ProductsService,
  ) {
    this.em = this.transactionRepository.getEntityManager();
  }
  async getTransactionHistory(productId: string) {
    return await this.transactionRepository.find({
      product: {
        id: productId,
      },
    });
  }
  async buyProduct(productId: string, userId: string) {
    await this._checkValidaity(productId);
    const ownerId = await this._getProductOwner(productId);

    if (ownerId === userId)
      throw new UnauthorizedException('You already are the owner');

    const transaction = this.transactionRepository.create({
      originalOwner: ownerId,
      newHolder: userId,
      product: productId,
      type: ETransactionType.SELL,
    });

    await this.em.persistAndFlush(transaction);

    return transaction;
  }
  // productid, userid, startdate, enddate
  async rentProduct(
    productId: string,
    userId: string,
    startDate: Date,
    endDate: Date,
  ) {
    if (endDate < startDate)
      throw new BadRequestException('Invalid Rent Duration');

    const product = await this.productService.previewProduct(productId);
    if (!product) throw new NotFoundException('Product not found');

    // await _checkValidaity(productId, startDate, endDate);
    const transaction = this.transactionRepository.create({
      originalOwner: product.owner.id,
      newHolder: userId,
      product: productId,
      type: ETransactionType.RENT,
      rentStartDate: startDate,
      rentEndDate: endDate,
    });

    await this.em.persistAndFlush(transaction);

    return transaction;
  }

  private async _checkValidaity(productId: string) {
    if (await this.checkIfSold(productId))
      throw new UnauthorizedException('Product is already sold');
  }

  private async _getProductOwner(productId: string) {
    const product = await this.productService.previewProduct(productId);
    if (!product) throw new NotFoundException('Product not found');
    return product.owner.id;
  }

  async checkIfSold(productId: string) {
    return this.transactionRepository.findOne({
      product: {
        id: productId,
      },
      type: ETransactionType.SELL,
    });
  }
}
