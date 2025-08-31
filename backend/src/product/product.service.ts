import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  create(product: Partial<Product>) {
    return this.productRepo.save(product);
  }

  update(id: number, product: Partial<Product>) {
    return this.productRepo.update(id, product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
