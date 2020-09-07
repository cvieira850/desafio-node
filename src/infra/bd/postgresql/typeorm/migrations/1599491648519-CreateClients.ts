import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClients1599491648519 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'lastname',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'genre',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'birthdate',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'age',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true

          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients')
  }
}
