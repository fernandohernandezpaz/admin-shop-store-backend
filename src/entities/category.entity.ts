import { Entity } from 'typeorm';
import { Catalog } from './catalog.abstract.entity';

@Entity('categories')
export class Category extends Catalog {}
