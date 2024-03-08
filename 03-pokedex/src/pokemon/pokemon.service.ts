import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) 
    private pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ number: term });
    }

    // Check if term is a valid ObjectId
    if( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Check if term is a name
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    // Check if term is a Pokemon in the db
    if (!pokemon) {
      throw new Error('Pokemon not found');
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      const updatedPokemon = await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });
      return { message: "Pokemon updated", updatedPokemon };
    } catch (error) {
      this.handleError(error);      
    }
    
    
  }

  async remove(term: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: term });
    if( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon with id ${term} not found`);
    }
    return { message: "Pokemon deleted"}; 
  }

  private handleError(error: any) {
    if (error.code === 11000) {
      return "Pokemon already exists";
    }
    console.log(error);
    throw new Error("Internal Server Error");
  }
}
