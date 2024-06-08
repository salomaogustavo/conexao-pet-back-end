import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './animal.entity';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalEntity])],
  providers: [AnimalService],
  controllers: [AnimalController],
  exports: [AnimalService],
})
export class AnimalModule {}

