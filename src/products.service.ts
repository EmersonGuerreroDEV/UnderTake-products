import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductResponse } from './interfaces/product.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entities/brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Size } from './entities/size.entity';
import { Variant } from './entities/variant.entity';


@Injectable()
export class ProductsService {


  constructor(

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,

    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,

  ) { }

  async createProduct(data: Product): Promise<CreateBrandDto> {
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
      relations: ['variants', 'brand', 'categories'],
    });
  }

  async findOne(id: number): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories', 'variants'],
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      brand: product.brand ? { id: product.brand.id, name: product.brand.name } : null,

      categories: product.categories?.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      variants: product.variants?.map((variant) => ({
        id: variant.id,
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        image: variant.image

      })),
    };
  }



  async findOneVariant(variantId: number, id: number): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories', 'variants'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      brand: product.brand ? { id: product.brand.id, name: product.brand.name } : null,
      categories: product.categories?.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      variants: product.variants
        ?.filter((variant) => variant.id === variantId) // Filtra solo la variante que coincide con variantId
        .map((variant) => ({ // Mapea la variante filtrada
          id: variant.id,
          color: variant.color,
          size: variant.size,
          stock: variant.stock,
          image: variant.image,
        })) || [], // Devuelve un array vacío si no hay variantes
    };
  }



  // Actualizar un producto
  async updateProduct(id: number, data: UpdateBrandDto): Promise<ProductResponse> {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }


  async createVariant(CreateVariantDto): Promise<Variant> {
    try {
      console.log("Hola mundo, commo estas")
      // Cambia la búsqueda a la forma correcta
      const { id, color, stock, size } = CreateVariantDto
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const variant = new Variant();
      variant.color = color;
      variant.stock = stock;
      variant.size = size;
      variant.product = product; // Asignar el producto a la variante

      return await this.variantRepository.save(variant);
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error);
    }
  }


  // Create a brand
  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(brand);
  }

  // Get all brands
  async findAllBrands(): Promise<Brand[]> {
    console.log("entro aqui")
    return await this.brandRepository.find();
  }

  // Get a brand by ID
  async findBrandById(id: number): Promise<Brand> {
    return await this.brandRepository.findOne({ where: { id } });
  }

  // Update a brand
  async updateBrand(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    console.log(updateBrandDto)
    await this.brandRepository.update(id, updateBrandDto);
    return this.findBrandById(id);
  }

  // Delete a brand
  async removeBrand(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }



  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // Obtener todas las categorías
  async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Obtener una categoría por ID
  async findCategoryById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  // Actualizar una categoría
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findCategoryById(id);
  }

  // Eliminar una categoría
  async removeCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async createSize(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  // Obtener todas las tallas
  async findAllSizes(): Promise<Size[]> {
    return await this.sizeRepository.find();
  }

  // Obtener una talla por ID
  async findSizeById(id: number): Promise<Size> {
    return await this.sizeRepository.findOne({ where: { id } });
  }

  // Actualizar una talla
  async updateSize(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    await this.sizeRepository.update(id, updateSizeDto);
    return this.findSizeById(id);
  }

  // Eliminar una talla
  async removeSize(id: number): Promise<void> {
    await this.sizeRepository.delete(id);
  }

}
