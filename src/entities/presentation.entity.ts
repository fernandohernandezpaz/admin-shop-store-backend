import { Catalog } from './catalog.abstract.entity';
import { Entity, ManyToOne, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity('presentations')
export class Presentation extends Catalog {
  @ManyToOne(() => Category, (category: Category) => category.presentations)
  category: Category;

  @OneToMany(() => Product, (product: Product) => product.presentation)
  @JoinColumn()
  product: Product[];
}
