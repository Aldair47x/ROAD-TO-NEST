import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name) 
    private pokemonModel: Model<Pokemon>
  ) {}

  async executeSeed() {
    console.log('---Seeding data---');
    await this.pokemonModel.deleteMany({});
    console.log('Deleted all pokemons');
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');
    let pokemonsConverted = [];
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const number = segments[segments.length - 2];
      name.toLowerCase();
      pokemonsConverted.push({
        name,
        number
      });
    });
    if(pokemonsConverted.length > 0) {
      try {
        const createdPokemon = await this.pokemonModel.insertMany(pokemonsConverted);
        console.log('--Pokemons created---');
        return createdPokemon;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      
    }

    return pokemonsConverted;
  }
}
