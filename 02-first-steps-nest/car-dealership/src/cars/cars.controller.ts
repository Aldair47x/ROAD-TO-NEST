import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Car, CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars(): Car[] {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): Car {
    if (!Number(id)) throw new Error('id must be a number');
    return this.carsService.getCarById(id);
  }

  @Post()
  createCar(@Body() car: Car) {
    if (!car.id) throw new Error('car must have an id');
    this.carsService.createCar(car);
    return {
      message: 'car created',
      car,
    };
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() car: Car) {
    if (!Number(id)) throw new Error('id must be a number');
    this.carsService.updateCar(id, car);
    return {
      message: 'car updated',
      car,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    if (!Number(id)) throw new Error('id must be a number');
    this.carsService.deleteCar(id);
    return {
      message: 'car deleted',
      id,
    };
  }
}
