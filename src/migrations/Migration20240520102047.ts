import { Migration } from '@mikro-orm/migrations';

export class Migration20240520102047 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "transaction" ("id" varchar(255) not null, "type" text[] not null, "transaction_date" timestamptz not null, "product_id" varchar(255) not null, "original_owner_id" varchar(255) not null, "new_holder_id" varchar(255) not null, "rent_start_date" timestamptz null, "rent_end_date" timestamptz null, constraint "transaction_pkey" primary key ("id"));');
    this.addSql('create index "transaction_product_id_index" on "transaction" ("product_id");');
    this.addSql('create index "transaction_original_owner_id_index" on "transaction" ("original_owner_id");');
    this.addSql('create index "transaction_new_holder_id_index" on "transaction" ("new_holder_id");');

    this.addSql('alter table "transaction" add constraint "transaction_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "transaction" add constraint "transaction_original_owner_id_foreign" foreign key ("original_owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "transaction" add constraint "transaction_new_holder_id_foreign" foreign key ("new_holder_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transaction" cascade;');
  }

}
