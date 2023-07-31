import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { CreatePresentationDto } from '../../../dtos/presentations/dto/create-presentation.dto';
import { UpdatePresentationDto } from '../../../dtos/presentations/dto/update-presentation.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Presentation } from '../../../entities';

@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationsService: PresentationsService) {}

  @Post()
  create(@Body() createPresentationDto: CreatePresentationDto) {
    return this.presentationsService.create(createPresentationDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<Presentation[]> {
    return this.presentationsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.presentationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePresentationDto: UpdatePresentationDto,
  ): Promise<Presentation> {
    return this.presentationsService.update(id, updatePresentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.presentationsService.remove(id);
  }
}
