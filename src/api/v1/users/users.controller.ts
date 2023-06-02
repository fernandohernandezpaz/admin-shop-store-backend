import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../../dtos/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../dtos/users/dto/update-user.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Users } from '../../../entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<Users[]> {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.usersService.remove(id);
  }
}
