import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './variant.entity';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Variant]), ProductModule],
  controllers: [VariantController],
  providers: [VariantService],
  exports: [TypeOrmModule],
})
export class VariantModule {}
