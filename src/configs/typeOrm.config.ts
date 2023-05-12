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
  logging: false,
  synchronize: false,
  migrationsRun: true,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  subscribers: ['src/database/db/subscriber/**/*{.ts,.js}'],
});
