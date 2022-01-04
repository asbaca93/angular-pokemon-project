import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(name: string) {
    return this.http.get<any>(`${environment.pokeapi}/pokemon/${name}`).subscribe(result => console.log(result));
  }
}
