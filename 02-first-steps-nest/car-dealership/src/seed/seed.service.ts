import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}
  
  populateDB() {
    this.carsService.fillCarsWithSeedData( CARS_SEED);
    this.brandsService.fillBrandsWithSeedData( BRANDS_SEED );
    return 'DB populated successfully';
  }
}
