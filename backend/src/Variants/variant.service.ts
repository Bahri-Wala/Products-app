import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from './variant.entity';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private variantRepo: Repository<Variant>,
  ) {}

  findAll() {
    return this.variantRepo.find();
  }

  create(variant: Partial<Variant>) {
    return this.variantRepo.save(variant);
  }

  update(id: number, variant: Partial<Variant>) {
    return this.variantRepo.update(id, variant);
  }

  delete(id: number) {
    return this.variantRepo.delete(id);
  }
}
