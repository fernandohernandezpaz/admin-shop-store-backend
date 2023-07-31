import { IsInt } from 'class-validator';
import { CatalogAbstractDto } from '../../catalog.abstract.dto';

export class CreatePresentationDto extends CatalogAbstractDto {
  @IsInt()
  categoryId: number;
}
