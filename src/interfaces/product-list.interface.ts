import { ProductResponse } from './product.interface';

export interface ProductsListResponse {
  products: ProductResponse[];
  total: number;
}
