import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatesTable1685637210586 implements MigrationInterface {
  readonly tableName = 'states';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            length: '30',
          },
          {
            name: 'slug',
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
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table({ name: this.tableName }));
  }
}
