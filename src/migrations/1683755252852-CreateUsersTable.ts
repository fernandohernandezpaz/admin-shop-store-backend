import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1683755252852 implements MigrationInterface {
  readonly tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            length: '30',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '30',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table({ name: this.tableName }));
  }
}
