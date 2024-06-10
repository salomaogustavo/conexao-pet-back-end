import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AdocaoDTO } from './adocao.dto';
import { AdocaoEntity } from './adocao.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalService } from '../animal/animal.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { PessoaDTO } from '../pessoa/pessoa.dto';

@Injectable()
export class AdocaoService {

  constructor(
    @InjectRepository(AdocaoEntity)
    private adocaoRepository: Repository<AdocaoEntity>,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
  ) {}

  private entityToDto(adocao: AdocaoEntity): AdocaoDTO {
    return {
      id: adocao.id,
      descricao: adocao.descricao,
      pessoaId: adocao.pessoa? adocao.pessoa.id : undefined,
      animalId: adocao.animal? adocao.animal.id : undefined,
      rua: adocao.rua,
      bairro: adocao.bairro,
      cidade: adocao.cidade,
      dataCadastro: adocao.dataCadastro,
    };
  }

  async create(adocao: AdocaoDTO): Promise<string | Error> {
    try {
      let pessoa = await this.pessoaService.findById(adocao.pessoaId);

      if ( !pessoa ) {
        throw new HttpException(
          `Pessoa com id: "${adocao.pessoaId}" não foi encontrada.`,
          HttpStatus.BAD_REQUEST
        );
      }

      let animal = await this.animalService.findById(adocao.animalId);

      if ( !animal ) {
        throw new HttpException(
          `Animal com id: "${adocao.animalId}" não foi encontrado.`,
          HttpStatus.BAD_REQUEST
        );
      }

      if ( animal.adotado ) {
        throw new HttpException(
          `O Animal com id: "${adocao.animalId}" já está adotado.`,
          HttpStatus.CONFLICT
        );
      }

      let adocaoEntity = new AdocaoEntity();
      Object.assign(adocaoEntity, adocao);
      adocaoEntity.pessoa = pessoa;
      adocaoEntity.animal = animal;

      let newAdocao = await this.adocaoRepository.save(adocaoEntity);

      delete animal.adocao;
      await this.animalService.update(animal.id, {...animal, adotado: true });
      
      return `Adoção "${newAdocao.id}" criada com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Erro ao criar Adoção: ${error}`,
        error.status
      );
    }
  }

  async findById(id: string): Promise<AdocaoDTO> {
    try {
      let adocao = await this.adocaoRepository.findOne({
        where: { id },
        relations: ['pessoa', 'animal']
      });

      if ( !adocao ) {
        throw new NotFoundException(`Adoção com id "${id}" não foi encontrada.`);
      }

      return this.entityToDto(adocao);
    } catch (error) {
      throw new NotFoundException(`Adoção com id "${id}" não foi encontrada.`);
    }
  }

  async findAll(): Promise<AdocaoDTO[]> {
    try {
      let doacoes = await this.adocaoRepository.find({
        relations: ['pessoa', 'animal']
      });

      return doacoes.map(this.entityToDto);
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar Doações.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: string, adocao: AdocaoDTO): Promise<string | Error> {
    try {
      let found = await this.adocaoRepository.findOne({
        where: { id },
        relations: ['pessoa', 'animal']
      });

      if ( !found ) {
        throw new HttpException(
          `Adoção não foi encontrada.`,
          HttpStatus.BAD_REQUEST
        );
      }

      const keys = Object.keys(adocao);
      const filteredKeys = keys.filter(key => key!== 'pessoaId' && key!== 'animalId');
      const updateData = Object.fromEntries(filteredKeys.map(key => [key, adocao[key]]));

      if ( found.pessoa.id !== adocao.pessoaId ) {
        let pessoa = await this.pessoaService.findById(adocao.pessoaId);

        if ( !pessoa ) {
          throw new HttpException(
            `Pessoa com id: "${adocao.pessoaId}" não foi encontrada.`,
            HttpStatus.BAD_REQUEST
          );
        }
      }

      if ( found.animal.id !== adocao.animalId ) {
        let animal = await this.animalService.findById(adocao.animalId);

        if ( !animal ) {
          throw new HttpException(
            `Animal com id: "${adocao.animalId}" não foi encontrado.`,
            HttpStatus.BAD_REQUEST
          );
        }

        if ( animal.adotado ) {
          throw new HttpException(
            `O Animal com id: "${adocao.animalId}" já está adotado.`,
            HttpStatus.CONFLICT
          );
        }
      }

      await this.adocaoRepository.update(id, updateData);

      return `Adoção atualizada com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar Adoção: ${error}`,
        error.status
      );
    }
  }

  async remove(id: string): Promise<string | Error> {
    try {
      let adocao = await this.adocaoRepository.findOne({
        where: { id },
        relations: ['animal']
      });

      if ( !adocao ) {
        throw new NotFoundException(`Adoção com id "${id}" não foi encontrada.`);
      }

      if ( adocao.animal ) {
        await this.animalService.update(adocao.animal.id, {...adocao.animal, adotado: false });
      }

      await this.adocaoRepository.delete(id);
  
      return 'Adoção excluida com sucesso.';
    } catch (error) {
      throw new HttpException(
        `Erro ao excluir Adoção.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

