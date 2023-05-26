import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const DBConnectionConfigs: DataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: process.env.ENV === 'development',
  synchronize: false,
  migrationsRun: true,
  entities: [`${__dirname}/../entities/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/**{.ts,.js}`],
});
