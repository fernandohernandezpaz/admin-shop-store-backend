import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Slugifier } from '../common/utils/Slugifier';
import { Exclude, classToPlain } from 'class-transformer';

@Entity('categories')
export class Category {
  @Exclude()
  protected readonly slugify: Slugifier = new Slugifier();

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 30,
  })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({
    type: 'boolean',
  })
  active = true;

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

  @BeforeInsert()
  @BeforeUpdate()
  async slugifyName(): Promise<void> {
    this.slug = this.slugify.slug(this.name);
  }

  toJSON() {
    return classToPlain(this);
  }
}
