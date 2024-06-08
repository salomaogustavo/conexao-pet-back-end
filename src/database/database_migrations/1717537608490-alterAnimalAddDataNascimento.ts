import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAnimalAddDataNascimento1717537608490 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "animal" ADD COLUMN "data_nascimento" DATE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "animal" DROP COLUMN "data_nascimento";
    `);
  }

}

