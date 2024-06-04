import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { AnimalEntity } from '../../animal/entities/animal.entity';
import { PessoaEntity } from '../../pessoa/entities/pessoa.entity';

@Entity({ name: 'doacao' })
export class DoacaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @OneToOne(() => PessoaEntity, (pessoa) => pessoa.doacao)
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
