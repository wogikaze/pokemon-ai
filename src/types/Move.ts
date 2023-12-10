import { Battle } from "./Battle";
import { Pokemon } from "./Pokemon";

export interface MoveData extends MoveEventMethods {
  num: number;
  accuracy: number | boolean;
  basePower: number;
  category: string;
  isNonstandard?: string;
  name: string;
  pp: number;
  priority: number;
  flags: {};
  boosts?: { [k: string]: number };
  drain?: number[];
  isZ?: string;
  critRatio?: number;
  secondary?: string | null | {};
  target?: string;
  type?: string;
  zMove?: {};

  contestType?: string;
}
type MutableMove = BasicEffect & MoveData;
type RuinableMove = { [k in `ruined${"Atk" | "Def" | "SpA" | "SpD"}`]?: Pokemon };
export interface ActiveMove extends MutableMove, RuinableMove {
  readonly name: string;
  readonly effectType: "Move";
  readonly id: string;
  num: number;
  weather?: string;
  status?: string;
  hit: number;
  moveHitData?: MoveHitData;
  ability?: Ability;
  allies?: Pokemon[];
  auraBooster?: Pokemon;
  causedCrashDamage?: boolean;
  forceStatus?: string;
  hasAuraBreak?: boolean;
  hasBounced?: boolean;
  hasSheerForce?: boolean;
  /** Is the move called by Dancer? Used to prevent infinite Dancer recursion. */
  isExternal?: boolean;
  lastHit?: boolean;
  magnitude?: number;
  negateSecondary?: boolean;
  pranksterBoosted?: boolean;
  selfDropped?: boolean;
  selfSwitch?: "copyvolatile" | "shedtail" | boolean;
  spreadHit?: boolean;
  stab?: number;
  statusRoll?: string;
  totalDamage?: number | false;
  typeChangerBoosted?: Effect;
  willChangeForme?: boolean;
  infiltrates?: boolean;

  /**
   * Has this move been boosted by a Z-crystal or used by a Dynamax Pokemon? Usually the same as
   * `isZ` or `isMax`, but hacked moves will have this be `false` and `isZ` / `isMax` be truthy.
   */
  isZOrMaxPowered?: boolean;
}
export interface MoveEventMethods {
  basePowerCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => number | false | null;
  /** Return true to stop the move from being used */
  beforeMoveCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon | null, move: ActiveMove) => boolean | void;
  beforeTurnCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon) => void;
  damageCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon) => number | false;
  priorityChargeCallback?: (this: Battle, pokemon: Pokemon) => void;

  onDisableMove?: (this: Battle, pokemon: Pokemon) => void;

  onAfterHit?: CommonHandlers["VoidSourceMove"];
  onAfterSubDamage?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  onAfterMoveSecondarySelf?: CommonHandlers["VoidSourceMove"];
  onAfterMoveSecondary?: CommonHandlers["VoidMove"];
  onAfterMove?: CommonHandlers["VoidSourceMove"];
  onDamagePriority?: number;
  onDamage?: (
    this: Battle,
    damage: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | null | void;

  /* Invoked by the global BasePower event (onEffect = true) */
  onBasePower?: CommonHandlers["ModifierSourceMove"];

  onEffectiveness?: (
    this: Battle,
    typeMod: number,
    target: Pokemon | null,
    type: string,
    move: ActiveMove
  ) => number | void;
  onHit?: CommonHandlers["ResultMove"];
  onHitField?: CommonHandlers["ResultMove"];
  onHitSide?: (this: Battle, side: Side, source: Pokemon, move: ActiveMove) => boolean | null | "" | void;
  onModifyMove?: (this: Battle, move: ActiveMove, pokemon: Pokemon, target: Pokemon | null) => void;
  onModifyPriority?: CommonHandlers["ModifierSourceMove"];
  onMoveFail?: CommonHandlers["VoidMove"];
  onModifyType?: (this: Battle, move: ActiveMove, pokemon: Pokemon, target: Pokemon) => void;
  onModifyTarget?: (
    this: Battle,
    relayVar: { target: Pokemon },
    pokemon: Pokemon,
    target: Pokemon,
    move: ActiveMove
  ) => void;
  onPrepareHit?: CommonHandlers["ResultMove"];
  onTry?: CommonHandlers["ResultSourceMove"];
  onTryHit?: CommonHandlers["ExtResultSourceMove"];
  onTryHitField?: CommonHandlers["ResultMove"];
  onTryHitSide?: (this: Battle, side: Side, source: Pokemon, move: ActiveMove) => boolean | null | "" | void;
  onTryImmunity?: CommonHandlers["ResultMove"];
  onTryMove?: CommonHandlers["ResultSourceMove"];
  onUseMoveMessage?: CommonHandlers["VoidSourceMove"];
}
