import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../../dtos/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../dtos/users/dto/update-user.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../../entities';
import { ErrorHandler } from '../../../common/handler/ErrorHandler';

@Injectable()
export class UsersService {
  private readonly errorHandler: ErrorHandler = new ErrorHandler();
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const user: Users = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandler.managementDbError(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Users[]> {
    const { limit: take = 10, offset: skip = 0 } = paginationDto;
    return await this.usersRepository.find({
      take,
      skip,
    });
  }

  async findOne(id: string): Promise<Users> {
    const user: Users = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const user: Users = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.save(user);

    return user;
  }

  async remove(id: string): Promise<string> {
    const user: Users = await this.findOne(id);
    await this.usersRepository.remove(user);
    return `The user was deleted`;
  }
}
