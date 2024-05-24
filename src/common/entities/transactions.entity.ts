import {
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './users.entity';
import { v4 } from 'uuid';
import { Product } from './products.entity';

export enum TransactionType {
  RENT = 'rent',
  SELL = 'sell',
}

@Entity()
export class Transaction {
  @PrimaryKey()
  id: string = v4();

  @Enum({ items: () => TransactionType, array: true })
  type: TransactionType[];

  @Property()
  transactionDate = new Date();

  @Index()
  @ManyToOne({ entity: () => Product })
  product!: Product;

  @Index()
  @ManyToOne({ entity: () => User })
  originalOwner!: User;

  @Index()
  @ManyToOne({ entity: () => User })
  newHolder!: User;

  @Property({ nullable: true })
  rentStartDate?: Date;

  @Property({ nullable: true })
  rentEndDate?: Date;
}
