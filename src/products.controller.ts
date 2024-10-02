import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @MessagePattern({ cmd: 'create-product' })
  createProduct(data: any) {
    return this.productsService.createProduct(data);
  }

  @MessagePattern({ cmd: 'get-products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'get-product' })
  findOne(id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  updateProduct({ id, data }: { id: number; data: any }) {
    return this.productsService.updateProduct(id, data);
  }

  @MessagePattern({ cmd: 'delete-product' })
  deleteProduct(id: number) {
    return this.productsService.deleteProduct(id);
  }
}
