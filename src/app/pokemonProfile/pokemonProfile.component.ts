import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ODataQueryOptions } from '../models/odatastore';
import { PokedexPokemon } from '../models/pokedexPokemon.model';
import DataService from '../odata.service';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemonProfile.component.html',
    styleUrls: ['./pokemonProfile.component.css']
  })
  export class PokemonProfileComponent implements OnInit {
    pokemon: PokedexPokemon;

    constructor(private route: ActivatedRoute, private dataService: DataService) {
      this.pokemon = {
        id: 0,
        xp: 0,
        name: '',
        types: [],
        weight: 0,
        url: '',
        height: 0,
        moves: [],
        hp: 0,
        attack: 0,
        defense: 0
      };
    }

    ngOnInit(): void {
      this.pokemon.id = this.route.snapshot.paramMap.get('id') as unknown as number;
      this.getPokemon()
    }

    getPokemon() {
      const getPokemonOptions: ODataQueryOptions = {
        expand: ['types', 'moves']
      };
      return this.dataService.PokedexPokemon.get(this.pokemon.id, getPokemonOptions).subscribe(payload => this.pokemon = payload);
    }
  }