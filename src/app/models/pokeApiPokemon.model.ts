export interface Types {
    type: {
      name: string;
    }
  }
  
  export interface Ability {
    ability: {
      name: string;
    }
  }
  
  export interface Stat {
    base_stat: number,
    stat: {
      name: string;
    }
  }
  
  export interface PokeApiPokemon {
    id: number;
    base_experience: number;
    name: string;
    types: Array<Types>;
    weight: number;
    sprites: {
      front_default: string;
    };
    height: number,
    abilities: Array<Ability>;
    stats: Array<Stat>;
  }