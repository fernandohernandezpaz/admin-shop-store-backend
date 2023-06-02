import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ErrorHandler {
  public managementDbError(error: any): void {
    console.log(typeof error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(
      'Unexcepted error, check server logs',
    );
  }
}
