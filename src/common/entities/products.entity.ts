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

export enum ECategory {
  ELECTRONICS,
  FURNITURE,
  HOME_APPLIANCES,
  SPORTING_GOODS,
  OUTDOOR,
  TOYS,
}

export enum ERentDuration {
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

  @Enum({ items: () => ECategory, array: true })
  category: ECategory[];

  @Property()
  createdAt = new Date();

  @Property()
  price!: number;

  @Property()
  rentPrice!: number;

  @Enum(() => ERentDuration)
  rentDuration!: ERentDuration;

  @Property()
  view = 0;

  @Index()
  @ManyToOne({ entity: () => User, hidden: true })
  owner!: User;
}
