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
import { StatesService } from './states.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateStateDto } from '../../../dtos/states/dto/create-state.dto';
import { UpdateStateDto } from '../../../dtos/states/dto/update-state.dto';
import { State } from '../../../entities';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<State[]> {
    return this.statesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<State> {
    return this.statesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<State> {
    return this.statesService.update(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.statesService.remove(+id);
  }
}
