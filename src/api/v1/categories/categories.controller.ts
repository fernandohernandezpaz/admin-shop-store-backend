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
import { CategoriesService } from './categories.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateCategoryDto } from '../../../dtos/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/categories/dto/update-category.dto';
import { Category } from '../../../entities';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<Category[]> {
    return this.categoriesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(+id);
  }
}
