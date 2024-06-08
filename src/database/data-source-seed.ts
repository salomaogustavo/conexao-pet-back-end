import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './data-source';

export const dataSourceOptionsSeed: DataSourceOptions = {
  ...dataSourceOptions,
  migrations: ['dist/database/database_seeds/*.js']
};

export default new DataSource(dataSourceOptionsSeed);

