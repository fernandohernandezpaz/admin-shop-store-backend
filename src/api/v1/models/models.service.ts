import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from '../../../dtos/models/dto/create-model.dto';
import { UpdateModelDto } from '../../../dtos/models/dto/update-model.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '../../../entities';
import { Repository } from 'typeorm';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ModelsService {
  private readonly errorHandler = new ErrorHandler();
  public constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    private readonly brandService: BrandsService,
  ) {}
  async create(createModelDto: CreateModelDto): Promise<Model> {
    try {
      const model: Model = await this.modelRepository.create(createModelDto);
      model.brand = await this.brandService.findOne(createModelDto.brandId);
      await this.modelRepository.save(model);
      return model;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return this.modelRepository.find({
      take,
      skip,
      order: {
        id: 'ASC',
      },
      relations: ['brand'],
      select: {
        brand: {
          id: true,
          name: true,
          active: false,
        },
      },
    });
  }

  async findOne(id: number): Promise<Model> {
    const model: Model = await this.modelRepository.findOne({
      where: { id },
      relations: ['brand'],
      select: {
        brand: {
          id: true,
          name: true,
          active: false,
        },
      },
    });
    if (!model) throw new NotFoundException('Model not found');
    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto): Promise<Model> {
    const model: Model = await this.modelRepository.preload({
      id,
      ...updateModelDto,
    });
    if (updateModelDto.brandId) {
      model.brand = await this.brandService.findOne(updateModelDto.brandId);
    }
    await this.modelRepository.save(model);

    return model;
  }

  async remove(id: number): Promise<string> {
    const model: Model = await this.findOne(id);
    await this.modelRepository.remove(model);
    return `This action removes a #${id} model`;
  }
}
