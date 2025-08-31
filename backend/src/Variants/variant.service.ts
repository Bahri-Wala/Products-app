import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Variant } from './variant.entity';
import { Product } from '../product/product.entity';
import { CreateVariantDto } from './dto/create-varaint.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.variantRepo.find();
  }

  async create(variant: CreateVariantDto) {
    const product = await this.productRepo.findOne({
      where: { id: variant.product_id },
      relations: ['variants'],
    });
    if (!product) {
      throw new Error('Product does not exist');
    }
    const index = product.variants?.length + 1;
    const skuCode = `${product.index}_${index}`;
    return this.variantRepo.save({
      ...variant,
      index,
      skuCode,
      product,
    });
  }

  update(id: number, variant: UpdateVariantDto) {
    return this.variantRepo.update(id, variant);
  }

  async delete(id: string) {
    const variant = await this.variantRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    const variantsToUpdate = await this.variantRepo.find({
      where: {
        index: MoreThan(variant.index),
        product: { id: variant.product.id },
      },
    });
    variantsToUpdate.forEach(async (variant) => {
      await this.variantRepo.update(
        { id: variant.id },
        {
          index: variant.index - 1,
          skuCode: `${variant.product.index}_${variant.index - 1}`,
        },
      );
    });
    return this.variantRepo.delete(id);
  }
}
