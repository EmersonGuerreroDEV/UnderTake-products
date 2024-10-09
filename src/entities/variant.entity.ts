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

    @Column({ default: "https://www.jbl.com.co/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw398f5bc0/1.JBL_QUANTUM_STREAM_Product%20Image_Front_Teal.png" })
    image: string
}
