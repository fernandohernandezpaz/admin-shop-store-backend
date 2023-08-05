import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ErrorHandler {
  public managementDbError(error: any): void {
    const { code, detail } = error;
    console.log(error);
    if (code === '23505') throw new BadRequestException(detail);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
