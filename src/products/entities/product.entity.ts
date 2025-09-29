import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  image: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
