import { Field } from "./Field";
import { Pokemon } from "./Pokemon";
import { Side } from "./Sides";

export class Battle {
  field: Field;
  sides: [Side, Side]
  constructor() {
    this.field = new Field(this);
    this.sides = Array(2).fill(null) as any;
  }
  debug(value: string) { }
  add(method: string, side?: string | Pokemon | any, value?: string, other?: string) { }

  getAllActive() {
    const pokemonList: Pokemon[] = [];
    for (const side of this.sides) {
      for (const pokemon of side.active) {
        if (pokemon && !pokemon.fainted) {
          pokemonList.push(pokemon);
        }
      }
    }
    return pokemonList;
  }
}

export interface EffectState {
  // TODO: set this to be an actual number after converting data/ to .ts
  duration?: number | any;
  [k: string]: any;
}
