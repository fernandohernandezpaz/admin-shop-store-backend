import { Entity } from 'typeorm';
import { Catalog } from './catalog.abstract.entity';

@Entity('brands')
export class Brand extends Catalog {}
