import { IsString, IsDateString, IsUUID, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { PessoaGeneroEnum } from '../../enums/pessoa_genero.enum';

export class PessoaCreateDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;
  
  @IsString()
  @IsNotEmpty()
  telefone: string;
  
  @IsDateString()
  @IsOptional()
  dataNascimento?: Date;
  
  @IsString()
  @IsOptional()
  foto?: string;
  
  @IsEnum(PessoaGeneroEnum)
  @IsOptional()
  genero?: PessoaGeneroEnum;
}

