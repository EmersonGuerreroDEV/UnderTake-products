export interface ProductResponse {
    id: number;
    name: string;
    description?: string;
    price: number;
    brand?: BrandResponse;
    size?: SizeResponse;
    categories?: CategoryResponse[];
    variants?: VariantResponse[];
}

interface BrandResponse {
    id: number;
    name: string;
}

interface SizeResponse {
    id: number;
    label: string;
}

interface CategoryResponse {
    id: number;
    name: string;
}

interface VariantResponse {
    id: number;
    color: string;
    size: string;
    stock: number;
}
