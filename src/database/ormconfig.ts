import { ConnectionOptions } from 'typeorm';

const entities: string[] = process.env.NODE_ENV === 'development' ? ["./dist/**/*.entity{.js,.ts}"] : ["./**/*.entity.js"];

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: Boolean(process.env.ORM_LOGGING),
  entities: entities,
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

export = typeOrmConfig;
