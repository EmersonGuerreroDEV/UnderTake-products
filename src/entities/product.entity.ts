import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Brand } from './brand.entity';
import { Size } from './size.entity';
import { Category } from './category.entity';
import { Variant } from './variant.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    price: number;

    @Column()
    discount: number

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    @OneToMany(() => Variant, (variant) => variant.product)
    variants: Variant[]; // Relación con las variantes

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'category_id' },
    })
    categories: Category[];
}
