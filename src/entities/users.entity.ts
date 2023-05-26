import { Encrypter } from '@common/Encripter/Encripter';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';

@Entity()
export class Users {
  @Exclude()
  private readonly encrypter: Encrypter = new Encrypter();

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean = true;

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

  @BeforeInsert()
  async encryptPassword(): Promise<void> {
    this.password = await this.encrypter.encryptPassword(this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
