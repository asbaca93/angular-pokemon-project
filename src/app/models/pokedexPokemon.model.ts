export interface PokedexPokemon {
    id: number,
    xp: number,
    name: string,
    types: Array<PokedexTypes>,
    weight: number,
    url: string,
    height: number,
    hp: number,
    attack: number,
    defense: number,
    moves: Array<PokedexMoves>,
}

interface PokedexTypes {
    name: string,
    id: number,
}

interface PokedexMoves {
    name: string,
    id: number,
}