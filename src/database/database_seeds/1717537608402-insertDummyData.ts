import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDummyData1717537608402 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO pessoa (id, nome, cpf, telefone, data_nascimento, foto, genero)
      VALUES ('3b6253c0-af44-4769-a0ea-2da3280d5136', 'J. Da Silva', '08305064034', '48900001111', '1990-08-12', 'https://www.shutterstock.com/shutterstock/photos/233628343/display_1500/stock-photo-smiling-young-man-with-beard-in-brown-sweater-233628343.jpg', 'M'); 

      INSERT INTO animal (id, nome, raca, adotado, foto, genero, tipo)
      VALUES ('c40c0380-d277-4e8d-ba44-09708a016486', 'Teddy', 'Vira-Lata', true, 'https://www.adoropets.com.br/wp-content/uploads/2019/12/vira-lata-cabeca-1200x800.jpg', 'M', 'C');

      INSERT INTO animal (id, nome, raca, adotado, foto, genero, tipo)
      VALUES ('7c6866ac-f9d5-4298-bf3d-e03e8cf2e262', 'Lana', 'Siamés', false, 'https://www.thesprucepets.com/thmb/Bg6YzA8DyidMSXUUnyHqhcCr9p4=/1080x1080/filters:no_upscale():max_bytes(150000):strip_icc()/37681550_492533041186443_7260811955290505216_n-5b69b24dc9e77c0025f04801.jpg', 'F', 'G'); 

      INSERT INTO doacao (id, descricao, pessoa_id, animal_id, rua, bairro, cidade)
      VALUES ('9fbdfa5a-1a02-428a-b58a-983c0974a5a0', 'Tchau Teddy!!1', '3b6253c0-af44-4769-a0ea-2da3280d5136', 'c40c0380-d277-4e8d-ba44-09708a016486', 'Rua A.', 'Bairro B.', 'Cidade Z.'); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM doacao WHERE id = '9fbdfa5a-1a02-428a-b58a-983c0974a5a0';
      DELETE FROM animal WHERE id = 'c40c0380-d277-4e8d-ba44-09708a016486';
      DELETE FROM animal WHERE id = '7c6866ac-f9d5-4298-bf3d-e03e8cf2e262';
      DELETE FROM pessoa WHERE id = '3b6253c0-af44-4769-a0ea-2da3280d5136';
    `);
  }

}

