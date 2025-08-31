import { Variant } from 'src/Variants/variant.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  index: number;

  @OneToMany(() => Variant, (v) => v.product, { cascade: ['remove'] })
  variants: Variant[];
}
