import { Catalog } from './catalog.abstract.entity';
import { Entity, ManyToOne, JoinTable } from 'typeorm';
import { Brand } from './brand.entity';

@Entity('models')
export class Model extends Catalog {
  @ManyToOne(() => Brand, (brand: Brand) => brand.models)
  @JoinTable()
  brand: Brand;
}
