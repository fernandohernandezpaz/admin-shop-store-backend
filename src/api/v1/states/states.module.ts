import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { State } from '../../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [StatesController],
  providers: [StatesService],
})
export class StatesModule {}
