import { Catalog } from './catalog.abstract.entity';
import { Entity, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Brand } from './brand.entity';
import { Product } from './product.entity';

@Entity('models')
export class Model extends Catalog {
  @ManyToOne(() => Brand, (brand: Brand) => brand.models)
  @JoinTable()
  brand: Brand;

  @OneToMany(() => Product, (product: Product) => product.model)
  product: Product[];
}
