import { Battle } from "./Battle";
import { Pokemon } from "./Pokemon";

export class Side {
    battle: Battle;
    active: Pokemon[]
    constructor(name: string, battle: Battle) {
        this.battle = new Battle();
        this.active = new Array<Pokemon>();
    }

}
