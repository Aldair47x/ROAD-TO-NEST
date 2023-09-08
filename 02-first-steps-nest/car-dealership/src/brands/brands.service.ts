import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Audi',
    //   createdAt: Date.now(),
    // },
    // {
    //   id: uuid(),
    //   name: 'BMW',
    //   createdAt: Date.now(),
    // },
    // {
    //   id: uuid(),
    //   name: 'Lada',
    //   createdAt: Date.now(),
    // }
  ];
  
  create(createBrandDto: CreateBrandDto) {

    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: Date.now(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    if (!updateBrandDto) throw new Error('brand format incorrect');
    let brand = this.findOne(id);
    if (!brand) throw new Error('brand not found');
    this.brands = this.brands.map((b) => {
      if (b.id === id) {
        brand.updatedAt = Date.now();
        brand = {
          ...brand,
          ...updateBrandDto,
        };
        return brand;
      }
      return b;
    });
    return brand;
  }

  remove(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException('Brand not found');
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return brand;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
