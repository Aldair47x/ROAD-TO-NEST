import { Car } from "src/cars/cars.service";
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
    {
        id: uuid(),
        brand: 'Audi',
        model: 'A4',
        price: 10000,
        color: 'black',
    },
    {
        id: uuid(),
        brand: 'BMW',
        model: 'X5',
        price: 20000,
        color: 'white',
    },
    {
        id: uuid(),
        brand: 'Lada',
        model: 'Vesta',
        price: 5000,
        color: 'red',
    }
]