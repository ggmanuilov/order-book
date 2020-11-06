import { MigrationInterface, QueryRunner } from 'typeorm';

export class askBidTables1604584043389 implements MigrationInterface {
  name = 'askBidTables1604584043389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
create table ask
(
    id     bigserial      not null constraint ask_pk primary key,
    price  integer        not null,
    volume integer        not null
)`);
    await queryRunner.query(`alter table ask owner to order_book; `);
    await queryRunner.query(`create index ask_price_index on ask (price); `);

    await queryRunner.query(`
create table bid
(
    id     bigserial      not null constraint bid_pk primary key,
    price  integer        not null,
    volume integer        not null
)`);
    await queryRunner.query(`alter table bid owner to order_book; `);
    await queryRunner.query(`create index bid_price_index on bid (price); `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table ask;`);
    await queryRunner.query(`drop table bid;`);
  }
}
