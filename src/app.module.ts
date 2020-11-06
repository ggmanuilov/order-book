import { Module } from '@nestjs/common';
import { OrderBooksModule } from './order-books/order-books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "./database/database.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    OrderBooksModule,
  ],
})
export class AppModule {}
