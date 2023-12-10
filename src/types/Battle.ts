export class Battle {
  field: Field;
  constructor() {
    this.field = new Field(this);
  }
  debug(value: string) {}
}
export class Field {
  weather: string;
  constructor(battle: Battle) {
    this.weather = "";
  }
}
