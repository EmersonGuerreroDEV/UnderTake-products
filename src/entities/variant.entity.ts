import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity()
export class Variant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @Column()
    stock: number;

    @ManyToOne(() => Product, (product) => product.variants)
    product: Product;

    @ManyToOne(() => Size, (size) => size.variants)
    size: Size;
}
