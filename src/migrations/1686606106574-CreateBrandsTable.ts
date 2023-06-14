import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBrandsTable1686606106574 implements MigrationInterface {
  protected readonly tableName = 'brands';

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
            length: '30',
            isUnique: true,
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({ name: this.tableName }));
  }
}
