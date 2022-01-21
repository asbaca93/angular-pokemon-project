import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PokedexPokemon } from "./models/pokedexPokemon.model";
import { PokemonQueryParameters } from "./models/pokemonQueryParameters.model";

@Injectable({
    providedIn: 'root'
})
export class PokedexService {
    constructor(private http: HttpClient) { }

    // TODO make stronger type 
    postPokemon(payload: PokedexPokemon) {
        return this.http.post<any>(`${environment.weatherApi}/api/Pokemon`, payload);
    }

    getPokemon(pokemonQueryParameters?: PokemonQueryParameters) {
        return this.http.get<any>(`${environment.weatherApi}/api/Pokemon?page=${pokemonQueryParameters?.page ? pokemonQueryParameters.page : ''}&take=${pokemonQueryParameters?.take ? pokemonQueryParameters.take : ''}`)
    }
}