import { Component, OnInit } from '@angular/core';
import { PokedexPokemon } from '../models/pokedexPokemon.model';
import { PokedexService } from '../pokedex.service';
import DataService from '../odata.service';
import { ODataListResponse, ODataQueryOptions } from '../models/odatastore';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokedex.component.html',
    styleUrls: ['./pokedex.component.css']
  })
  export class PokedexComponent implements OnInit {
    caughtPokemon: Array<PokedexPokemon> = [];
    odataPokemon: ODataListResponse<PokedexPokemon> = {
      value: [],
      count: 0,
    };
    odataSingle?: PokedexPokemon = undefined;
    page: number = 1;

    constructor(private pokedexService: PokedexService, private dataService: DataService, private router: Router) {}

    ngOnInit(): void {
      this.getPokemon();
    }
    onPrevious() {
      this.page = this.page - 1;
      this.getPokemon();
    }

    onNext() {
      console.log(this.caughtPokemon);
      this.page = this.page + 1;
      this.getPokemon();
    }

    getPokemon() {
      const getPokemonOptions: ODataQueryOptions = {
        top: 6,
        skip: (this.page - 1) * 6,
        expand: ['types']
      };
      this.dataService.PokedexPokemon.list(getPokemonOptions).subscribe(pokemonReturned => this.caughtPokemon = pokemonReturned.value);
    }

    onPokemonClick(id: number) {
      this.router.navigateByUrl(`pokedex/${id}`);
    }
  }