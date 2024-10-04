import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Variant } from './entities/variant.entity';
import { Category } from './entities/category.entity';
import { ProductResponse } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async createProduct(data: Product): Promise<Product> {
    // Verifica que estás creando un solo producto
    const product = this.productRepository.create(data);

    // Verificar si se han pasado categorías y asignarlas al producto
    if (data.categories && data.categories.length) {
      const categories = await this.categoryRepository.findByIds(data.categories);
      product.categories = categories; // Aquí ya estamos seguros de que 'product' es un objeto, no un array
    }

    // Guardar el producto
    return await this.productRepository.save(product); // Retorna un solo producto
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['variants', 'brand', 'size', 'categories'],
    });
  }

  async findOne(id: number): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'size', 'categories', 'variants'],
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand ? { id: product.brand.id, name: product.brand.name } : null,
      size: product.size ? { id: product.size.id, label: product.size.name } : null,
      categories: product.categories?.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      variants: product.variants?.map((variant) => ({
        id: variant.id,
        color: variant.color,
        size: { id: variant.size.id, label: variant.size.name },
        stock: variant.stock,
      })),
    };
  }


  // Actualizar un producto
  async updateProduct(id: number, data: any): Promise<ProductResponse> {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
