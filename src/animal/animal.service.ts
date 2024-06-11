import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AnimalDTO } from './animal.dto';
import { AnimalEntity } from './animal.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnimalService {

  constructor(
    @InjectRepository(AnimalEntity)
    private animalRepository: Repository<AnimalEntity>
  ) {}

  async create(animal: AnimalDTO): Promise<string | Error> {
    try {
      let newAnimal = this.animalRepository.create(animal);

      if ( !newAnimal ) {
        throw new NotFoundException(`Erro ao criar Animal.`);
      }

      await this.animalRepository.save(newAnimal);

      return `Animal "${newAnimal.id}" criado com sucesso.`;
    } catch (error) {
      throw new NotFoundException(`Erro ao criar Animal: ${error.message}`);
    }
  }

  async findById(id: string): Promise<AnimalEntity> {
    try {
      return await this.animalRepository.findOne({
        where: { id },
        relations: ['adocao']
      });
    } catch (error) {
      throw new NotFoundException(`Animal com id "${id}" não foi encontrado.`);
    }
  }

  async findAll(): Promise<AnimalEntity[]> {
    try {
      return await this.animalRepository.find({
        relations: ['adocao']
      });
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar Animais.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: string, animal: AnimalDTO): Promise<string | Error> {
    try {
      let found = await this.animalRepository.findOne({
        where: { id }
      });

      if ( !found ) {
        throw new HttpException(
          `Animal com id: ${id} não foi encontrado.`,
          HttpStatus.BAD_REQUEST
        );
      }

      await this.animalRepository.update(id, animal);

      return `Animal atualizado com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Animal com id: ${id} não foi encontrado.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async remove(id: string): Promise<string | Error> {
    try {
      await this.animalRepository.delete(id);
  
      return 'Animal excluido com sucesso.';
    } catch (error) {
      throw new HttpException(
        `Erro ao excluir Animal.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

