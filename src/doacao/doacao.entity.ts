import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { AnimalEntity } from '../animal/animal.entity';
import { PessoaEntity } from '../pessoa/pessoa.entity';

@Entity({ name: 'doacao' })
export class DoacaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => PessoaEntity, (pessoa) => pessoa.doacoes)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: PessoaEntity;
  
  @OneToOne(() => AnimalEntity, (animal) => animal.doacao)
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
