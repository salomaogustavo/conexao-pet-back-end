import { IsString, IsDateString, IsUUID, IsNotEmpty, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { AnimalGeneroEnum } from '../../enums/animal_genero.enum';
import { TipoEnum } from '../../enums/tipo.enum';

export class AnimalCreateDTO {
  @IsUUID()
  @IsOptional()
  id?: string;
 
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  raca: string;
  
  @IsBoolean()
  @IsNotEmpty()
  adotado: boolean;
 
  @IsString()
  @IsNotEmpty()
  foto: string;
 
  @IsEnum(AnimalGeneroEnum)
  genero: AnimalGeneroEnum;
  
  @IsEnum(TipoEnum)
  tipo: TipoEnum;
}

