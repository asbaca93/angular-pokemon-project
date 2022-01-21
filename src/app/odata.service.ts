import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ODataStore } from './models/odatastore';
import { PokedexPokemon } from './models/pokedexPokemon.model';
import { PokemonTypes } from './models/pokemonTypes.model';

@Injectable({
    providedIn: 'root',
})
export default class DataService {
  PokedexPokemon = new ODataStore<PokedexPokemon>({
    httpClient: this.httpClient,
    endpoint: 'Pokemons',
    key: 'Id',
    keyType: 'Int32',
  });
  PokemonTypes = new ODataStore<PokemonTypes>({
    httpClient: this.httpClient,
    endpoint: 'PokemonTypes',
    key: 'Id',
    keyType: 'Int32',
  })

  constructor(private httpClient: HttpClient) {}
}