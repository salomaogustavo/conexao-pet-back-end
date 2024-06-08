import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacaoEntity } from './doacao.entity';
import { DoacaoService } from './doacao.service';
import { DoacaoController } from './doacao.controller';
import { AnimalModule } from '../animal/animal.module';
import { PessoaModule } from '../pessoa/pessoa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoacaoEntity]),
    AnimalModule,
    PessoaModule,
  ],
  providers: [DoacaoService],
  controllers: [DoacaoController],
})
export class DoacaoModule {}

