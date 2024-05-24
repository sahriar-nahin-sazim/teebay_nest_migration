import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4();

  @Property()
  firstName!: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ unique: true })
  @Index()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ nullable: true })
  address!: string;

  @Property()
  phone!: string;
}
