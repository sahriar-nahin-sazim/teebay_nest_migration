import { Migration } from '@mikro-orm/migrations';

export class Migration20240520034536 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "address" text not null default \'\', "phone" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_email_index" on "user" ("email");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
