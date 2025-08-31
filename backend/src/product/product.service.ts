import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async create(product: Partial<Product>) {
    const products = await this.productRepo.count();
    return this.productRepo.save({ ...product, index: products + 1 });
  }

  update(id: number, product: Partial<Product>) {
    return this.productRepo.update(id, product);
  }

  async delete(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    const productsToUpdate = await this.productRepo.find({
      where: {
        index: MoreThan(product.index),
      },
    });
    productsToUpdate.forEach(async (product) => {
      await this.productRepo.update(
        { id: product.id },
        { index: product.index - 1 },
      );
    });
    return this.productRepo.delete(id);
  }
}
