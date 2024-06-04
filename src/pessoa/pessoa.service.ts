import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PessoaCreateDTO } from './dto/createPessoaDTO.dto';
import { PessoaUpdateDTO } from './dto/updatePessoaDTO.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaEntity } from './entities/pessoa.entity';

@Injectable()
export class PessoaService {

  constructor(
    @InjectRepository(PessoaEntity)
    private pessoaRepository: Repository<PessoaEntity>
  ) {}

  async create(pessoa: PessoaCreateDTO): Promise<string | Error> {
    try {
      let newPessoa = this.pessoaRepository.create(pessoa);

      if ( !newPessoa ) {
        throw new NotFoundException(`Erro ao criar Pessoa.`);
      }

      await this.pessoaRepository.save(newPessoa);

      return `Pessoa "${newPessoa.id}" criada com sucesso.`;
    } catch (error) {
      throw new NotFoundException(`Erro ao criar Pessoa: ${error.message}.`);
    }
  }

  async findById(id: string): Promise<PessoaCreateDTO> {
    try {
      return await this.pessoaRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Pessoa com id "${id}" não foi encontrada.`);
    }
  }

  async findAll(): Promise<PessoaCreateDTO[]> {
    try {
      return await this.pessoaRepository.find();
    } catch (error) {
      throw new HttpException(`Erro ao buscar Pessoas.`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, pessoa: PessoaUpdateDTO): Promise<string | Error> {
    try {
      const found = await this.pessoaRepository.findOne({ where: { id } });

      if ( !found ) {
        throw new HttpException(`Pessoa não foi encontrada.`, HttpStatus.BAD_REQUEST);
      }

      await this.pessoaRepository.update(id, pessoa);

      return `Pessoa atualizada com sucesso.`;
    } catch (error) {
      throw new HttpException(`Erro ao atualizar Pessoa.`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<string | Error> {
    try {
      await this.pessoaRepository.delete(id);
  
      return 'Pessoa excluida com sucesso.';
    } catch (error) {
      throw new HttpException(`Pessoa não encontrada.`, HttpStatus.BAD_REQUEST);
    }
  }
}

