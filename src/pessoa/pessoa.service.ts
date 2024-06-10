import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PessoaDTO } from './pessoa.dto';
import { PessoaEntity } from './pessoa.entity';
import { PessoaGeneroEnum } from '../enums/pessoa_genero.enum';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isValid, format } from '../functions/validar_cpf.function';

@Injectable()
export class PessoaService {

  constructor(
    @InjectRepository(PessoaEntity)
    private pessoaRepository: Repository<PessoaEntity>,
  ) {}

  private applyMaskToPhoneNumber(telefone: string): string {
    if ( !telefone.match(/\(\d{2}\) \d{1} \d{4}-\d{4}/) ) {
      if ( /^\d{11}$/.test(telefone) ) {
        return telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
      }

      throw new HttpException(
        'Número de telefone inválido.',
        HttpStatus.BAD_REQUEST
      );
    }

    return telefone;
  }

  async create(pessoa: PessoaDTO): Promise<string | Error> {
    try {
      if ( !isValid(pessoa.cpf) ) {
        throw new NotFoundException(`CPF inválido.`);
      }

      pessoa.cpf = format(pessoa.cpf);
      pessoa.telefone = this.applyMaskToPhoneNumber(pessoa.telefone);

      let newPessoa = this.pessoaRepository.create(pessoa);

      if ( !newPessoa ) {
        throw new NotFoundException(`Erro ao criar Pessoa.`);
      }

      await this.pessoaRepository.save(newPessoa);

      return `Pessoa "${newPessoa.id}" criada com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Erro ao criar Pessoa: ${error}`,
        error.status
      );
    }
  }

  async findById(id: string): Promise<PessoaDTO> {
    try {
      return await this.pessoaRepository.findOne({
        where: { id },
        relations: ['adocoes']
      });
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar Pessoas.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(): Promise<PessoaDTO[]> {
    try {
      return await this.pessoaRepository.find({
        relations: ['adocoes']
      });
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar Pessoa.`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: string, pessoa: PessoaDTO): Promise<string | Error> {
    try {
      if ( !isValid(pessoa.cpf) ) {
        throw new NotFoundException(`CPF inválido.`);
      }

      await this.findById(id);

      pessoa.cpf = format(pessoa.cpf);
      pessoa.telefone = this.applyMaskToPhoneNumber(pessoa.telefone);

      await this.pessoaRepository.update(id, pessoa);

      return `Pessoa atualizada com sucesso.`;
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar Pessoa: ${error}`,
        error.status
      );
    }
  }

  async remove(id: string): Promise<string | Error> {
    try {
      await this.pessoaRepository.delete(id);
  
      return 'Pessoa excluida com sucesso.';
    } catch (error) {
      throw new HttpException(
        `Erro ao excluir Pessoa.`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

