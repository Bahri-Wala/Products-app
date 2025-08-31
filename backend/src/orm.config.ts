import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['./migrations/*.ts'],
  synchronize: true,
  host: process.env.DATABASE_HOST || 'postgres',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'appdb',
};
