// List of flags and their descriptions can be found in sim/dex-moves.ts
import { MoveData } from "../types/move";
export const Moves: { [moveid: string]: MoveData } = {
  "10000000voltthunderbolt": {
    num: 719,
    accuracy: true,
    basePower: 195,
    category: "Special",
    isNonstandard: "Past",
    name: "10,000,000 Volt Thunderbolt",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "pikashuniumz",
    critRatio: 3,
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool",
  },
  absorb: {
    num: 71,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Absorb",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Clever",
  },
  accelerock: {
    num: 709,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Accelerock",
    pp: 20,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool",
  },
  acid: {
    num: 51,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Acid",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1,
      },
    },
    target: "allAdjacentFoes",
    type: "Poison",
    contestType: "Clever",
  },
  acidarmor: {
    num: 151,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Acid Armor",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 2,
    },
    secondary: null,
    target: "self",
    type: "Poison",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough",
  },
  aciddownpour: {
    num: 628,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Acid Downpour",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "poisoniumz",
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Cool",
  },
  acidspray: {
    num: 491,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Acid Spray",
    pp: 20,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spd: -2,
      },
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful",
  },
  acrobatics: {
    num: 512,
    accuracy: 100,
    basePower: 55,
    basePowerCallback(pokemon, target, move) {
      if (!pokemon.item) {
        this.debug("BP doubled for no item");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    name: "Acrobatics",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
    secondary: null,
    target: "any",
    type: "Flying",
    contestType: "Cool",
  },
  acupressure: {
    num: 367,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Acupressure",
    pp: 30,
    priority: 0,
    flags: {},
    onHit(target) {
      const stats: BoostID[] = [];
      let stat: BoostID;
      for (stat in target.boosts) {
        if (target.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost: SparseBoostsTable = {};
        boost[randomStat] = 2;
        this.boost(boost);
      } else {
        return false;
      }
    },
    secondary: null,
    target: "adjacentAllyOrSelf",
    type: "Normal",
    zMove: { effect: "crit2" },
    contestType: "Tough",
  },
  aerialace: {
    num: 332,
    accuracy: true,
    basePower: 60,
    category: "Physical",
    name: "Aerial Ace",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, distance: 1, slicing: 1 },
    secondary: null,
    target: "any",
    type: "Flying",
    contestType: "Cool",
  },
  aeroblast: {
    num: 177,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    isNonstandard: "Past",
    name: "Aeroblast",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1 },
    critRatio: 2,
    secondary: null,
    target: "any",
    type: "Flying",
    contestType: "Cool",
  },
  afteryou: {
    num: 495,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "After You",
    pp: 15,
    priority: 0,
    flags: { bypasssub: 1, allyanim: 1 },
    onHit(target) {
      if (this.activePerHalf === 1) return false; // fails in singles
      const action = this.queue.willMove(target);
      if (action) {
        this.queue.prioritizeAction(action);
        this.add("-activate", target, "move: After You");
      } else {
        return false;
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { spe: 1 } },
    contestType: "Cute",
  },
  agility: {
    num: 97,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Agility",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spe: 2,
    },
    secondary: null,
    target: "self",
    type: "Psychic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool",
  },
  aircutter: {
    num: 314,
    accuracy: 95,
    basePower: 60,
    category: "Special",
    name: "Air Cutter",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1, slicing: 1, wind: 1 },
    critRatio: 2,
    secondary: null,
    target: "allAdjacentFoes",
    type: "Flying",
    contestType: "Cool",
  },
  airslash: {
    num: 403,
    accuracy: 95,
    basePower: 75,
    category: "Special",
    name: "Air Slash",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, slicing: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch",
    },
    target: "any",
    type: "Flying",
    contestType: "Cool",
  },
  alloutpummeling: {
    num: 624,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "All-Out Pummeling",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "fightiniumz",
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Cool",
  },
  allyswitch: {
    num: 502,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Ally Switch",
    pp: 15,
    priority: 2,
    flags: {},
    stallingMove: true,
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onTryHit(source) {
      if (source.side.active.length === 1) return false;
      if (source.side.active.length === 3 && source.position === 1) return false;
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
      const newPosition = pokemon.position === 0 ? pokemon.side.active.length - 1 : 0;
      if (!pokemon.side.active[newPosition]) return false;
      if (pokemon.side.active[newPosition].fainted) return false;
      this.swapPosition(pokemon, newPosition, "[from] move: Ally Switch");
    },
    secondary: null,
    target: "self",
    type: "Psychic",
    zMove: { boost: { spe: 2 } },
    contestType: "Clever",
  },
  amnesia: {
    num: 133,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Amnesia",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spd: 2,
    },
    secondary: null,
    target: "self",
    type: "Psychic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute",
  },
  anchorshot: {
    num: 677,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    isNonstandard: "Past",
    name: "Anchor Shot",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (source.isActive) target.addVolatile("trapped", source, move, "trapper");
      },
    },
    target: "normal",
    type: "Steel",
    contestType: "Tough",
  },
  ancientpower: {
    num: 246,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Ancient Power",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          atk: 1,
          def: 1,
          spa: 1,
          spd: 1,
          spe: 1,
        },
      },
    },
    target: "normal",
    type: "Rock",
    contestType: "Tough",
  },
  appleacid: {
    num: 787,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Apple Acid",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spd: -1,
      },
    },
    target: "normal",
    type: "Grass",
  },
  aquacutter: {
    num: 895,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Aqua Cutter",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Cool",
  },
  aquajet: {
    num: 453,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Aqua Jet",
    pp: 20,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Cool",
  },
  aquaring: {
    num: 392,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aqua Ring",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    volatileStatus: "aquaring",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Aqua Ring");
      },
      onResidualOrder: 6,
      onResidual(pokemon) {
        this.heal(pokemon.baseMaxhp / 16);
      },
    },
    secondary: null,
    target: "self",
    type: "Water",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful",
  },
  aquastep: {
    num: 872,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Aqua Step",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, dance: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spe: 1,
        },
      },
    },
    target: "normal",
    type: "Water",
    contestType: "Cool",
  },
  aquatail: {
    num: 401,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Aqua Tail",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful",
  },
  armorcannon: {
    num: 890,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Armor Cannon",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        def: -1,
        spd: -1,
      },
    },
    secondary: null,
    target: "normal",
    type: "Fire",
  },
  armthrust: {
    num: 292,
    accuracy: 100,
    basePower: 15,
    category: "Physical",
    name: "Arm Thrust",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Tough",
  },
  aromatherapy: {
    num: 312,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Aromatherapy",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, distance: 1 },
    onHit(target, source, move) {
      this.add("-activate", source, "move: Aromatherapy");
      let success = false;
      const allies = [...target.side.pokemon, ...(target.side.allySide?.pokemon || [])];
      for (const ally of allies) {
        if (ally !== source && (ally.hasAbility("sapsipper") || (ally.volatiles["substitute"] && !move.infiltrates))) {
          continue;
        }
        if (ally.cureStatus()) success = true;
      }
      return success;
    },
    target: "allyTeam",
    type: "Grass",
    zMove: { effect: "heal" },
    contestType: "Clever",
  },
  aromaticmist: {
    num: 597,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aromatic Mist",
    pp: 20,
    priority: 0,
    flags: { bypasssub: 1 },
    boosts: {
      spd: 1,
    },
    secondary: null,
    target: "adjacentAlly",
    type: "Fairy",
    zMove: { boost: { spd: 2 } },
    contestType: "Beautiful",
  },
  assist: {
    num: 274,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Assist",
    pp: 20,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onHit(target) {
      const moves = [];
      for (const pokemon of target.side.pokemon) {
        if (pokemon === target) continue;
        for (const moveSlot of pokemon.moveSlots) {
          const moveid = moveSlot.id;
          const move = this.dex.moves.get(moveid);
          if (move.flags["noassist"] || move.isZ || move.isMax) {
            continue;
          }
          moves.push(moveid);
        }
      }
      let randomMove = "";
      if (moves.length) randomMove = this.sample(moves);
      if (!randomMove) {
        return false;
      }
      this.actions.useMove(randomMove, target);
    },
    secondary: null,
    target: "self",
    type: "Normal",
    contestType: "Cute",
  },
  assurance: {
    num: 372,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      if (target.hurtThisTurn) {
        this.debug("BP doubled on damaged target");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    name: "Assurance",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever",
  },
  astonish: {
    num: 310,
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Astonish",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch",
    },
    target: "normal",
    type: "Ghost",
    contestType: "Cute",
  },
  astralbarrage: {
    num: 825,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Astral Barrage",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Ghost",
  },
  attackorder: {
    num: 454,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Attack Order",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Clever",
  },
  attract: {
    num: 213,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Attract",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
    volatileStatus: "attract",
    condition: {
      noCopy: true, // doesn't get copied by Baton Pass
      onStart(pokemon, source, effect) {
        if (!(pokemon.gender === "M" && source.gender === "F") && !(pokemon.gender === "F" && source.gender === "M")) {
          this.debug("incompatible gender");
          return false;
        }
        if (!this.runEvent("Attract", pokemon, source)) {
          this.debug("Attract event failed");
          return false;
        }

        if (effect.name === "Cute Charm") {
          this.add("-start", pokemon, "Attract", "[from] ability: Cute Charm", "[of] " + source);
        } else if (effect.name === "Destiny Knot") {
          this.add("-start", pokemon, "Attract", "[from] item: Destiny Knot", "[of] " + source);
        } else {
          this.add("-start", pokemon, "Attract");
        }
      },
      onUpdate(pokemon) {
        if (this.effectState["source"] && !this.effectState["source"].isActive && pokemon.volatiles["attract"]) {
          this.debug("Removing Attract volatile on " + pokemon);
          pokemon.removeVolatile("attract");
        }
      },
      onBeforeMovePriority: 2,
      onBeforeMove(pokemon, target, move) {
        this.add("-activate", pokemon, "move: Attract", "[of] " + this.effectState["source"]);
        if (this.randomChance(1, 2)) {
          this.add("cant", pokemon, "Attract");
          return false;
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Attract", "[silent]");
      },
    },
    onTryImmunity(target, source) {
      return (target.gender === "M" && source.gender === "F") || (target.gender === "F" && source.gender === "M");
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute",
  },
  aurasphere: {
    num: 396,
    accuracy: true,
    basePower: 80,
    category: "Special",
    name: "Aura Sphere",
    pp: 20,
    priority: 0,
    flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1, distance: 1 },
    secondary: null,
    target: "any",
    type: "Fighting",
    contestType: "Beautiful",
  },
  aurawheel: {
    num: 783,
    accuracy: 100,
    basePower: 110,
    category: "Physical",
    name: "Aura Wheel",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spe: 1,
        },
      },
    },
    onTry(source) {
      if (source.species.baseSpecies === "Morpeko") {
        return;
      }
      this.attrLastMove("[still]");
      this.add("-fail", source, "move: Aura Wheel");
      this.hint("Only a Pokemon whose form is Morpeko or Morpeko-Hangry can use this move.");
      return null;
    },
    onModifyType(move, pokemon) {
      if (pokemon.species.name === "Morpeko-Hangry") {
        move.type = "Dark";
      } else {
        move.type = "Electric";
      }
    },
    target: "normal",
    type: "Electric",
  },
  aurorabeam: {
    num: 62,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Aurora Beam",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1,
      },
    },
    target: "normal",
    type: "Ice",
    contestType: "Beautiful",
  },
  auroraveil: {
    num: 694,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aurora Veil",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    sideCondition: "auroraveil",
    onTry() {
      return this.field.isWeather(["hail", "snow"]);
    },
    condition: {
      duration: 5,
      durationCallback(target, source, effect) {
        if (source?.hasItem("lightclay")) {
          return 8;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source, target, move) {
        if (target !== source && this.effectState["target"].hasAlly(target)) {
          if (
            (target.side.getSideCondition("reflect") && this.getCategory(move) === "Physical") ||
            (target.side.getSideCondition("lightscreen") && this.getCategory(move) === "Special")
          ) {
            return;
          }
          if (!target.getMoveHitData(move).crit && !move.infiltrates) {
            this.debug("Aurora Veil weaken");
            if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Aurora Veil");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 10,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Aurora Veil");
      },
    },
    secondary: null,
    target: "allySide",
    type: "Ice",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful",
  },
  autotomize: {
    num: 475,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Autotomize",
    pp: 15,
    priority: 0,
    flags: { snatch: 1 },
    onTryHit(pokemon) {
      const hasContrary = pokemon.hasAbility("contrary");
      if ((!hasContrary && pokemon.boosts.spe === 6) || (hasContrary && pokemon.boosts.spe === -6)) {
        return false;
      }
    },
    boosts: {
      spe: 2,
    },
    onHit(pokemon) {
      if (pokemon.weighthg > 1) {
        pokemon.weighthg = Math.max(1, pokemon.weighthg - 1000);
        this.add("-start", pokemon, "Autotomize");
      }
    },
    secondary: null,
    target: "self",
    type: "Steel",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful",
  },
  avalanche: {
    num: 419,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some((p) => p.source === target && p.damage > 0 && p.thisTurn);
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    name: "Avalanche",
    pp: 10,
    priority: -4,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Beautiful",
  },
  axekick: {
    num: 853,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Axe Kick",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    secondary: {
      chance: 30,
      volatileStatus: "confusion",
    },
    target: "normal",
    type: "Fighting",
  },
  babydolleyes: {
    num: 608,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Baby-Doll Eyes",
    pp: 30,
    priority: 1,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    boosts: {
      atk: -1,
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    zMove: { boost: { def: 1 } },
    contestType: "Cute",
  },
  baddybad: {
    num: 737,
    accuracy: 95,
    basePower: 80,
    category: "Special",
    isNonstandard: "LGPE",
    name: "Baddy Bad",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      sideCondition: "reflect",
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever",
  },
  banefulbunker: {
    num: 661,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Baneful Bunker",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "banefulbunker",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return;
          if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source.getVolatile("lockedmove");
        if (lockedmove) {
          // Outrage counter is reset
          if (source.volatiles["lockedmove"].duration === 2) {
            delete source.volatiles["lockedmove"];
          }
        }
        if (this.checkMoveMakesContact(move, source, target)) {
          source.trySetStatus("psn", target);
        }
        return this.NOT_FAIL;
      },
      onHit(target, source, move) {
        if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
          source.trySetStatus("psn", target);
        }
      },
    },
    secondary: null,
    target: "self",
    type: "Poison",
    zMove: { boost: { def: 1 } },
    contestType: "Tough",
  },
};
