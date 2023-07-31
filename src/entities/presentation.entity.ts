import { Catalog } from './catalog.abstract.entity';
import { Entity, ManyToOne, JoinTable } from 'typeorm';
import { Category } from './category.entity';

@Entity('presentations')
export class Presentation extends Catalog {
  @ManyToOne(() => Category, (category: Category) => category.presentations)
  @JoinTable()
  category: Category;
}
