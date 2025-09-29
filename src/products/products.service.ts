import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { isEmpty } from 'src/utils/validation.utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      return await newProduct.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const data = await this.productModel.find().exec();

    if (isEmpty(data)) {
      throw new NotFoundException('Not products found');
    }

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
