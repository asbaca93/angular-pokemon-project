import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonProfileComponent } from './pokemonProfile/pokemonProfile.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokedexComponent,
    PokemonProfileComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
