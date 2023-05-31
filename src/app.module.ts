import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConnectionConfigs } from './configs/typeorm.config';
import { UsersModule } from './api/v1/users/users.module';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './api/v1/categories/categories.module';
import * as entities from './entities/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DBConnectionConfigs.options,
      entities: entities,
    }),
    UsersModule,
    CommonModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
