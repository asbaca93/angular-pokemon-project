import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'pokemon/:name', component: PokemonComponent },
  { path: 'pokemon', component: PokemonComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
