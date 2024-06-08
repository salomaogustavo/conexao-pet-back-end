import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalDTO } from './animal.dto';

@Controller('animal')
export class AnimalController {

  constructor(
    private readonly animalService: AnimalService
  ) {}

  @Post()
  async create(@Body() animal: AnimalDTO) {
    return await this.animalService.create(animal);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AnimalDTO> {
    return await this.animalService.findById(id);
  }

  @Get()
  async findAll(): Promise<AnimalDTO[]> {
    return await this.animalService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() animal: AnimalDTO) {
    return await this.animalService.update(id, animal);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.animalService.remove(id);
  }
}

