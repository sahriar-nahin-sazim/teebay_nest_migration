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

export enum Category {
  ELECTRONICS,
  FURNITURE,
  HOME_APPLIANCES,
  SPORTING_GOODS,
  OUTDOOR,
  TOYS,
}

export enum RentDuration {
  DAY,
  WEEK,
  BIWEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR,
}

@Entity()
export class Product {
  @PrimaryKey()
  id: string = v4();

  @Property({})
  title!: string;

  @Property()
  description!: string;

  @Enum({ items: () => Category, array: true })
  category: Category[];

  @Property()
  createdAt = new Date();

  @Property()
  price!: number;

  @Property()
  rentPrice!: number;

  @Enum(() => RentDuration)
  rentDuration!: RentDuration;

  @Property()
  view = 0;

  @Index()
  @ManyToOne({ entity: () => User, hidden: true })
  owner!: User;
}
