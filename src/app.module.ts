import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConnectionConfigs } from './configs/typeorm.config';
import { UsersModule } from './api/v1/users/users.module';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './api/v1/categories/categories.module';
import { StatesModule } from './api/v1/states/states.module';
import { BrandsModule } from './api/v1/brands/brands.module';
import { ModelsModule } from './api/v1/models/models.module';
import { PresentationsModule } from './api/v1/presentations/presentations.module';
import { ProductsModule } from './api/v1/products/products.module';
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
    StatesModule,
    BrandsModule,
    ModelsModule,
    PresentationsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
