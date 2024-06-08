import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPessoa1717537608499 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pessoa" ALTER COLUMN "telefone" TYPE VARCHAR(16);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pessoa" ALTER COLUMN "telefone" TYPE VARCHAR(14);
    `);
  }

}

