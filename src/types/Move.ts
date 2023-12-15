import { Battle } from "./Battle";
import { Condition } from "./Conditoin";
import { Field } from "./Field";
import { Pokemon } from "./Pokemon";

// 適当
type Side = string;
export interface SecondaryEffect extends HitEffect {
  chance?: number;
  /** Used to flag a secondary effect as added by Poison Touch */
  ability?: Ability;
  /**
   * Applies to Sparkling Aria's secondary effect: Affected by
   * Sheer Force but not Shield Dust.
   */
  dustproof?: boolean;
  /**
   * Gen 2 specific mechanics: Bypasses Substitute only on Twineedle,
   * and allows it to flinch sleeping/frozen targets
   */
  kingsrock?: boolean;
  self?: HitEffect;
}
export interface EventMethods {
  onDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  onEmergencyExit?: (this: Battle, pokemon: Pokemon) => void;
  onAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAfterHit?: MoveEventMethods["onAfterHit"];
  onAfterMega?: (this: Battle, pokemon: Pokemon) => void;
  onAfterSetStatus?: (this: Battle, status: Condition, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAfterSubDamage?: MoveEventMethods["onAfterSubDamage"];
  onAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
  onAfterTerastallization?: (this: Battle, pokemon: Pokemon) => void;
  onAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onAfterTakeItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAfterFaint?: (this: Battle, length: number, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAfterMoveSecondarySelf?: MoveEventMethods["onAfterMoveSecondarySelf"];
  onAfterMoveSecondary?: MoveEventMethods["onAfterMoveSecondary"];
  onAfterMove?: MoveEventMethods["onAfterMove"];
  onAfterMoveSelf?: CommonHandlers["VoidSourceMove"];
  onAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
  onAccuracy?: (
    this: Battle,
    accuracy: number,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => number | boolean | null | void;
  onBasePower?: CommonHandlers["ModifierSourceMove"];
  onBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
  onBeforeMove?: CommonHandlers["VoidSourceMove"];
  onBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onBeforeTurn?: (this: Battle, pokemon: Pokemon) => void;
  onChangeBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onChargeMove?: CommonHandlers["VoidSourceMove"];
  onCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
  onDamage?: (
    this: Battle,
    damage: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | null | void;
  onDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
  onDisableMove?: (this: Battle, pokemon: Pokemon) => void;
  onDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
  onEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onEffectiveness?: MoveEventMethods["onEffectiveness"];
  onEntryHazard?: (this: Battle, pokemon: Pokemon) => void;
  onFaint?: CommonHandlers["VoidEffect"];
  onFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
  onFractionalPriority?: CommonHandlers["ModifierSourceMove"] | -0.1;
  onHit?: MoveEventMethods["onHit"];
  onImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
  onLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
  onMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onModifyAccuracy?: CommonHandlers["ModifierMove"];
  onModifyAtk?: CommonHandlers["ModifierSourceMove"];
  onModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
  onModifyCritRatio?: CommonHandlers["ModifierSourceMove"];
  onModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onModifyDef?: CommonHandlers["ModifierMove"];
  onModifyMove?: MoveEventMethods["onModifyMove"];
  onModifyPriority?: CommonHandlers["ModifierSourceMove"];
  onModifySecondaries?: (
    this: Battle,
    secondaries: SecondaryEffect[],
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => void;
  onModifyType?: MoveEventMethods["onModifyType"];
  onModifyTarget?: MoveEventMethods["onModifyTarget"];
  onModifySpA?: CommonHandlers["ModifierSourceMove"];
  onModifySpD?: CommonHandlers["ModifierMove"];
  onModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
  onModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
  onMoveAborted?: CommonHandlers["VoidMove"];
  onNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
  onOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
  onPrepareHit?: CommonHandlers["ResultSourceMove"];
  onRedirectTarget?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    source2: Effect,
    move: ActiveMove
  ) => Pokemon | void;
  onResidual?: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onSetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => null | void;
  onSetStatus?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | null | void;
  onSetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: Condition) => boolean | void;
  onStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
  onSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onSwap?: (this: Battle, target: Pokemon, source: Pokemon) => void;
  onTakeItem?:
    | ((this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void)
    | boolean;
  onWeatherChange?: (this: Battle, target: Pokemon, source: Pokemon, sourceEffect: Effect) => void;
  onTerrainChange?: (this: Battle, target: Pokemon, source: Pokemon, sourceEffect: Effect) => void;
  onTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onTryAddVolatile?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;
  onTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
  onTryHeal?: (
    this: Battle,
    relayVar: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | void;
  onTryHit?: MoveEventMethods["onTryHit"];
  onTryHitField?: MoveEventMethods["onTryHitField"];
  onTryHitSide?: CommonHandlers["ResultMove"];
  onInvulnerability?: CommonHandlers["ExtResultMove"];
  onTryMove?: MoveEventMethods["onTryMove"];
  onTryPrimaryHit?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => boolean | null | number | void;
  onType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
  onUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onUpdate?: (this: Battle, pokemon: Pokemon) => void;
  onWeather?: (this: Battle, target: Pokemon, source: null, effect: Condition) => void;
  onWeatherModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onModifyDamagePhase1?: CommonHandlers["ModifierSourceMove"];
  onModifyDamagePhase2?: CommonHandlers["ModifierSourceMove"];
  onFoeDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  onFoeAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
  onFoeAfterHit?: MoveEventMethods["onAfterHit"];
  onFoeAfterSetStatus?: (this: Battle, status: Condition, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onFoeAfterSubDamage?: MoveEventMethods["onAfterSubDamage"];
  onFoeAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
  onFoeAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onFoeAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onFoeAfterFaint?: (this: Battle, length: number, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onFoeAfterMoveSecondarySelf?: MoveEventMethods["onAfterMoveSecondarySelf"];
  onFoeAfterMoveSecondary?: MoveEventMethods["onAfterMoveSecondary"];
  onFoeAfterMove?: MoveEventMethods["onAfterMove"];
  onFoeAfterMoveSelf?: CommonHandlers["VoidSourceMove"];
  onFoeAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
  onFoeAccuracy?: (
    this: Battle,
    accuracy: number,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => number | boolean | null | void;
  onFoeBasePower?: CommonHandlers["ModifierSourceMove"];
  onFoeBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
  onFoeBeforeMove?: CommonHandlers["VoidSourceMove"];
  onFoeBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onFoeBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onFoeTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onFoeChargeMove?: CommonHandlers["VoidSourceMove"];
  onFoeCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
  onFoeDamage?: (
    this: Battle,
    damage: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | null | void;
  onFoeDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
  onFoeDisableMove?: (this: Battle, pokemon: Pokemon) => void;
  onFoeDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
  onFoeEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onFoeEffectiveness?: MoveEventMethods["onEffectiveness"];
  onFoeFaint?: CommonHandlers["VoidEffect"];
  onFoeFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
  onFoeHit?: MoveEventMethods["onHit"];
  onFoeImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
  onFoeLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
  onFoeMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon, source?: Pokemon) => void;
  onFoeModifyAccuracy?: CommonHandlers["ModifierMove"];
  onFoeModifyAtk?: CommonHandlers["ModifierSourceMove"];
  onFoeModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
  onFoeModifyCritRatio?: CommonHandlers["ModifierSourceMove"];
  onFoeModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onFoeModifyDef?: CommonHandlers["ModifierMove"];
  onFoeModifyMove?: MoveEventMethods["onModifyMove"];
  onFoeModifyPriority?: CommonHandlers["ModifierSourceMove"];
  onFoeModifySecondaries?: (
    this: Battle,
    secondaries: SecondaryEffect[],
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => void;
  onFoeModifySpA?: CommonHandlers["ModifierSourceMove"];
  onFoeModifySpD?: CommonHandlers["ModifierMove"];
  onFoeModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
  onFoeModifyType?: MoveEventMethods["onModifyType"];
  onFoeModifyTarget?: MoveEventMethods["onModifyTarget"];
  onFoeModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
  onFoeMoveAborted?: CommonHandlers["VoidMove"];
  onFoeNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
  onFoeOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
  onFoePrepareHit?: CommonHandlers["ResultSourceMove"];
  onFoeRedirectTarget?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    source2: Effect,
    move: ActiveMove
  ) => Pokemon | void;
  onFoeResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
  onFoeSetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => boolean | void;
  onFoeSetStatus?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | null | void;
  onFoeSetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: Condition) => boolean | void;
  onFoeStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
  onFoeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onFoeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onFoeTakeItem?:
    | ((this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void)
    | boolean;
  onFoeTerrain?: (this: Battle, pokemon: Pokemon) => void;
  onFoeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onFoeTryAddVolatile?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;
  onFoeTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
  /* FIXME: onFoeTryHeal() is run with two different sets of arguments */
  onFoeTryHeal?:
    | ((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void)
    | ((this: Battle, pokemon: Pokemon) => boolean | void)
    | boolean;
  onFoeTryHit?: MoveEventMethods["onTryHit"];
  onFoeTryHitField?: MoveEventMethods["onTryHitField"];
  onFoeTryHitSide?: CommonHandlers["ResultMove"];
  onFoeInvulnerability?: CommonHandlers["ExtResultMove"];
  onFoeTryMove?: MoveEventMethods["onTryMove"];
  onFoeTryPrimaryHit?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => boolean | null | number | void;
  onFoeType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
  onFoeWeatherModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onFoeModifyDamagePhase1?: CommonHandlers["ModifierSourceMove"];
  onFoeModifyDamagePhase2?: CommonHandlers["ModifierSourceMove"];
  onSourceDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  onSourceAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
  onSourceAfterHit?: MoveEventMethods["onAfterHit"];
  onSourceAfterSetStatus?: (this: Battle, status: Condition, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onSourceAfterSubDamage?: MoveEventMethods["onAfterSubDamage"];
  onSourceAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
  onSourceAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onSourceAfterBoost?: (
    this: Battle,
    boost: SparseBoostsTable,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => void;
  onSourceAfterFaint?: (this: Battle, length: number, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onSourceAfterMoveSecondarySelf?: MoveEventMethods["onAfterMoveSecondarySelf"];
  onSourceAfterMoveSecondary?: MoveEventMethods["onAfterMoveSecondary"];
  onSourceAfterMove?: MoveEventMethods["onAfterMove"];
  onSourceAfterMoveSelf?: CommonHandlers["VoidSourceMove"];
  onSourceAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
  onSourceAccuracy?: (
    this: Battle,
    accuracy: number,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => number | boolean | null | void;
  onSourceBasePower?: CommonHandlers["ModifierSourceMove"];
  onSourceBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
  onSourceBeforeMove?: CommonHandlers["VoidSourceMove"];
  onSourceBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onSourceBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onSourceTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onSourceChargeMove?: CommonHandlers["VoidSourceMove"];
  onSourceCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
  onSourceDamage?: (
    this: Battle,
    damage: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | null | void;
  onSourceDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
  onSourceDisableMove?: (this: Battle, pokemon: Pokemon) => void;
  onSourceDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
  onSourceEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onSourceEffectiveness?: MoveEventMethods["onEffectiveness"];
  onSourceFaint?: CommonHandlers["VoidEffect"];
  onSourceFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
  onSourceHit?: MoveEventMethods["onHit"];
  onSourceImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
  onSourceLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
  onSourceMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onSourceModifyAccuracy?: CommonHandlers["ModifierMove"];
  onSourceModifyAtk?: CommonHandlers["ModifierSourceMove"];
  onSourceModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
  onSourceModifyCritRatio?: CommonHandlers["ModifierSourceMove"];
  onSourceModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onSourceModifyDef?: CommonHandlers["ModifierMove"];
  onSourceModifyMove?: MoveEventMethods["onModifyMove"];
  onSourceModifyPriority?: CommonHandlers["ModifierSourceMove"];
  onSourceModifySecondaries?: (
    this: Battle,
    secondaries: SecondaryEffect[],
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => void;
  onSourceModifySpA?: CommonHandlers["ModifierSourceMove"];
  onSourceModifySpD?: CommonHandlers["ModifierMove"];
  onSourceModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
  onSourceModifyType?: MoveEventMethods["onModifyType"];
  onSourceModifyTarget?: MoveEventMethods["onModifyTarget"];
  onSourceModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
  onSourceMoveAborted?: CommonHandlers["VoidMove"];
  onSourceNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
  onSourceOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
  onSourcePrepareHit?: CommonHandlers["ResultSourceMove"];
  onSourceRedirectTarget?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    source2: Effect,
    move: ActiveMove
  ) => Pokemon | void;
  onSourceResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
  onSourceSetAbility?: (
    this: Battle,
    ability: string,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | void;
  onSourceSetStatus?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | null | void;
  onSourceSetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: Condition) => boolean | void;
  onSourceStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
  onSourceSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onSourceSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onSourceTakeItem?:
    | ((this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void)
    | boolean;
  onSourceTerrain?: (this: Battle, pokemon: Pokemon) => void;
  onSourceTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onSourceTryAddVolatile?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;
  onSourceTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
  /* FIXME: onSourceTryHeal() is run with two different sets of arguments */
  onSourceTryHeal?:
    | ((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void)
    | ((this: Battle, pokemon: Pokemon) => boolean | void)
    | boolean;
  onSourceTryHit?: MoveEventMethods["onTryHit"];
  onSourceTryHitField?: MoveEventMethods["onTryHitField"];
  onSourceTryHitSide?: CommonHandlers["ResultMove"];
  onSourceInvulnerability?: CommonHandlers["ExtResultMove"];
  onSourceTryMove?: MoveEventMethods["onTryMove"];
  onSourceTryPrimaryHit?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => boolean | null | number | void;
  onSourceType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
  onSourceWeatherModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onSourceModifyDamagePhase1?: CommonHandlers["ModifierSourceMove"];
  onSourceModifyDamagePhase2?: CommonHandlers["ModifierSourceMove"];
  onAnyDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  onAnyAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
  onAnyAfterHit?: MoveEventMethods["onAfterHit"];
  onAnyAfterSetStatus?: (this: Battle, status: Condition, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAnyAfterSubDamage?: MoveEventMethods["onAfterSubDamage"];
  onAnyAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
  onAnyAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onAnyAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAnyAfterFaint?: (this: Battle, length: number, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAnyAfterMoveSecondarySelf?: MoveEventMethods["onAfterMoveSecondarySelf"];
  onAnyAfterMoveSecondary?: MoveEventMethods["onAfterMoveSecondary"];
  onAnyAfterMove?: MoveEventMethods["onAfterMove"];
  onAnyAfterMoveSelf?: CommonHandlers["VoidSourceMove"];
  onAnyAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
  onAnyAccuracy?: (
    this: Battle,
    accuracy: number,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => number | boolean | null | void;
  onAnyBasePower?: CommonHandlers["ModifierSourceMove"];
  onAnyBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
  onAnyBeforeMove?: CommonHandlers["VoidSourceMove"];
  onAnyBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onAnyBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onAnyTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAnyChargeMove?: CommonHandlers["VoidSourceMove"];
  onAnyCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
  onAnyDamage?: (
    this: Battle,
    damage: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | null | void;
  onAnyDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
  onAnyDisableMove?: (this: Battle, pokemon: Pokemon) => void;
  onAnyDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
  onAnyEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onAnyEffectiveness?: MoveEventMethods["onEffectiveness"];
  onAnyFaint?: CommonHandlers["VoidEffect"];
  onAnyFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
  onAnyHit?: MoveEventMethods["onHit"];
  onAnyImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
  onAnyLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
  onAnyMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onAnyModifyAccuracy?: CommonHandlers["ModifierMove"];
  onAnyModifyAtk?: CommonHandlers["ModifierSourceMove"];
  onAnyModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
  onAnyModifyCritRatio?: CommonHandlers["ModifierSourceMove"];
  onAnyModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onAnyModifyDef?: CommonHandlers["ModifierMove"];
  onAnyModifyMove?: MoveEventMethods["onModifyMove"];
  onAnyModifyPriority?: CommonHandlers["ModifierSourceMove"];
  onAnyModifySecondaries?: (
    this: Battle,
    secondaries: SecondaryEffect[],
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => void;
  onAnyModifySpA?: CommonHandlers["ModifierSourceMove"];
  onAnyModifySpD?: CommonHandlers["ModifierMove"];
  onAnyModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
  onAnyModifyType?: MoveEventMethods["onModifyType"];
  onAnyModifyTarget?: MoveEventMethods["onModifyTarget"];
  onAnyModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
  onAnyMoveAborted?: CommonHandlers["VoidMove"];
  onAnyNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
  onAnyOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
  onAnyPrepareHit?: CommonHandlers["ResultSourceMove"];
  onAnyPseudoWeatherChange?: (this: Battle, target: Pokemon, source: Pokemon, pseudoWeather: Condition) => void;
  onAnyRedirectTarget?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    source2: Effect,
    move: ActiveMove
  ) => Pokemon | void;
  onAnyResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
  onAnySetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => boolean | void;
  onAnySetStatus?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | null | void;
  onAnySetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: Condition) => boolean | void;
  onAnyStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
  onAnySwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onAnySwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onAnyTakeItem?:
    | ((this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void)
    | boolean;
  onAnyTerrain?: (this: Battle, pokemon: Pokemon) => void;
  onAnyTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onAnyTryAddVolatile?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;
  onAnyTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
  /* FIXME: onAnyTryHeal() is run with two different sets of arguments */
  onAnyTryHeal?:
    | ((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void)
    | ((this: Battle, pokemon: Pokemon) => boolean | void)
    | boolean;
  onAnyTryHit?: MoveEventMethods["onTryHit"];
  onAnyTryHitField?: MoveEventMethods["onTryHitField"];
  onAnyTryHitSide?: CommonHandlers["ResultMove"];
  onAnyInvulnerability?: CommonHandlers["ExtResultMove"];
  onAnyTryMove?: MoveEventMethods["onTryMove"];
  onAnyTryPrimaryHit?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => boolean | null | number | void;
  onAnyType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
  onAnyWeatherModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onAnyModifyDamagePhase1?: CommonHandlers["ModifierSourceMove"];
  onAnyModifyDamagePhase2?: CommonHandlers["ModifierSourceMove"];

  // Priorities (incomplete list)
  onAccuracyPriority?: number;
  onDamagingHitOrder?: number;
  onAfterMoveSecondaryPriority?: number;
  onAfterMoveSecondarySelfPriority?: number;
  onAfterMoveSelfPriority?: number;
  onAfterSetStatusPriority?: number;
  onAnyBasePowerPriority?: number;
  onAnyInvulnerabilityPriority?: number;
  onAnyModifyAccuracyPriority?: number;
  onAnyFaintPriority?: number;
  onAnyPrepareHitPriority?: number;
  onAllyBasePowerPriority?: number;
  onAllyModifyAtkPriority?: number;
  onAllyModifySpAPriority?: number;
  onAllyModifySpDPriority?: number;
  onAttractPriority?: number;
  onBasePowerPriority?: number;
  onBeforeMovePriority?: number;
  onBeforeSwitchOutPriority?: number;
  onChangeBoostPriority?: number;
  onDamagePriority?: number;
  onDragOutPriority?: number;
  onEffectivenessPriority?: number;
  onFoeBasePowerPriority?: number;
  onFoeBeforeMovePriority?: number;
  onFoeModifyDefPriority?: number;
  onFoeModifySpDPriority?: number;
  onFoeRedirectTargetPriority?: number;
  onFoeTrapPokemonPriority?: number;
  onFractionalPriorityPriority?: number;
  onHitPriority?: number;
  onInvulnerabilityPriority?: number;
  onModifyAccuracyPriority?: number;
  onModifyAtkPriority?: number;
  onModifyCritRatioPriority?: number;
  onModifyDefPriority?: number;
  onModifyMovePriority?: number;
  onModifyPriorityPriority?: number;
  onModifySpAPriority?: number;
  onModifySpDPriority?: number;
  onModifySpePriority?: number;
  onModifyTypePriority?: number;
  onModifyWeightPriority?: number;
  onRedirectTargetPriority?: number;
  onResidualOrder?: number;
  onResidualPriority?: number;
  onResidualSubOrder?: number;
  onSourceBasePowerPriority?: number;
  onSourceInvulnerabilityPriority?: number;
  onSourceModifyAccuracyPriority?: number;
  onSourceModifyAtkPriority?: number;
  onSourceModifyDamagePriority?: number;
  onSourceModifySpAPriority?: number;
  onSwitchInPriority?: number;
  onTrapPokemonPriority?: number;
  onTryEatItemPriority?: number;
  onTryHealPriority?: number;
  onTryHitPriority?: number;
  onTryMovePriority?: number;
  onTryPrimaryHitPriority?: number;
  onTypePriority?: number;
}

export interface PokemonEventMethods extends EventMethods {
  onAllyDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  onAllyAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
  onAllyAfterHit?: MoveEventMethods["onAfterHit"];
  onAllyAfterSetStatus?: (this: Battle, status: Condition, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAllyAfterSubDamage?: MoveEventMethods["onAfterSubDamage"];
  onAllyAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
  onAllyAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onAllyAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAllyAfterFaint?: (this: Battle, length: number, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAllyAfterMoveSecondarySelf?: MoveEventMethods["onAfterMoveSecondarySelf"];
  onAllyAfterMoveSecondary?: MoveEventMethods["onAfterMoveSecondary"];
  onAllyAfterMove?: MoveEventMethods["onAfterMove"];
  onAllyAfterMoveSelf?: CommonHandlers["VoidSourceMove"];
  onAllyAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
  onAllyAccuracy?: (
    this: Battle,
    accuracy: number,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => number | boolean | null | void;
  onAllyBasePower?: CommonHandlers["ModifierSourceMove"];
  onAllyBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
  onAllyBeforeMove?: CommonHandlers["VoidSourceMove"];
  onAllyBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onAllyBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onAllyTryBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
  onAllyChargeMove?: CommonHandlers["VoidSourceMove"];
  onAllyCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
  onAllyDamage?: (
    this: Battle,
    damage: number,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => number | boolean | null | void;
  onAllyDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
  onAllyDisableMove?: (this: Battle, pokemon: Pokemon) => void;
  onAllyDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
  onAllyEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
  onAllyEffectiveness?: MoveEventMethods["onEffectiveness"];
  onAllyFaint?: CommonHandlers["VoidEffect"];
  onAllyFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
  onAllyHit?: MoveEventMethods["onHit"];
  onAllyImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
  onAllyLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
  onAllyMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onAllyModifyAccuracy?: CommonHandlers["ModifierMove"];
  onAllyModifyAtk?: CommonHandlers["ModifierSourceMove"];
  onAllyModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
  onAllyModifyCritRatio?: CommonHandlers["ModifierSourceMove"];
  onAllyModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onAllyModifyDef?: CommonHandlers["ModifierMove"];
  onAllyModifyMove?: MoveEventMethods["onModifyMove"];
  onAllyModifyPriority?: CommonHandlers["ModifierSourceMove"];
  onAllyModifySecondaries?: (
    this: Battle,
    secondaries: SecondaryEffect[],
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => void;
  onAllyModifySpA?: CommonHandlers["ModifierSourceMove"];
  onAllyModifySpD?: CommonHandlers["ModifierMove"];
  onAllyModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
  onAllyModifyType?: MoveEventMethods["onModifyType"];
  onAllyModifyTarget?: MoveEventMethods["onModifyTarget"];
  onAllyModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
  onAllyMoveAborted?: CommonHandlers["VoidMove"];
  onAllyNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
  onAllyOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
  onAllyPrepareHit?: CommonHandlers["ResultSourceMove"];
  onAllyRedirectTarget?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    source2: Effect,
    move: ActiveMove
  ) => Pokemon | void;
  onAllyResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
  onAllySetAbility?: (
    this: Battle,
    ability: string,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | void;
  onAllySetStatus?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    effect: Effect
  ) => boolean | null | void;
  onAllySetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: Condition) => boolean | void;
  onAllySideConditionStart?: (this: Battle, target: Pokemon, source: Pokemon, sideCondition: Condition) => void;
  onAllyStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
  onAllySwitchIn?: (this: Battle, pokemon: Pokemon) => void;
  onAllySwitchOut?: (this: Battle, pokemon: Pokemon) => void;
  onAllyTakeItem?:
    | ((this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void)
    | boolean;
  onAllyTerrain?: (this: Battle, pokemon: Pokemon) => void;
  onAllyTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
  onAllyTryAddVolatile?: (
    this: Battle,
    status: Condition,
    target: Pokemon,
    source: Pokemon,
    sourceEffect: Effect
  ) => boolean | null | void;
  onAllyTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
  /* FIXME: onAllyTryHeal() is run with two different sets of arguments */
  onAllyTryHeal?:
    | ((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void)
    | ((this: Battle, pokemon: Pokemon) => boolean | void)
    | boolean;
  onAllyTryHit?: MoveEventMethods["onTryHit"];
  onAllyTryHitField?: MoveEventMethods["onTryHitField"];
  onAllyTryHitSide?: CommonHandlers["ResultMove"];
  onAllyInvulnerability?: CommonHandlers["ExtResultMove"];
  onAllyTryMove?: MoveEventMethods["onTryMove"];
  onAllyTryPrimaryHit?: (
    this: Battle,
    target: Pokemon,
    source: Pokemon,
    move: ActiveMove
  ) => boolean | null | number | void;
  onAllyType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
  onAllyWeatherModifyDamage?: CommonHandlers["ModifierSourceMove"];
  onAllyModifyDamagePhase1?: CommonHandlers["ModifierSourceMove"];
  onAllyModifyDamagePhase2?: CommonHandlers["ModifierSourceMove"];
}

interface EffectData {
  name?: string;
  desc?: string;
  duration?: number;
  durationCallback?: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect | null) => number;
  effectType?: string;
  infiltrates?: boolean;
  isNonstandard?: string | null;
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
export interface PokemonConditionData extends Partial<Condition>, PokemonEventMethods {}
export interface SideEventMethods extends EventMethods {
  onSideStart?: (this: Battle, target: Side, source: Pokemon, sourceEffect: Effect) => void;
  onSideRestart?: (this: Battle, target: Side, source: Pokemon, sourceEffect: Effect) => void;
  onSideResidual?: (this: Battle, target: Side, source: Pokemon, effect: Effect) => void;
  onSideEnd?: (this: Battle, target: Side) => void;
  onSideResidualOrder?: number;
  onSideResidualPriority?: number;
  onSideResidualSubOrder?: number;
}
export interface SideConditionData
  extends Partial<Omit<Condition, "onStart" | "onRestart" | "onEnd">>,
    SideEventMethods {}
export interface FieldEventMethods extends EventMethods {
  onFieldStart?: (this: Battle, target: Field, source: Pokemon, sourceEffect: Effect) => void;
  onFieldRestart?: (this: Battle, target: Field, source: Pokemon, sourceEffect: Effect) => void;
  onFieldResidual?: (this: Battle, target: Field, source: Pokemon, effect: Effect) => void;
  onFieldEnd?: (this: Battle, target: Field) => void;
  onFieldResidualOrder?: number;
  onFieldResidualPriority?: number;
  onFieldResidualSubOrder?: number;
}
export interface FieldConditionData
  extends Partial<Omit<Condition, "onStart" | "onRestart" | "onEnd">>,
    FieldEventMethods {}
export type ConditionData = PokemonConditionData | SideConditionData | FieldConditionData;
interface BasicEffect extends EffectData {
  id: number;
  effectType: EffectType;
  exists: boolean;
  fullname: string;
  gen: number;
  sourceEffect: string;
  toString: () => string;
}

interface MoveFlags {
  allyanim?: 1; // The move plays its animation when used on an ally.
  bypasssub?: 1; // Ignores a target's substitute.
  bite?: 1; // Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
  bullet?: 1; // Has no effect on Pokemon with the Ability Bulletproof.
  cantusetwice?: 1; // The user cannot select this move after a previous successful use.
  charge?: 1; // The user is unable to make a move between turns.
  contact?: 1; // Makes contact.
  dance?: 1; // When used by a Pokemon, other Pokemon with the Ability Dancer can attempt to execute the same move.
  defrost?: 1; // Thaws the user if executed successfully while the user is frozen.
  distance?: 1; // Can target a Pokemon positioned anywhere in a Triple Battle.
  failcopycat?: 1; // Cannot be selected by Copycat.
  failencore?: 1; // Encore fails if target used this move.
  failinstruct?: 1; // Cannot be repeated by Instruct.
  failmefirst?: 1; // Cannot be selected by Me First.
  failmimic?: 1; // Cannot be copied by Mimic.
  futuremove?: 1; // Targets a slot, and in 2 turns damages that slot.
  gravity?: 1; // Prevented from being executed or selected during Gravity's effect.
  heal?: 1; // Prevented from being executed or selected during Heal Block's effect.
  mirror?: 1; // Can be copied by Mirror Move.
  mustpressure?: 1; // Additional PP is deducted due to Pressure when it ordinarily would not.
  noassist?: 1; // Cannot be selected by Assist.
  nonsky?: 1; // Prevented from being executed or selected in a Sky Battle.
  noparentalbond?: 1; // Cannot be made to hit twice via Parental Bond.
  nosleeptalk?: 1; // Cannot be selected by Sleep Talk.
  pledgecombo?: 1; // Gems will not activate. Cannot be redirected by Storm Drain / Lightning Rod.
  powder?: 1; // Has no effect on Pokemon which are Grass-type, have the Ability Overcoat, or hold Safety Goggles.
  protect?: 1; // Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
  pulse?: 1; // Power is multiplied by 1.5 when used by a Pokemon with the Ability Mega Launcher.
  punch?: 1; // Power is multiplied by 1.2 when used by a Pokemon with the Ability Iron Fist.
  recharge?: 1; // If this move is successful, the user must recharge on the following turn and cannot make a move.
  reflectable?: 1; // Bounced back to the original user by Magic Coat or the Ability Magic Bounce.
  slicing?: 1; // Power is multiplied by 1.5 when used by a Pokemon with the Ability Sharpness.
  snatch?: 1; // Can be stolen from the original user and instead used by another Pokemon using Snatch.
  sound?: 1; // Has no effect on Pokemon with the Ability Soundproof.
  wind?: 1; // Activates the Wind Power and Wind Rider Abilities.
}
export interface MoveData extends EffectData, MoveEventMethods, HitEffect {
  name: string;
  /** move index number, used for Metronome rolls */
  num?: number;
  condition?: ConditionData;
  basePower: number;
  accuracy: true | number;
  pp: number;
  category: "物理" | "特殊" | "変化";
  type: string;
  priority: number;
  target: string;
  flags: MoveFlags;
  /** Hidden Power */
  realMove?: string;

  damage?: number | "level" | false | null;
  contestType?: string;
  noPPBoosts?: boolean;

  // Z-move data
  // -----------
  /**
   * ID of the Z-Crystal that calls the move.
   * `true` for Z-Powered status moves like Z-Encore.
   */
  isZ?: boolean | string;
  zMove?: {
    basePower?: number;
    effect?: string;
    boost?: SparseBoostsTable;
  };

  // Max move data
  // -------------
  /**
   * `true` for Max moves like Max Airstream. If its a G-Max moves, this is
   * the species ID of the Gigantamax Pokemon that can use this G-Max move.
   */
  isMax?: boolean | string;
  maxMove?: {
    basePower: number;
  };

  // Hit effects
  // -----------
  ohko?: boolean | string;
  thawsTarget?: boolean;
  heal?: number[] | null;
  forceSwitch?: boolean;
  selfSwitch?: "copyvolatile" | "shedtail" | boolean;
  selfBoost?: { boosts?: SparseBoostsTable };
  selfdestruct?: "always" | "ifHit" | boolean;
  breaksProtect?: boolean;
  /**
   * Note that this is only "true" recoil. Other self-damage, like Struggle,
   * crash (High Jump Kick), Mind Blown, Life Orb, and even Substitute and
   * Healing Wish, are sometimes called "recoil" by the community, but don't
   * count as "real" recoil.
   */
  recoil?: [number, number];
  drain?: [number, number];
  mindBlownRecoil?: boolean;
  stealsBoosts?: boolean;
  struggleRecoil?: boolean;
  secondary?: SecondaryEffect | null;
  secondaries?: SecondaryEffect[] | null;
  self?: SecondaryEffect | null;
  hasSheerForce?: boolean;

  // Hit effect modifiers
  // --------------------
  alwaysHit?: boolean; // currently unused
  baseMoveType?: string;
  basePowerModifier?: number;
  critModifier?: number;
  critRatio?: number;
  /**
   * Pokemon for the attack stat. Ability and Item damage modifiers still come from the real attacker.
   */
  overrideOffensivePokemon?: "target" | "source";
  /**
   * Physical moves use attack stat modifiers, special moves use special attack stat modifiers.
   */
  overrideOffensiveStat?: StatIDExceptHP;
  /**
   * Pokemon for the defense stat. Ability and Item damage modifiers still come from the real defender.
   */
  overrideDefensivePokemon?: "target" | "source";
  /**
   * uses modifiers that match the new stat
   */
  overrideDefensiveStat?: StatIDExceptHP;
  forceSTAB?: boolean;
  ignoreAbility?: boolean;
  ignoreAccuracy?: boolean;
  ignoreDefensive?: boolean;
  ignoreEvasion?: boolean;
  ignoreImmunity?: boolean | { [k: string]: boolean };
  ignoreNegativeOffensive?: boolean;
  ignoreOffensive?: boolean;
  ignorePositiveDefensive?: boolean;
  ignorePositiveEvasion?: boolean;
  multiaccuracy?: boolean;
  multihit?: number | number[];
  multihitType?: string;
  noDamageVariance?: boolean;
  nonGhostTarget?: string;
  pressureTarget?: string;
  spreadModifier?: number;
  sleepUsable?: boolean;
  /**
   * Will change target if current target is unavailable. (Dragon Darts)
   */
  smartTarget?: boolean;
  /**
   * Tracks the original target through Ally Switch and other switch-out-and-back-in
   * situations, rather than just targeting a slot. (Stalwart, Snipe Shot)
   */
  tracksTarget?: boolean;
  willCrit?: boolean;

  // Mechanics flags
  // ---------------
  hasCrashDamage?: boolean;
  isConfusionSelfHit?: boolean;
  noMetronome?: string[];
  noSketch?: boolean;
  stallingMove?: boolean;
  baseMove?: string;
}

type MutableMove = BasicEffect & MoveData;
type RuinableMove = { [k in `ruined${"Atk" | "Def" | "SpA" | "SpD"}`]?: Pokemon };
interface MoveHitData {
  [targetSlotid: string]: {
    /** Did this move crit against the target? */
    crit: boolean;
    /** The type effectiveness of this move against the target */
    typeMod: number;
    /**
     * Is this move a Z-Move that broke the target's protection?
     * (does 0.25x regular damage)
     */
    zBrokeProtect: boolean;
  };
}
type StatIDExceptHP = "atk" | "def" | "spa" | "spd" | "spe";
type BoostID = StatIDExceptHP | "accuracy" | "evasion";
type BoostsTable = { [boost in BoostID]: number };
type SparseBoostsTable = Partial<BoostsTable>;
export interface HitEffect {
  onHit?: MoveEventMethods["onHit"];

  // set pokemon conditions
  boosts?: SparseBoostsTable | null;
  status?: string;
  volatileStatus?: string;

  // set side/slot conditions
  sideCondition?: string;
  slotCondition?: string;

  // set field conditions
  pseudoWeather?: string;
  terrain?: string;
  weather?: string;
}
export interface ActiveMove extends MutableMove, RuinableMove {
  readonly name: string;
  readonly effectType: "Move";
  readonly id: number;
  num: number;
  weather?: string;
  status?: string;
  hit: number;
  moveHitData?: MoveHitData;
  ability?: string;
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
type Effect = Ability | Item | ActiveMove | Condition;
interface CommonHandlers {
  ModifierEffect: (this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | void;
  ModifierMove: (this: Battle, relayVar: number, target: Pokemon, source: Pokemon, move: ActiveMove) => number | void;
  ResultMove:
    | boolean
    | ((this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => boolean | null | "" | void);
  ExtResultMove:
    | boolean
    | ((this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => boolean | null | number | "" | void);
  VoidEffect: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect) => void;
  VoidMove: (this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
  ModifierSourceEffect: (
    this: Battle,
    relayVar: number,
    source: Pokemon,
    target: Pokemon,
    effect: Effect
  ) => number | void;
  ModifierSourceMove: (
    this: Battle,
    relayVar: number,
    source: Pokemon,
    target: Pokemon,
    move: ActiveMove
  ) => number | void;
  ResultSourceMove:
    | boolean
    | ((this: Battle, source: Pokemon, target: Pokemon, move: ActiveMove) => boolean | null | "" | void);
  ExtResultSourceMove:
    | boolean
    | ((this: Battle, source: Pokemon, target: Pokemon, move: ActiveMove) => boolean | null | number | "" | void);
  VoidSourceEffect: (this: Battle, source: Pokemon, target: Pokemon, effect: Effect) => void;
  VoidSourceMove: (this: Battle, source: Pokemon, target: Pokemon, move: ActiveMove) => void;
}
