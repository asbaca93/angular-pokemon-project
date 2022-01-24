import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonProfileComponent } from './pokemonProfile/pokemonProfile.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'pokemon/:name', component: PokemonComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'pokedex/:id', component: PokemonProfileComponent },
  { path: 'pokedex', component: PokedexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
