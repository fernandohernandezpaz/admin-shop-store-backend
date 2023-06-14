import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateCategoryDto } from '../../../dtos/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/categories/dto/update-category.dto';
import { Category } from '../../../entities';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';

@Injectable()
export class CategoriesService {
  private readonly errorHandler: ErrorHandler = new ErrorHandler();

  public constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category: Category =
        this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  findAll(paginationDto: PaginationDto): Promise<Category[]> {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return this.categoryRepository.find({
      take,
      skip,
    });
  }

  async findOne(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOneBy({ id });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category: Category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) throw new NotFoundException('Category not found');

    await this.categoryRepository.save(category);

    return category;
  }

  async remove(id: number): Promise<string> {
    const category: Category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return `The category was deleted`;
  }
}
