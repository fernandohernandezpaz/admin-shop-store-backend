import { Module } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { PresentationsController } from './presentations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from '../../../entities';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Presentation]), CategoriesModule],
  controllers: [PresentationsController],
  providers: [PresentationsService],
})
export class PresentationsModule {}
