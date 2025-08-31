import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'appdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
};
