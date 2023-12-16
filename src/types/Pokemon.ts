export class Pokemon {
  name: string;
  type: string[];
  item: string;

  boosts: { [boost in BoostID]: number };
  fainted: boolean;
  constructor() {
    this.name = "";
    this.type = [];
    this.item = "";
    this.fainted = false
    this.boosts = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0 };
  }
  hasType(types: string[] | string) {
    return this.type.some((e) => types.includes(e));
  }
  isAlly(pokemon: Pokemon | null) {
    // return !!pokemon && (this.side === pokemon.side || this.side.allySide === pokemon.side);
    return true;
  }
  hasItem(item: string) {
    return this.item === item;
  }
  clearBoosts() {
    let boostName: BoostID;
    for (boostName in this.boosts) {
      this.boosts[boostName] = 0;
    }
  }
}

type BoostID = StatIDExceptHP | 'accuracy' | 'evasion';
type StatIDExceptHP = 'atk' | 'def' | 'spa' | 'spd' | 'spe';