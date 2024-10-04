import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsOptional()
    brandId?: number;

    @IsNumber()
    @IsOptional()
    sizeId?: number;

    @IsArray()
    @IsOptional()
    categories?: number[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVariantDto)
    @IsOptional()
    variants?: CreateVariantDto[];
}

class CreateVariantDto {
    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNumber()
    @IsNotEmpty()
    sizeId: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;
}
