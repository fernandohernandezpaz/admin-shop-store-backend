import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from '../../../dtos/models/dto/create-model.dto';
import { UpdateModelDto } from '../../../dtos/models/dto/update-model.dto';
import { Model } from '../../../entities';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  create(@Body() createModelDto: CreateModelDto): Promise<Model> {
    return this.modelsService.create(createModelDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<Model[]> {
    return this.modelsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Model> {
    return this.modelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateModelDto: UpdateModelDto,
  ): Promise<Model> {
    return this.modelsService.update(id, updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.modelsService.remove(id);
  }
}
