import { Migration } from '@mikro-orm/migrations';

export class Migration20240520070230 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "category" text[] not null, "created_at" timestamptz not null, "price" int not null, "rent_price" int not null, "rent_duration" smallint not null, "view" int not null default 0, constraint "product_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;');
  }

}
