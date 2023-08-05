import { Exclude, classToPlain } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Column,
  ManyToOne,
  BeforeUpdate,
} from 'typeorm';
import { Slugifier } from '../common/utils/Slugifier';
import { Presentation } from './presentation.entity';
import { Model } from './model.entity';

@Entity('products')
export class Product {
  @Exclude()
  protected readonly slugify: Slugifier = new Slugifier();

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean = true;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  updatedAt: string;

  @ManyToOne(
    () => Presentation,
    (presentation: Presentation) => presentation.product,
    {
      cascade: true,
    },
  )
  presentation: Presentation;

  @ManyToOne(() => Model, (model: Model) => model.product, {
    cascade: true,
  })
  model: Model;

  @BeforeInsert()
  @BeforeUpdate()
  async slugifyName(): Promise<void> {
    this.slug = this.slugify.slug(this.name);
  }

  toJSON() {
    return classToPlain(this);
  }
}
