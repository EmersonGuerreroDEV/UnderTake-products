import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
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
import { lastValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('UPLOAD_SERVICE') private readonly uploadService: ClientProxy,
  ) { }

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

  @MessagePattern({ cmd: 'get-get_product_by_id' })
  async findOneVariant(@Body() data: any) {

    return await this.productsService.findOneVariant(data.variantId, data.productId);
  }

  @MessagePattern({ cmd: 'update-product' })
  updateProduct(
    @Body()
    {
      id,
      updateProductDto,
    }: {
      id: number;
      updateProductDto: UpdateProductDto;
    },
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  deleteProduct(@Body('id') id: number) {
    return this.productsService.deleteProduct(id);
  }


  @MessagePattern({ cmd: 'delete-variant' })
  deleteVariant(@Body('id') id: number) {
    return this.productsService.deleteVariant(id);
  }



  // Métodos para manejar marcas
  @MessagePattern({ cmd: 'create-brands' })
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.productsService.createBrand(createBrandDto);
  }

  @MessagePattern({ cmd: 'create-variant' })
  async createVariant(data: any) {
    const { file, stock, id, size, color } = data;

    const fileBuffer = Buffer.isBuffer(file.buffer)
      ? file.buffer
      : Buffer.from(file.buffer);

    const imageResponse = await lastValueFrom(
      this.uploadService.send(
        { cmd: 'upload-profile-picture' },
        {
          file: fileBuffer, // Asegúrate de que este sea un buffer
          originalname: file.originalname,
        },
      ),
    );
    // Verifica que esta línea se ejecute

    const createVariantDto: CreateVariantDto = {
      stock,
      id,
      size,
      color,
      image: imageResponse.url.secure_url, // Asegúrate de que esto sea lo que devuelves
    };

    return this.productsService.createVariant(createVariantDto);
  }

  @MessagePattern({ cmd: 'update-variant' })
  async updateVariant(data: any) {
    console.log(data, 'ESTA ES LA ACTUALIZACION DEL PRODUCTO');

    const { file } = data;
    // Verifica que esta línea se ejecute

    const createVariantDto: UpdateVariantDto = data.data;

    if (file) {
      const fileBuffer = Buffer.isBuffer(file.buffer)
        ? file.buffer
        : Buffer.from(file.buffer);

      const imageResponse = await lastValueFrom(
        this.uploadService.send(
          { cmd: 'upload-profile-picture' },
          {
            file: fileBuffer, // Asegúrate de que este sea un buffer
            originalname: file.originalname,
          },
        ),
      );
      createVariantDto.image = imageResponse.url;
    }

    return this.productsService.updateVariant(createVariantDto, data.id);
  }

  @MessagePattern({ cmd: '' })
  async updateBrand(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.productsService.updateBrand(id, updateBrandDto);
  }

  // Métodos para manejar categorías
  @MessagePattern({ cmd: 'create-categories' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @MessagePattern({ cmd: 'list-categories' })
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  async findCategoryById(@Param('id') id: number) {
    return this.productsService.findCategoryById(id);
  }

  @MessagePattern({ cmd: 'update-categories' })
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.productsService.updateCategory(
      updateCategoryDto.id,
      updateCategoryDto,
    );
  }

  @Delete('categories/:id')
  async removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(id);
  }
}
