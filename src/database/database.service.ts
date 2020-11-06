import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  inject: [];
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      autoLoadEntities: true,
      database: DB_DATABASE,
      entities: [__dirname + '/../**/*.entity.ts'],
      host: DB_HOST,
      logging: true,
      migrations: ['src/database/migration/*.ts'],
      name: 'default',
      password: DB_PASSWORD,
      port: Number(DB_PORT),
      subscribers: ['src/**.module/*-subscriber.ts'],
      synchronize: false,
      type: 'postgres',
      username: DB_USERNAME,
      cli: {
        migrationsDir: 'src/database/migration',
      },
    };
  }
}
