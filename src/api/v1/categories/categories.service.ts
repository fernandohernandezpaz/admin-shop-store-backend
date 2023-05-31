import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../../../entities';
@Injectable()
export class CategoriesService {
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
      this.managmentDbError(error);
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
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

  private managmentDbError(error: any): void {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexcepted error, chack server logs',
    );
  }
}
