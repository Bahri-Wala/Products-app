import { Product } from 'src/product/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Product, (p) => p.variants, { onDelete: 'CASCADE' })
  product: Product;

  @Index()
  @Column('int')
  index: number; // 1..M per product

  @Index()
  @Column()
  skuCode: string; // <product.index>_<variant.index>

  @Column({ nullable: true })
  createdBy: string;
}
