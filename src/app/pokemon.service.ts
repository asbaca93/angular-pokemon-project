import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PokeResponse } from './pokemon/pokemon.component';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemon(name: string) {
    return this.http.get<PokeResponse>(`${environment.pokeapi}/pokemon/${name}`);
  }
}
