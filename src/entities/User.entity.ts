import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: 'date',
    default: () => 'NOW()',
  })
  createdAt: string;

  @Column({
    type: 'date',
    default: () => 'NOW()',
  })
  updatedAt: string;
}
