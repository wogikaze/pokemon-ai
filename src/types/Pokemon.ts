export class Pokemon {
  name: string;
  type: string[];
  item: string;
  constructor() {
    this.name = "";
    this.type = [];
    this.item = "";
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
}
