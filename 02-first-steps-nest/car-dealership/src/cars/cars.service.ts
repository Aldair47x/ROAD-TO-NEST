import { Injectable, NotFoundException } from '@nestjs/common';

export interface Car {
  id: number;
  brand: string;
  color: string;
  model: string;
  price: number;
}

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: 1,
      brand: 'Audi',
      color: 'black',
      model: 'A4',
      price: 20000,
    },
    {
      id: 2,
      brand: 'BMW',
      color: 'white',
      model: 'X5',
      price: 25000,
    },
    {
      id: 3,
      brand: 'Lada',
      color: 'red',
      model: 'Vesta',
      price: 15000,
    },
  ];

  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: number): Car {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException('Car not found');

    return car;
  }

  createCar(car: Car) {
    if (!car) throw new Error('car format incorrect');
    const auxCar = this.cars.find((c) => c.id === car.id);
    if (auxCar) throw new Error('car already exists');
    this.cars.push(car);
  }

  updateCar(id: number, car: Car) {
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

  deleteCar(id: number) {
    const auxCar = this.getCarById(id);
    if (!auxCar) throw new Error('car not found');
    this.cars = this.cars.filter((c) => c.id !== id);
  }
}
