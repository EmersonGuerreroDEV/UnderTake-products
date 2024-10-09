import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateVariantDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;


    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsOptional()
    size?: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    stock: number;   // Cantidad de stock disponible

}
