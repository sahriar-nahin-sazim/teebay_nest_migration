import { Migration } from '@mikro-orm/migrations';

export class Migration20240520070609 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "owner_id" varchar(255) not null;');
    this.addSql('alter table "product" add constraint "product_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('create index "product_owner_id_index" on "product" ("owner_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_owner_id_foreign";');

    this.addSql('drop index "product_owner_id_index";');
    this.addSql('alter table "product" drop column "owner_id";');
  }

}
