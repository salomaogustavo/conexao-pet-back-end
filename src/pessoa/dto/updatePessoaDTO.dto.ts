import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { PessoaCreateDTO } from './createPessoaDTO.dto';

export class PessoaUpdateDTO extends PartialType(PessoaCreateDTO) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

