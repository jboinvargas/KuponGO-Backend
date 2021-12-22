import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddAvatarFieldToPromotions1607937174861
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'promotions',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('promotions', 'avatar')
  }
}
