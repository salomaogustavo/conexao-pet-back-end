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
    let response = await this.adocaoService.create(adocao);

    return { message: response };
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
    let response = await this.adocaoService.update(id, adocao);

    return { message: response };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response = await this.adocaoService.remove(id);

    return { message: response };
  }
}

