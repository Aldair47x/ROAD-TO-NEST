import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger("ProductsService");

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto);
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return this.productsRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    let product: Product;

    // Check if term is an id
    if(!product && term.length === 36) {
      product = await this.productsRepository.findOneBy({ id: term });
    }

    // Check if term is a slug
    if(!product) {
      product = await this.productsRepository.findOne({ where: { slug: term.toLowerCase() } });
      if(!product) {
        throw new NotFoundException(`Product with term ${term} not found`);
      }
    }

    return product;
  }

  async update( id: string, updateProductDto: UpdateProductDto ) {

    const product = await this.productsRepository.preload({
      id: id,
      ...updateProductDto
    });

    if ( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);

    try {
      await this.productsRepository.save( product );
      return product;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async remove(term: string) {
    const product = await this.findOne(term);

    await this.productsRepository.remove(product);

    return `Product with term ${term} has been deleted`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === "23505") throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      "Unexpected error, check server logs"
    );
  }
}
