import { IsInt } from 'class-validator';
import { CatalogAbstractDto } from '../../catalog.abstract.dto';

export class CreateModelDto extends CatalogAbstractDto {
  @IsInt()
  brandId: number;
}
