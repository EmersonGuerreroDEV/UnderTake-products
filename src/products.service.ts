import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  // Crear un producto
  async createProduct(data: any): Promise<Product> {
    const newProduct = this.productRepository.create(data);
    return await this.productRepository.save(newProduct);
  }

  // Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  // Actualizar un producto
  async updateProduct(id: number, data: any): Promise<Product> {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
