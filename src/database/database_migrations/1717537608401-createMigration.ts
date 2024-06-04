import { MigrationInterface, QueryRunner } from "typeorm";

export class  CreateMigration1717537608401 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."pessoa_genero_enum" AS ENUM('M', 'F', 'I');
      CREATE TYPE "public"."animal_genero_enum" AS ENUM('M', 'F');
      CREATE TYPE "public"."animal_tipo_enum" AS ENUM('C', 'G');

      CREATE TABLE "pessoa"(
        "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        "nome" varchar(255) NOT NULL,
        "cpf" varchar(11) NOT NULL,
        "telefone" varchar(14) NOT NULL,
        "data_nascimento" date,
        "foto" text,
        "genero" "public"."pessoa_genero_enum" DEFAULT 'I'
      );

      CREATE TABLE "animal"(
        "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        "nome" varchar(255) NOT NULL,
        "raca" varchar(255) NOT NULL,
        "adotado" boolean DEFAULT false,
        "foto" text NOT NULL,
        "genero" "public"."animal_genero_enum" DEFAULT 'M',
        "tipo" "public"."animal_tipo_enum" DEFAULT 'C'
      );

      CREATE TABLE "doacao"(
        "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        "descricao" text,
        "pessoa_id" uuid NOT NULL,
        "animal_id" uuid NOT NULL,
        "rua" varchar(255) NOT NULL,
        "bairro" varchar(255) NOT NULL,
        "cidade" varchar(255) NOT NULL,
        "data_cadastro" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
,
        CONSTRAINT "fk_pessoa_id" FOREIGN KEY (pessoa_id) REFERENCES "pessoa"(id),
        CONSTRAINT "fk_animal_id" FOREIGN KEY (animal_id) REFERENCES "animal"(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "doacao";
      DROP TABLE "animal";
      DROP TABLE "pessoa";
      DROP TYPE "public"."animal_tipo_enum";
      DROP TYPE "public"."animal_genero_enum";
      DROP TYPE "public"."pessoa_genero_enum";
    `);
  }

}

