import { IsString, IsDateString, IsUUID, IsNotEmpty, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { AnimalGeneroEnum } from '../enums/animal_genero.enum';
import { TipoEnum } from '../enums/tipo.enum';

export class AnimalDTO {
  @IsUUID()
  @IsOptional()
  id: string;
 
  @IsString({ message: 'O nome do animal deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'O nome do animal não pode ser nulo.' })
  nome: string;

  @IsString({ message: 'A raça do animal deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'A raça do animal não pode ser nula.' })
  raca: string;
  
  @IsBoolean({ message: 'O campo "adotado" não pode ser deve ser do tipo "boolean".' })
  @IsOptional()
  adotado: boolean;
 
  @IsString({ message: 'A foto do animal deve ser do tipo "string".' })
  @IsNotEmpty({ message: 'A foto do animal não pode ser nula.' })
  foto: string;
 
  @IsEnum(AnimalGeneroEnum, { message: 'O genêro dever ser somente "M" ou "F".' })
  @IsNotEmpty({ message: 'O gênero não pode ser nulo.' })
  genero: AnimalGeneroEnum;
  
  @IsEnum(TipoEnum, { message: 'O tipo do animal dever ser somente "C" ou "G".' })
  @IsNotEmpty({ message: 'O tipo do animal não pode ser nulo.' })
  tipo: TipoEnum;

  @IsDateString()
  @IsNotEmpty()
  dataNascimento: Date;
}

