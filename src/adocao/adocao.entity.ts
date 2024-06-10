import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { AnimalEntity } from '../animal/animal.entity';
import { PessoaEntity } from '../pessoa/pessoa.entity';

@Entity({ name: 'adocao' })
export class AdocaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => PessoaEntity, (pessoa) => pessoa.adocoes)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: PessoaEntity;
  
  @OneToOne(() => AnimalEntity, (animal) => animal.adocao)
  @JoinColumn({ name: 'animal_id' })
  animal: AnimalEntity;
  
  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ type: 'date', name: 'data_cadastro' })
  dataCadastro: Date;
}
