import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category, RentDuration } from 'src/common/entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  category: Category[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  rentPrice: number;

  @IsNotEmpty()
  rentDuration: RentDuration;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  category?: Category[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  rentPrice?: number;

  @IsOptional()
  rentDuration?: RentDuration;
}
