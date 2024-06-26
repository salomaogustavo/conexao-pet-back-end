import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PessoaGeneroEnum } from '../enums/pessoa_genero.enum';
import { AdocaoEntity } from '../adocao/adocao.entity';

@Entity({ name: 'pessoa' })
export class PessoaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento', nullable: true })
  dataNascimento: Date;

  @Column({ type: 'enum', enum: PessoaGeneroEnum, default: PessoaGeneroEnum.INDEFINIDO, nullable: true })
  genero: PessoaGeneroEnum;
 
  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @Column()
  foto: string;
  
  @OneToMany(() => AdocaoEntity, (adocao) => adocao.pessoa)
  adocoes: AdocaoEntity[];
}
