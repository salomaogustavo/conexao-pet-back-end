import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacaoEntity } from './entities/doacao.entity';
import { DoacaoService } from './doacao.service';
import { DoacaoController } from './doacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoacaoEntity])],
  providers: [DoacaoService],
  controllers: [DoacaoController],
})
export class DoacaoModule {}

