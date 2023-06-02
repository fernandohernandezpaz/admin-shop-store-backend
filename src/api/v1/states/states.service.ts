import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from '../../../dtos/states/dto/create-state.dto';
import { UpdateStateDto } from '../../../dtos/states/dto/update-state.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { State } from '../../../entities';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';

@Injectable()
export class StatesService {
  private readonly errorHandler: ErrorHandler = new ErrorHandler();
  public constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto) {
    try {
      const state: State = await this.stateRepository.create(createStateDto);
      await this.stateRepository.save(state);
      return state;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  findAll(paginationDto: PaginationDto): Promise<State[]> {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return this.stateRepository.find({
      take,
      skip,
    });
  }

  async findOne(id: number): Promise<State> {
    const state: State = await this.stateRepository.findOneBy({ id });

    if (!state) throw new NotFoundException('State not found');

    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    const state: State = await this.stateRepository.preload({
      id,
      ...updateStateDto,
    });
    if (!state) throw new NotFoundException('State Not Found');

    await this.stateRepository.save(state);

    return state;
  }

  async remove(id: number): Promise<string> {
    const state: State = await this.findOne(id);
    await this.stateRepository.remove(state);
    return `This state was delete`;
  }
}
