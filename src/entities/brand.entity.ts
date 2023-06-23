import { Entity, OneToMany } from 'typeorm';
import { Catalog } from './catalog.abstract.entity';
import { Model } from './model.entity';

@Entity('brands')
export class Brand extends Catalog {
  @OneToMany(() => Model, (model: Model) => model.brand)
  models: Model[];
}
