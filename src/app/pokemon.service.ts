import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PokeApiPokemon } from './models/pokeApiPokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemon(name: string) {
    return this.http.get<PokeApiPokemon>(`${environment.pokeapi}/pokemon/${name}`);
  }
}
