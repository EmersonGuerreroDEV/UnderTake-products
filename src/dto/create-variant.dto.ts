import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateVariantDto {
    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsOptional()
    size?: string;

    @IsNumber()
    @IsNotEmpty()
    stock: number;   // Cantidad de stock disponible
}
