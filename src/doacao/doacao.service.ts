import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DoacaoDTO } from './doacao.dto';
import { DoacaoEntity } from './doacao.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalService } from '../animal/animal.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { PessoaDTO } from '../pessoa/pessoa.dto';

@Injectable()
export class DoacaoService {

  constructor(
    @InjectRepository(DoacaoEntity)
    private doacaoRepository: Repository<DoacaoEntity>,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
  ) {}

  private entityToDto(doacao: DoacaoEntity): DoacaoDTO {
    return {
      id: doacao.id,
      descricao: doacao.descricao,
      pessoaId: doacao.pessoa? doacao.pessoa.id : undefined,
      animalId: doacao.animal? doacao.animal.id : undefined,
      rua: doacao.rua,
      bairro: doacao.bairro,
      cidade: doacao.cidade,
      dataCadastro: doacao.dataCadastro,
    };
  }

  async create(doacao: DoacaoDTO): Promise<string | Error> {
    try {
      let pessoa = await this.pessoaService.findById(doacao.pessoaId);

      if ( !pessoa ) {
        throw new HttpException(
          `Pessoa com id: "${doacao.pessoaId}" não foi encontrada.`,
          HttpStatus.BAD_REQUEST
        );
      }

      let animal = await this.animalService.findById(doacao.animalId);

      if ( !animal ) {
        throw new HttpException(
          `Animal com id: "${doacao.animalId}" não foi encontrado.`,
          HttpStatus.BAD_REQUEST
        );
      }

      if ( animal.adotado ) {
        throw new HttpException(
          `O Animal com id: "${doacao.animalId}" já está adotado.`,
          HttpStatus.CONFLICT
        );
      }

      let doacaoEntity = new DoacaoEntity();
      Object.assign(doacaoEntity, doacao);
      doacaoEntity.pessoa = pessoa;
      doacaoEntity.animal = animal;

      let newDoacao = await this.doacaoRepository.save(doacaoEntity);

      delete animal.doacao;
      await this.animalService.update(animal.id, {...animal, adotado: true });
      
      return `Doação "${newDoacao.id}" criada com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Erro ao criar Doação: ${error}`,
        error.status
      );
    }
  }

  async findById(id: string): Promise<DoacaoDTO> {
    try {
      let doacao = await this.doacaoRepository.findOne({
        where: { id },
        relations: ['pessoa', 'animal']
      });

      if ( !doacao ) {
        throw new NotFoundException(`Doação com id "${id}" não foi encontrada.`);
      }

      return this.entityToDto(doacao);
    } catch (error) {
      throw new NotFoundException(`Doação com id "${id}" não foi encontrada.`);
    }
  }

  async findAll(): Promise<DoacaoDTO[]> {
    try {
      let doacoes = await this.doacaoRepository.find({
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

  async update(id: string, doacao: DoacaoDTO): Promise<string | Error> {
    try {
      let found = await this.doacaoRepository.findOne({
        where: { id }
      });

      if ( !found ) {
        throw new HttpException(
          `Doação não foi encontrada.`,
          HttpStatus.BAD_REQUEST
        );
      }

      if (found.pessoa.id !== doacao.pessoaId) {
        let pessoa = await this.animalService.findById(doacao.pessoaId);

        if ( !pessoa ) {
          throw new HttpException(
            `Pessoa com id: "${doacao.pessoaId}" não foi encontrada.`,
            HttpStatus.BAD_REQUEST
          );
        }
      }

      if (found.animal.id !== doacao.animalId) {
        let animal = await this.animalService.findById(doacao.animalId);

        if ( animal.adotado ) {
          throw new HttpException(
            `O Animal com id: "${doacao.animalId}" já está adotado.`,
            HttpStatus.CONFLICT
          );
        }
      }

      await this.doacaoRepository.update(id, doacao);

      return `Doação atualizada com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar Doação: ${error}`,
        error.status
      );
    }
  }

  async remove(id: string): Promise<string | Error> {
    try {
      await this.doacaoRepository.delete(id);
  
      return 'Doação excluida com sucesso.';
    } catch (error) {
      throw new HttpException(
        `Erro ao excluir Doação.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

