import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Variant } from './variant.entity';

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.size)
    products: Product[];

    @OneToMany(() => Variant, (variant) => variant.size)
    variants: Variant[];
}
