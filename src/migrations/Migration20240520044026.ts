import { Migration } from '@mikro-orm/migrations';

export class Migration20240520044026 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));');
    this.addSql('alter table "user" alter column "last_name" drop not null;');
    this.addSql('alter table "user" alter column "address" drop default;');
    this.addSql('alter table "user" alter column "address" type varchar(255) using ("address"::varchar(255));');
    this.addSql('alter table "user" alter column "address" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));');
    this.addSql('alter table "user" alter column "last_name" set not null;');
    this.addSql('alter table "user" alter column "address" type text using ("address"::text);');
    this.addSql('alter table "user" alter column "address" set default \'\';');
    this.addSql('alter table "user" alter column "address" set not null;');
  }

}
