import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '@common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@entities/users.entity';
import { of } from 'rxjs';

@Injectable()
export class UsersService {
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
      this.managmentDbError(error);
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: Users = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.save(user);

    return user;
  }

  async remove(id: string) {
    const user: Users = await this.findOne(id);
    await this.usersRepository.remove(user);
    return `The user was deleted`;
  }

  private managmentDbError(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexcepted error, chack server logs',
    );
  }
}
