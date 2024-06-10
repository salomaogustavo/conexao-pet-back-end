import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdocaoService } from './adocao.service';
import { AdocaoDTO } from './adocao.dto';

@Controller('adocao')
export class AdocaoController {

  constructor(
    private readonly adocaoService: AdocaoService
  ) {}

  @Post()
  async create(@Body() adocao: AdocaoDTO) {
    return await this.adocaoService.create(adocao);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AdocaoDTO> {
    return await this.adocaoService.findById(id);
  }

  @Get()
  async findAll(): Promise<AdocaoDTO[]> {
    return await this.adocaoService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() adocao: AdocaoDTO) {
    return await this.adocaoService.update(id, adocao);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adocaoService.remove(id);
  }
}

