import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';


@Entity()
export class Variant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @Column({ default: "" }) // Cambiado a string
    size: string; // Ahora es una cadena de texto

    @Column()
    stock: number;

    @ManyToOne(() => Product, (product) => product.variants)
    product: Product;

    // @Column()
    // image: string
}
