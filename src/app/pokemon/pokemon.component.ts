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

enum typeColors {
  normal = 'grey',
  fire = 'red',
  water = 'blue',
  grass = 'green',
  electric = 'yellow',
  ice = 'blue',
  fighting = 'orange',
  poison = 'purple', 
  ground = 'brown',
  flying = 'black',
  psychic = 'purple',
  bug = 'green',
  rock = 'grey',
  ghost = 'black',
  dark = 'black',
  dragon = 'orange',
  steel = 'grey',
  fairy = 'pink'
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonName = new FormControl('');
  pokeResponse: PokeResponse | undefined;
  color = 'white';
  name: string | null = null;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    if (this.name) {
        this.pokemonService.getPokemon(this.name).subscribe(result => { 
          this.pokeResponse = result;
        });
      }
  }

  showPokemon() {
    this.router.navigateByUrl(`pokemon/${this.pokemonName.value}`);
    this.getPokemon().subscribe();
  }

  getPokemon() {
    let isRefreshing = true;
    return this.pokemonService.getPokemon(this.pokemonName.value).pipe(
      filter(result => (result) ? true : false),
      // concatMap(result => this.pokemonService.getPokemonDetails(result.id).pipe(map(result => this.pokeDetailResult = result))),
      map(result => this.pokeResponse = result),
      tap(_ => isRefreshing = false),
      tap(_ => this.color = typeColors['fire'])
    )
  }
}
