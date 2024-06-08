import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './pessoa.entity';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  providers: [PessoaService],
  controllers: [PessoaController],
  exports: [PessoaService],
})
export class PessoaModule {}

