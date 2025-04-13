import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.development.env`,
});

const configService = new ConfigService();

export const DataSourseConfig: DataSourceOptions = {
  type: 'postgres',
  /*
  host:
    configService.get('NODE_ENV') === 'test'
      ? configService.get('DB_HOST-TEST')
      : configService.get('DB_HOST'),ss
  port:
    configService.get('NODE_ENV') === 'test'
      ? configService.get('DB_PORT_TEST')
      : configService.get('DB_PORT'),
  username:
    configService.get('NODE_ENV') === 'test'
      ? configService.get('DB_USERNAME_TEST')
      : configService.get('DB_USERNAME'),
  password:
    configService.get('DB_ENV') === 'test'
      ? configService.get('DB_PASSWORD_TEST')
      : configService.get('DB_PASSWORD'),
  database:
    configService.get('NODE_ENV') === 'test'
      ? configService.get('DB_NAME_TEST')
      : configService.get('DB_NAME'),*/

  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),

  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};
console.log(DataSourseConfig.database);

export const AppDS = new DataSource(DataSourseConfig);
