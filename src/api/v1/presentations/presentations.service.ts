import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresentationDto } from '../../../dtos/presentations/dto/create-presentation.dto';
import { UpdatePresentationDto } from '../../../dtos/presentations/dto/update-presentation.dto';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';
import { InjectRepository } from '@nestjs/typeorm';
import { Presentation } from '../../../entities';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class PresentationsService {
  private readonly errorHandler: ErrorHandler = new ErrorHandler();

  public constructor(
    @InjectRepository(Presentation)
    private readonly presentationRepository: Repository<Presentation>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    createPresentationDto: CreatePresentationDto,
  ): Promise<Presentation> {
    try {
      const presentation: Presentation = this.presentationRepository.create(
        createPresentationDto,
      );
      presentation.category = await this.categoriesService.findOne(
        createPresentationDto.categoryId,
      );
      await this.presentationRepository.save(presentation);
      return presentation;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  findAll(paginationDto: PaginationDto): Promise<Presentation[]> {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return this.presentationRepository.find({
      take,
      skip,
      relations: ['category'],
      select: {
        category: {
          id: true,
          name: true,
          active: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Presentation> {
    const presentation: Presentation =
      await this.presentationRepository.findOne({
        where: { id },
        relations: ['category'],
        select: {
          category: {
            id: true,
            name: true,
            active: true,
          },
        },
      });

    if (!presentation) throw new NotFoundException('Presentation not found');

    return presentation;
  }

  async update(
    id: number,
    updatePresentationDto: UpdatePresentationDto,
  ): Promise<Presentation> {
    const presentation: Presentation =
      await this.presentationRepository.preload({
        id,
        ...updatePresentationDto,
      });
    if (updatePresentationDto.categoryId) {
      presentation.category = await this.categoriesService.findOne(
        updatePresentationDto.categoryId,
      );
    }

    await this.presentationRepository.save(presentation);

    return presentation;
  }

  async remove(id: number): Promise<string> {
    const presentation: Presentation = await this.findOne(id);
    await this.presentationRepository.remove(presentation);
    return `This action removes a #${id} presentation`;
  }
}
