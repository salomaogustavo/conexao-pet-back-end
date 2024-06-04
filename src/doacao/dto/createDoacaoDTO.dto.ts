import { IsString, IsDateString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { AnimalEntity } from '../../animal/entities/animal.entity';
import { PessoaEntity } from '../../pessoa/entities/pessoa.entity';

export class DoacaoCreateDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNotEmpty()
  pessoa: PessoaEntity;
  
  @IsNotEmpty()
  animal: AnimalEntity;

  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsDateString()
  @IsOptional()
  dataCadastro?: Date;
}

