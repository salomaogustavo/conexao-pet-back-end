import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { AnimalCreateDTO } from './createAnimalDTO.dto';

export class AnimalUpdateDTO extends PartialType(AnimalCreateDTO) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

