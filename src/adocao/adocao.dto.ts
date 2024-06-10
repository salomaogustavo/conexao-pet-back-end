import { IsString, IsDateString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class AdocaoDTO {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString({ message: 'A descrição deve ser do tipo "string".' })
  @IsOptional()
  descricao: string;

  @IsUUID()
  @IsNotEmpty({ message: 'A pessoa não pode ser nula.' })
  pessoaId: string;
  
  @IsUUID()
  @IsNotEmpty({ message: 'O animal não pode ser nulo.' })
  animalId: string;

  @IsString({ message: 'A rua deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'A rua não pode ser nula.' })
  rua: string;

  @IsString({ message: 'O bairro deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'O bairro não pode ser nulo.' })
  bairro: string;

  @IsString({ message: 'A cidade deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'A cidade não pode ser nula.' })
  cidade: string;

  @IsDateString()
  @IsOptional()
  dataCadastro: Date;
}

