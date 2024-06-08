import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalModule } from './animal/animal.module';
import { DoacaoModule } from './doacao/doacao.module';
import { PessoaModule } from './pessoa/pessoa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AnimalModule,
    DoacaoModule,
    PessoaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
