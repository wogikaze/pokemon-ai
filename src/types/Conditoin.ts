import { Battle } from "./Battle";
import { ActiveMove } from "./Move";
import { Pokemon } from "./Pokemon";
type AnyObject = { [key: string]: any };

type Effect = Ability | Item | ActiveMove | Condition;
interface EffectData {
  name?: string;
  desc?: string;
  duration?: number;
  durationCallback?: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect | null) => number;
  effectType?: string;
  infiltrates?: boolean;
  isNonstandard?: string;
  shortDesc?: string;
}
type EffectType =
  | "Condition"
  | "Pokemon"
  | "Move"
  | "Item"
  | "Ability"
  | "Format"
  | "Nature"
  | "Ruleset"
  | "Weather"
  | "Status"
  | "Terastal"
  | "Rule"
  | "ValidatorRule";
export class BasicEffect implements EffectData {
  /**
   * string. This will be a lowercase version of the name with all the
   * non-alphanumeric characters removed. So, for instance, "Mr. Mime"
   * becomes "mrmime", and "Basculin-Blue-Striped" becomes
   * "basculinbluestriped".
   */
  id: string;
  /**
   * Name. Currently does not support Unicode letters, so "Flabébé"
   * is "Flabebe" and "Nidoran♀" is "Nidoran-F".
   */
  name: string;
  /**
   * Full name. Prefixes the name with the effect type. For instance,
   * Leftovers would be "item: Leftovers", confusion the status
   * condition would be "confusion", etc.
   */
  fullname: string;
  /** Effect type. */
  effectType: EffectType;
  /**
   * Does it exist? For historical reasons, when you use an accessor
   * for an effect that doesn't exist, you get a dummy effect that
   * doesn't do anything, and this field set to false.
   */
  exists: boolean;
  /**
   * Dex number? For a Pokemon, this is the National Dex number. For
   * other effects, this is often an internal string (e.g. a move
   * number). Not all effects have numbers, this will be 0 if it
   * doesn't. Nonstandard effects (e.g. CAP effects) will have
   * negative numbers.
   */
  num: number;
  /**
   * The generation of Pokemon game this was INTRODUCED (NOT
   * necessarily the current gen being simulated.) Not all effects
   * track generation; this will be 0 if not known.
   */
  gen: number;
  /**
   * A shortened form of the description of this effect.
   * Not all effects have this.
   */
  shortDesc: string;
  /** The full description for this effect. */
  desc: string;
  /**
   * Is this item/move/ability/pokemon nonstandard? Specified for effects
   * that have no use in standard formats: made-up pokemon (CAP),
   * glitches (MissingNo etc), Pokestar pokemon, etc.
   */
  isNonstandard: string;
  /** The duration of the condition - only for pure conditions. */
  duration?: number;
  /** Whether or not the condition is ignored by Baton Pass - only for pure conditions. */

  constructor(data: AnyObject) {
    this.exists = true;
    Object.assign(this, data);

    this.name = "";
    this.id = "";
    this.effectType = "Rule";
    this.num = 0;
    this.gen = 0;
    this.fullname = "";
    this.shortDesc = "";
    this.desc = "";
    this.isNonstandard = "";
    this.duration = 0;
  }

  toString() {
    return this.name;
  }
}

export class Condition extends BasicEffect {
  declare readonly effectType: "Condition" | "Weather" | "Status" | "Terastal";
  declare readonly counterMax?: number;

  declare readonly durationCallback?: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect | null) => number;
  declare readonly onCopy?: (this: Battle, pokemon: Pokemon) => void;
  declare readonly onEnd?: (this: Battle, target: Pokemon) => void;
  declare readonly onRestart?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;
  declare readonly onStart?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;

  constructor(data: AnyObject) {
    super(data);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    data = this;
    this.effectType = ["Weather", "Status"].includes(data["effectType"]) ? data["effectType"] : "Condition";
  }
}
