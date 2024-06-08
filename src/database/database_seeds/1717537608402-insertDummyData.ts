import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDummyData1717537608402 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO pessoa (id, nome, cpf, telefone, data_nascimento, foto, genero)
      VALUES ('3b6253c0-af44-4769-a0ea-2da3280d5136', 'A. Furlan', '12345678911', '12345678911111', '1990-08-12', 'https://avatars.githubusercontent.com/u/4544070?v=4', 'M'); 

      INSERT INTO animal (id, nome, raca, adotado, foto, genero, tipo)
      VALUES ('c40c0380-d277-4e8d-ba44-09708a016486', 'Teddy', 'Vira-Lata', false, 'https://www.adoropets.com.br/wp-content/uploads/2019/12/vira-lata-cabeca-1200x800.jpg', 'M', 'C'); 

      INSERT INTO doacao (id, descricao, pessoa_id, animal_id, rua, bairro, cidade)
      VALUES ('9fbdfa5a-1a02-428a-b58a-983c0974a5a0', 'Oi :)', '3b6253c0-af44-4769-a0ea-2da3280d5136', 'c40c0380-d277-4e8d-ba44-09708a016486', 'Rua A.', 'Bairro B.', 'Cidade Z.'); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM doacao WHERE id = '9fbdfa5a-1a02-428a-b58a-983c0974a5a0';
      DELETE FROM animal WHERE id = 'c40c0380-d277-4e8d-ba44-09708a016486';
      DELETE FROM pessoa WHERE id = '3b6253c0-af44-4769-a0ea-2da3280d5136';
    `);
  }

}

