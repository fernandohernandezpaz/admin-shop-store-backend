import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from '../../../dtos/brands/dto/create-brand.dto';
import { UpdateBrandDto } from '../../../dtos/brands/dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../../../entities/brand.entity';
import { Repository } from 'typeorm';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class BrandsService {
  private readonly errorHandler: ErrorHandler = new ErrorHandler();

  public constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const brand: Brand = this.brandRepository.create(createBrandDto);
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return this.brandRepository.find({
      take,
      skip,
    });
  }

  async findOne(id: number): Promise<Brand> {
    const brand: Brand = await this.brandRepository.findOneBy({ id });

    if (!brand) throw new NotFoundException('Brand not found');

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand: Brand = await this.brandRepository.preload({
      id,
      ...updateBrandDto,
    });
    if (!brand) throw new NotFoundException('Brand not found');

    await this.brandRepository.save(brand);

    return brand;
  }

  async remove(id: number): Promise<string> {
    const brand: Brand = await this.findOne(id);
    await this.brandRepository.remove(brand);
    return `This brand was delete`;
  }
}
