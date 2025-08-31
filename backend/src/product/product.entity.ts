import { Variant } from 'src/Variants/variant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index()
  @Column()
  index: number;

  @OneToMany(() => Variant, (v) => v.product)
  variants: Variant[];
}
