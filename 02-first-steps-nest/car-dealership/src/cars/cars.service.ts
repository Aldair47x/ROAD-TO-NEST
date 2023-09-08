import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

export interface Car {
  id: string;
  brand: string;
  color: string;
  model: string;
  price: number;
}

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Audi',
    //   color: 'black',
    //   model: 'A4',
    //   price: 20000,
    // },
    // {
    //   id: uuid(),
    //   brand: 'BMW',
    //   color: 'white',
    //   model: 'X5',
    //   price: 25000,
    // },
    // {
    //   id: uuid(),
    //   brand: 'Lada',
    //   color: 'red',
    //   model: 'Vesta',
    //   price: 15000,
    // },
  ];

  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: string): Car {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException('Car not found');

    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    if (!createCarDto) throw new Error('car format incorrect');
    const newCar: Car = {
      id: uuid(),
      ...createCarDto
    }
    this.cars.push(newCar);
    return newCar;
    
  }

  updateCar(id: string, car: Car) {
    if (!car) throw new Error('car format incorrect');
    const auxCar = this.getCarById(id);
    if (!auxCar) throw new Error('car not found');
    this.cars = this.cars.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          ...car,
        };
      }
      return c;
    });
  }

  deleteCar(id: string) {
    const auxCar = this.getCarById(id);
    if (!auxCar) throw new Error('car not found');
    this.cars = this.cars.filter((c) => c.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
