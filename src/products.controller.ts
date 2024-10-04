import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @MessagePattern({ cmd: 'create-product' })
  createProduct(@Body() data: any) {
    return this.productsService.createProduct(data);
  }

  @MessagePattern({ cmd: 'get-products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'get-product' })
  findOne(@Body('id') id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  updateProduct(@Body() { id, updateProductDto }: { id: number; updateProductDto: UpdateProductDto }) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  deleteProduct(@Body('id') id: number) {
    return this.productsService.deleteProduct(id);
  }

  // Métodos para manejar marcas
  @Post('brands')
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.productsService.createBrand(createBrandDto);
  }

  @Get('brands/list')
  async findAllBrands() {
    return this.productsService.findAllBrands();
  }

  @Get('brands/:id')
  async findBrandById(@Param('id') id: number) {
    return this.productsService.findBrandById(id);
  }

  @Put('brands/:id')
  async updateBrand(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return this.productsService.updateBrand(id, updateBrandDto);
  }

  @Delete('brands/:id')
  async removeBrand(@Param('id') id: number) {
    return this.productsService.removeBrand(id);
  }

  // Métodos para manejar categorías
  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  async findCategoryById(@Param('id') id: number) {
    return this.productsService.findCategoryById(id);
  }

  @Put('categories/:id')
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.productsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  async removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(id);
  }

  // Métodos para manejar tamaños
  @Post('sizes')
  async createSize(@Body() createSizeDto: CreateSizeDto) {
    return this.productsService.createSize(createSizeDto);
  }

  @Get('sizes')
  async findAllSizes() {
    return this.productsService.findAllSizes();
  }

  @Get('sizes/:id')
  async findSizeById(@Param('id') id: number) {
    return this.productsService.findSizeById(id);
  }

  @Put('sizes/:id')
  async updateSize(@Param('id') id: number, @Body() updateSizeDto: UpdateSizeDto) {
    return this.productsService.updateSize(id, updateSizeDto);
  }

  @Delete('sizes/:id')
  async removeSize(@Param('id') id: number) {
    return this.productsService.removeSize(id);
  }
}
