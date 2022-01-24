import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, from, map, tap } from 'rxjs';
import DataService from '../odata.service';
import { PokeApiPokemon } from '../models/pokeApiPokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonName = new FormControl('');
  pokeResponse: PokeApiPokemon;
  name: string | null = null;
  pokeType = 'normal';
  constructor(
    private dataService: DataService,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.pokeResponse = {
      name: "",
      id: 0,
      base_experience: 0,
      weight: 0,
      sprites: {
        front_default: ''
      },
      types: [],
      height: 0,
      abilities: [],
      stats: [],
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
      tap(_ => console.log('pokeapi: ', this.pokeResponse)) 
    )
  }

  catchPokemon() {
    const types = this.pokeResponse.types.map(type => {
      return { name: type.type.name, id: 0 };
    });
    const moves = this.pokeResponse.abilities.map(ability => {
      return { name: ability.ability.name, id: 0 };
    });

    return this.dataService.PokedexPokemon.post({
      id: this.pokeResponse.id,
      xp: this.pokeResponse.base_experience,
      name: this.pokeResponse.name,
      types,
      weight: this.pokeResponse.weight,
      url: this.pokeResponse.sprites.front_default,
      moves,
      height: this.pokeResponse.height,
      hp: this.pokeResponse.stats.filter(s => s.stat.name === 'hp')[0].base_stat,
      attack: this.pokeResponse.stats.filter(s => s.stat.name === 'attack')[0].base_stat,
      defense: this.pokeResponse.stats.filter(s => s.stat.name === 'defense')[0].base_stat,
    }).subscribe()
  }
}
