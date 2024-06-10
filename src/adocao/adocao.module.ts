import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdocaoEntity } from './adocao.entity';
import { AdocaoService } from './adocao.service';
import { AdocaoController } from './adocao.controller';
import { AnimalModule } from '../animal/animal.module';
import { PessoaModule } from '../pessoa/pessoa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdocaoEntity]),
    AnimalModule,
    PessoaModule,
  ],
  providers: [AdocaoService],
  controllers: [AdocaoController],
})
export class AdocaoModule {}

