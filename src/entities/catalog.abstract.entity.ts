import {
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { Slugifier } from '../common/utils/Slugifier';
export abstract class Catalog {
  @Exclude()
  protected readonly slugify: Slugifier = new Slugifier();

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 30,
  })
  name: string;

  @Column({
    unique: true,
    length: 30,
  })
  slug: string;

  @Column({ type: 'boolean' })
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
