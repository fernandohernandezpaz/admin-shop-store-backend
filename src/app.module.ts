import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConnectionConfigs } from '@config/typeOrm.config';
import AppConfigs from '@config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfigs],
    }),
    TypeOrmModule.forRootAsync(DBConnectionConfigs),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
