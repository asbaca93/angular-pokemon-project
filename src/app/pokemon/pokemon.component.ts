import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { concatMap, filter, map, tap } from 'rxjs';

export interface Types {
  type: {
    name: string;
  }
}

export interface PokeResponse {
  id: string;
  base_experience: number;
  name: string;
  types: Array<Types>;
  weight: number;
  sprites: {
    front_default: string;
  }
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonName = new FormControl('');
  pokeResponse: PokeResponse;
  name: string | null = null;
  pokeType = 'normal';
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.pokeResponse = {
      name: "",
      id: "",
      base_experience: 0,
      weight: 0,
      sprites: {
        front_default: ''
      },
      types: []
    };
   }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    if (this.name) {
        this.getPokemon(this.name).subscribe();
      }
  }

  showPokemon() {
    this.router.navigateByUrl(`pokemon/${this.pokemonName.value}`);
    this.getPokemon(this.pokemonName.value).subscribe();
  }

  getPokemon(name: string) {
    let isRefreshing = true;
    return this.pokemonService.getPokemon(name).pipe(
      filter(result => (result) ? true : false),
      map(result => this.pokeResponse = result),
      tap(_ => this.pokeType = this.pokeResponse.types[0].type.name),
      tap(_ => isRefreshing = false),
    )
  }
}
