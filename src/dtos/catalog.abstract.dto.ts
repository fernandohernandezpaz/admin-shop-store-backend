import { IsString, MinLength } from 'class-validator';

export abstract class CatalogAbstractDto {
  @IsString()
  @MinLength(3)
  name: string;
}
