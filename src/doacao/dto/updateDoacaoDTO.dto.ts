import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { DoacaoCreateDTO } from './createDoacaoDTO.dto';

export class DoacaoUpdateDTO extends PartialType(DoacaoCreateDTO) {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsDateString()
  dataCadastro: Date;
}

