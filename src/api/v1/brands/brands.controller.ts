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
import {BrandsService} from './brands.service';
import {CreateBrandDto} from '../../../dtos/brands/dto/create-brand.dto';
import {UpdateBrandDto} from '../../../dtos/brands/dto/update-brand.dto';
import {Brand} from '../../../entities/brand.entity';
import {PaginationDto} from '../../../common/dtos/pagination.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {
  }

  @Post()
  create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<Brand[]> {
    return this.brandsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto): Promise<Brand> {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.brandsService.remove(id);
  }
}
