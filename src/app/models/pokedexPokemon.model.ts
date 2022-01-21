export interface PokedexPokemon {
    id: number,
    xp: number,
    name: string,
    types: Array<PokedexTypes>,
    weight: number,
    url: string,
}

interface PokedexTypes {
    name: string,
    id: number,
}