import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DoacaoCreateDTO } from './dto/createDoacaoDTO.dto';
import { DoacaoUpdateDTO } from './dto/updateDoacaoDTO.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoacaoEntity } from './entities/doacao.entity';

@Injectable()
export class DoacaoService {

  constructor(
    @InjectRepository(DoacaoEntity)
    private doacaoRepository: Repository<DoacaoEntity>
  ) {}

  async create(doacao: DoacaoCreateDTO): Promise<string | Error> {
    try {
      let newDoacao = this.doacaoRepository.create(doacao);

      if ( !newDoacao ) {
        throw new NotFoundException(`Erro ao criar Doação.`);
      }

      await this.doacaoRepository.save(newDoacao);
      
      return `Doação "${newDoacao.id}" criada com sucesso.`;
    } catch (error) {
      throw new NotFoundException(`Erro ao criar Doação: ${error.message}.`);
    }
  }

  async findById(id: string): Promise<DoacaoCreateDTO> {
    try {
      return await this.doacaoRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Doação com id "${id}" não foi encontrada.`);
    }
  }

  async findAll(): Promise<DoacaoCreateDTO[]> {
    try {
      return await this.doacaoRepository.find();
    } catch (error) {
      throw new HttpException(`Erro ao buscar Doações.`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, doacao: DoacaoUpdateDTO): Promise<string | Error> {
    try {
      const found = await this.doacaoRepository.findOne({ where: { id } });

      if ( !found ) {
        throw new HttpException(`Doação não foi encontrada.`, HttpStatus.BAD_REQUEST);
      }

      await this.doacaoRepository.update(id, doacao);

      return `Doação atualizada com sucesso.`;
    } catch (error) {
      throw new HttpException(`Erro ao atualizar Doação.`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<string | Error> {
    try {
      await this.doacaoRepository.delete(id);
  
      return 'Doação excluida com sucesso.';
    } catch (error) {
      throw new HttpException(`Doação não encontrada.`, HttpStatus.BAD_REQUEST);
    }
  }
}

