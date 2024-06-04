import { DataSource, DataSourceOptions  } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'database',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    synchronize: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/database_migrations/*.js']
};

export default new DataSource(dataSourceOptions);

