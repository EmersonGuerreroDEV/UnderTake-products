import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Brand } from './brand.entity';
import { Size } from './size.entity';
import { Variant } from './variant.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    @ManyToOne(() => Size, (size) => size.products, { nullable: true })
    size: Size;

    @OneToMany(() => Variant, (variant) => variant.product)
    variants: Variant[];

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'category_id' },
    })
    categories: Category[];
}
