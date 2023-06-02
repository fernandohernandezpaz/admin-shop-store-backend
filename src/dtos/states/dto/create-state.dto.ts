import { IsString, MinLength } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @MinLength(3)
  name: string;
}
