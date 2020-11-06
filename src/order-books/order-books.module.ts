import { Module } from '@nestjs/common';
import { OrderBooksController } from './order-books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AskEntity } from './entity/ask.entity';
import { BidEntity } from './entity/bid.entity';
import { OrderBooksService } from "./order-books.service";

@Module({
  imports: [TypeOrmModule.forFeature([AskEntity, BidEntity])],
  controllers: [OrderBooksController],
  providers: [OrderBooksService],
  exports: [OrderBooksService],
})
export class OrderBooksModule {}
