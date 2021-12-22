import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddUsedQuantityToPromotions1608114652339
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'promotions',
      new TableColumn({
        name: 'used_quantity',
        type: 'integer',
        default: 0,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('promotions', 'used_quantity')
  }
}
