import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../../../dtos/products/dto/create-product.dto';
import { UpdateProductDto } from '../../../dtos/products/dto/update-product.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresentationsService } from '../presentations/presentations.service';
import { ModelsService } from '../models/models.service';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';
import { Model, Presentation, Product } from '../../../entities';

@Injectable()
export class ProductsService {
  private readonly errorHandler: ErrorHandler = new ErrorHandler();
  public constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly presentationService: PresentationsService,
    private readonly modelService: ModelsService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const presentation: Presentation = await this.presentationService.findOne(
        createProductDto.presentationId,
      );
      const model: Model = await this.modelService.findOne(
        createProductDto.modelId,
      );

      const product: Product = this.productRepository.create({
        ...createProductDto,
        presentation,
        model,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return this.productRepository.find({
      take,
      skip,
    });
  }

  async findOne(id: string): Promise<Product> {
    const product: Product = await this.productRepository.findOne({
      where: { id },
      relations: ['model', 'presentation'],
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product: Product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) throw new NotFoundException('Product not found');
    try {
      if (updateProductDto.modelId) {
        product.model = await this.modelService.findOne(
          updateProductDto.modelId,
        );
      }
      if (updateProductDto.presentationId) {
        product.presentation = await this.presentationService.findOne(
          updateProductDto.presentationId,
        );
      }
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  async remove(id: string): Promise<string> {
    const product: Product = await this.findOne(id);
    await this.productRepository.remove(product);
    return `This action removes a #${id} product`;
  }
}
