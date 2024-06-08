import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './pessoa.dto';

@Controller('pessoa')
export class PessoaController {

  constructor(
    private readonly pessoaService: PessoaService
  ) {}

  @Post()
  async create(@Body() pessoa: PessoaDTO) {
    return await this.pessoaService.create(pessoa);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PessoaDTO> {
    return await this.pessoaService.findById(id);
  }

  @Get()
  async findAll(): Promise<PessoaDTO[]> {
    return await this.pessoaService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() pessoa: PessoaDTO) {
    return await this.pessoaService.update(id, pessoa);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pessoaService.remove(id);
  }
}

