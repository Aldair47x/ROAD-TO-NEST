import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common';
import { Car, CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars(): Car[] {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string): Car {
    if(!id) throw new Error('id must be exist');
    return this.carsService.getCarById(id);
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    const newCar: Car = this.carsService.createCar(createCarDto);
    return {
      message: 'car created',
      newCar,
    };
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() car: Car) {
    if(!id) throw new Error('id must be exist');
    this.carsService.updateCar(id, car);
    return {
      message: 'car updated',
      car,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    if(!id) throw new Error('id must be exist');
    this.carsService.deleteCar(id);
    return {
      message: 'car deleted',
      id,
    };
  }
}
