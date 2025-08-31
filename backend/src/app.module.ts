import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { VariantModule } from './Variants/variant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'appdb',
      entities: [Product],
      synchronize: true,
    }),
    ProductModule,
    VariantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
