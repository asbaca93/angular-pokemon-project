import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonName = new FormControl('');
  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }

  showPokemon() {
    this.pokemonService.getPokemon(this.pokemonName.value)
  }
}
