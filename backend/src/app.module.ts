import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { VariantModule } from './Variants/variant.module';
import { config } from './orm.config';
import { VariantController } from './Variants/variant.controller';
import { VariantService } from './Variants/variant.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProductModule,
    VariantModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
