import { IsString, IsDateString, IsUUID, IsOptional, IsNotEmpty, IsEnum, Matches, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PessoaGeneroEnum } from '../enums/pessoa_genero.enum';
import { AdocaoEntity } from '../adocao/adocao.entity';

export class PessoaDTO {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString({ message: 'O nome deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'O nome não pode ser nulo.' })
  nome: string;

  @IsString({ message: 'O CPF deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'O CPF não pode ser nulo.' })
  cpf: string;
  
  @IsString({ message: 'O telefone deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'O telefone não pode ser nulo.' })
  @Matches(
    /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
    { message: 'O número de telefone informado não está em conformidade com o padrão.' }
  )
  telefone: string;
  
  @IsDateString()
  @IsOptional()
  dataNascimento: Date;
  
  @IsString({ message: 'A foto da pessoa deve ser do tipo "string".' })
  @IsOptional()
  foto: string;
  
  @IsEnum(PessoaGeneroEnum, { message: 'O gênero dever ser somente "M", "F" ou "I".' })
  @IsOptional()
  genero: PessoaGeneroEnum;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdocaoEntity)
  adocoes: AdocaoEntity[];
}

