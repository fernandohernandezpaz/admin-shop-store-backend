import { Entity } from 'typeorm';
import { Catalog } from './catalog.abstract.entity';

@Entity('states')
export class State extends Catalog {}
