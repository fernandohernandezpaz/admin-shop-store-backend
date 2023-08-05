import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsInt()
  presentationId: number;

  @IsInt()
  modelId: number;
}
