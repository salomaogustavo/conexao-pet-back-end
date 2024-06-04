import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalCreateDTO } from './dto/createAnimalDTO.dto';
import { AnimalUpdateDTO } from './dto/updateAnimalDTO.dto';

@Controller('animal')
export class AnimalController {

  constructor(
    private readonly animalService: AnimalService
  ) {}

  @Post()
  async create(@Body() animal: AnimalCreateDTO) {
    return await this.animalService.create(animal);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AnimalCreateDTO> {
    return await this.animalService.findById(id);
  }

  @Get()
  async findAll(): Promise<AnimalCreateDTO[]> {
    return await this.animalService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() animal: AnimalUpdateDTO) {
    return await this.animalService.update(id, animal);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.animalService.remove(id);
  }
}

