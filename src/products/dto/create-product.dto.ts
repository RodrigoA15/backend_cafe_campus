import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  category_id: mongoose.Types.ObjectId;
}
