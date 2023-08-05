import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { query } from 'express';

export class CreateProductsTable1690836452374 implements MigrationInterface {
  private readonly tableName = 'products';
  private readonly tablePresentationName = 'presentations';
  private readonly tableModelName = 'models';

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
            name: 'presentationId',
            type: 'int',
          },
          {
            name: 'modelId',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            length: '255',
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'FK_products_presentation_id',
        columnNames: ['presentationId'],
        referencedTableName: this.tablePresentationName,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'FK_products_models_id',
        columnNames: ['modelId'],
        referencedTableName: this.tableModelName,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      `FK_products_presentation_id`,
    );
    await queryRunner.dropForeignKey(this.tableName, `FK_products_models_id`);
    await queryRunner.dropTable(this.tableName);
  }
}
