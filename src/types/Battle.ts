import { Field } from "./Field";
import { Pokemon } from "./Pokemon";

export class Battle {
  field: Field;
  constructor() {
    this.field = new Field(this);
  }
  debug(value: string) {}
  add(method: string, side: string | Pokemon | any, value: string) {}
  
}

export interface EffectState {
  // TODO: set this to be an actual number after converting data/ to .ts
  duration?: number | any;
  [k: string]: any;
}