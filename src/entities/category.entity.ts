import { Entity, OneToMany } from 'typeorm';
import { Catalog } from './catalog.abstract.entity';
import { Presentation } from './presentation.entity';

@Entity('categories')
export class Category extends Catalog {
  @OneToMany(
    () => Presentation,
    (presentation: Presentation) => presentation.category,
    { cascade: true },
  )
  presentations: Presentation[];
}
