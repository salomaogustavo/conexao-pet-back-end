import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { AnimalGeneroEnum } from '../enums/animal_genero.enum';
import { TipoEnum } from '../enums/tipo.enum';
import { DoacaoEntity } from '../doacao/doacao.entity';

@Entity({ name: 'animal' })
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  raca: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: Date;

  @Column({ type: 'enum', enum: TipoEnum, default: TipoEnum.CACHORRO })
  tipo: TipoEnum;
  
  @Column({ type: 'enum', enum: AnimalGeneroEnum, default: AnimalGeneroEnum.MASCULINO })
  genero: AnimalGeneroEnum;

  @Column()
  adotado: boolean;

  @Column()
  foto: string;

  @OneToOne(() => DoacaoEntity, (doacao) => doacao.animal)
  doacao: DoacaoEntity;
}

