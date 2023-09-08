import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
    {
        id: uuid(),
        name: 'Audi',
        createdAt: Date.now(),
    },
    {
        id: uuid(),
        name: 'BMW',
        createdAt: Date.now(),
    },
    {
        id: uuid(),
        name: 'Lada',
        createdAt: Date.now(),
    }
]