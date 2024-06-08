import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoacaoService } from './doacao.service';
import { DoacaoDTO } from './doacao.dto';

@Controller('doacao')
export class DoacaoController {

  constructor(
    private readonly doacaoService: DoacaoService
  ) {}

  @Post()
  async create(@Body() doacao: DoacaoDTO) {
    return await this.doacaoService.create(doacao);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DoacaoDTO> {
    return await this.doacaoService.findById(id);
  }

  @Get()
  async findAll(): Promise<DoacaoDTO[]> {
    return await this.doacaoService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() doacao: DoacaoDTO) {
    return await this.doacaoService.update(id, doacao);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.doacaoService.remove(id);
  }
}

