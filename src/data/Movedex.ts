// List of flags and their descriptions can be found in sim/dex-moves.ts
import { MoveData } from "../types/Move";
// List of flags and their descriptions can be found in sim/dex-moves.ts

export const Moves: { [moveid: string]: MoveData } = {
  アクアジェット: {
    num: 453,
    accuracy: 100,
    basePower: 40,
    category: "物理",
    name: "アクアジェット",
    pp: 20,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "みず",
    contestType: "Cool",
  },
  オーロラベール: {
    num: 694,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "オーロラベール",
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
        // if (target !== source && this.effectState.target.hasAlly(target)) {
        //   if (
        //     (target.side.getSideCondition("reflect") && this.getCategory(move) === "物理") ||
        //     (target.side.getSideCondition("lightscreen") && this.getCategory(move) === "特殊")
        //   ) {
        //     return;
        //   }
        //   if (!target.getMoveHitData(move).crit && !move.infiltrates) {
        //     this.debug("Aurora Veil weaken");
        //     if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
        //     return this.chainModify(0.5);
        //   }
        // }
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
    type: "こおり",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful",
  },
  トーチカ: {
    num: 661,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "トーチカ",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "banefulbunker",
    onPrepareHit(pokemon) {
      // return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      // pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        if (!move.flags["protect"]) {
          // if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return;
          // if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        // const lockedmove = source.getVolatile("lockedmove");
        // if (lockedmove) {
        //   // Outrage counter is reset
        //   if (source.volatiles["lockedmove"].duration === 2) {
        //     delete source.volatiles["lockedmove"];
        //   }
        // }
        // if (this.checkMoveMakesContact(move, source, target)) {
        //   source.trySetStatus("psn", target);
        // }
        // return this.NOT_FAIL;
      },
      onHit(target, source, move) {
        // if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
        //   source.trySetStatus("psn", target);
        // }
      },
    },
    secondary: null,
    target: "self",
    type: "どく",
    zMove: { boost: { def: 1 } },
    contestType: "Tough",
  },
  ふぶき: {
    num: 59,
    accuracy: 70,
    basePower: 110,
    category: "特殊",
    name: "ふぶき",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, wind: 1 },
    onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"])) move.accuracy = true;
    },
    secondary: {
      chance: 10,
      status: "frz",
    },
    target: "allAdjacentFoes",
    type: "こおり",
    contestType: "Beautiful",
  },
  ブラッドムーン: {
    num: 901,
    accuracy: 100,
    basePower: 140,
    category: "特殊",
    name: "ブラッドムーン",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, cantusetwice: 1 },
    secondary: null,
    target: "ノーマル",
    type: "ノーマル",
  },
  ボディプレス: {
    num: 776,
    accuracy: 100,
    basePower: 80,
    category: "物理",
    name: "ボディプレス",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    overrideOffensiveStat: "def",
    secondary: null,
    target: "ノーマル",
    type: "かくとう",
  },
  バレットパンチ: {
    num: 418,
    accuracy: 100,
    basePower: 40,
    category: "物理",
    name: "バレットパンチ",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "ノーマル",
    type: "はがね",
    contestType: "Tough",
  },
  インファイト: {
    num: 370,
    accuracy: 100,
    basePower: 120,
    category: "物理",
    name: "インファイト",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        def: -1,
        spd: -1,
      },
    },
    secondary: null,
    target: "ノーマル",
    type: "かくとう",
    contestType: "Tough",
  },
  かみくだく: {
    num: 242,
    accuracy: 100,
    basePower: 80,
    category: "物理",
    name: "かみくだく",
    pp: 15,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1,
      },
    },
    target: "ノーマル",
    type: "あく",
    contestType: "Tough",
  },
  のろい: {
    num: 174,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "のろい",
    pp: 10,
    priority: 0,
    flags: { bypasssub: 1 },
    volatileStatus: "curse",
    onModifyMove(move, source, target) {
      if (!source.hasType("Ghost")) {
        // move.target = move.nonGhostTarget as MoveTarget;
      } else if (source.isAlly(target)) {
        move.target = "randomNormal";
      }
    },
    onTryHit(target, source, move) {
      // if (!source.hasType("Ghost")) {
      //   delete move.volatileStatus;
      //   delete move.onHit;
      //   move.self = { boosts: { spe: -1, atk: 1, def: 1 } };
      // } else if (move.volatileStatus && target.volatiles["curse"]) {
      //   return false;
      // }
    },
    onHit(target, source) {
      // this.directDamage(source.maxhp / 2, source, source);
    },
    condition: {
      onStart(pokemon, source) {
        this.add("-start", pokemon, "Curse", "[of] " + source);
      },
      onResidualOrder: 12,
      onResidual(pokemon) {
        this.damage(pokemon.baseMaxhp / 4);
      },
    },
    secondary: null,
    target: "ノーマル",
    nonGhostTarget: "self",
    type: "ゴースト",
    zMove: { effect: "curse" },
    contestType: "Tough",
  },
  あくのはどう: {
    num: 399,
    accuracy: 100,
    basePower: 80,
    category: "特殊",
    name: "あくのはどう",
    pp: 15,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "flinch",
    },
    target: "any",
    type: "あく",
    contestType: "Cool",
  },
  りゅうのまい: {
    num: 349,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "りゅうのまい",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1 },
    boosts: {
      atk: 1,
      spe: 1,
    },
    secondary: null,
    target: "self",
    type: "ドラゴン",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool",
  },
  ドリルくちばし: {
    num: 65,
    accuracy: 100,
    basePower: 80,
    category: "物理",
    name: "ドリルくちばし",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
    secondary: null,
    target: "any",
    type: "ひこう",
    contestType: "Cool",
  },
  だいちのちから: {
    num: 414,
    accuracy: 100,
    basePower: 90,
    category: "特殊",
    name: "だいちのちから",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1,
      },
    },
    target: "ノーマル",
    type: "じめん",
    contestType: "Beautiful",
  },
  じしん: {
    num: 89,
    accuracy: 100,
    basePower: 100,
    category: "物理",
    name: "じしん",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "じめん",
    contestType: "Tough",
  },
  アンコール: {
    num: 227,
    accuracy: 100,
    basePower: 0,
    category: "変化",
    name: "アンコール",
    pp: 5,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, failencore: 1 },
    volatileStatus: "encore",
    condition: {
      duration: 3,
      // noCopy: true, // doesn't get copied by Z-Baton Pass
      // onStart(target) {
      //   let move: Move | ActiveMove | null = target.lastMove;
      //   if (!move || target.volatiles["dynamax"]) return false;

      //   if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
      //   const moveIndex = target.moves.indexOf(move.id);
      //   if (
      //     move.isZ ||
      //     move.flags["failencore"] ||
      //     !target.moveSlots[moveIndex] ||
      //     target.moveSlots[moveIndex].pp <= 0
      //   ) {
      //     // it failed
      //     return false;
      //   }
      //   this.effectState.move = move.id;
      //   this.add("-start", target, "Encore");
      //   if (!this.queue.willMove(target)) {
      //     this.effectState.duration++;
      //   }
      // },
      // onOverrideAction(pokemon, target, move) {
      //   if (move.id !== this.effectState.move) return this.effectState.move;
      // },
      // onResidualOrder: 16,
      // onResidual(target) {
      //   if (
      //     !target.moves.includes(this.effectState.move) ||
      //     target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0
      //   ) {
      //     // early termination if you run out of PP
      //     target.removeVolatile("encore");
      //   }
      // },
      // onEnd(target) {
      //   this.add("-end", target, "Encore");
      // },
      // onDisableMove(pokemon) {
      //   if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
      //     return;
      //   }
      //   for (const moveSlot of pokemon.moveSlots) {
      //     if (moveSlot.id !== this.effectState.move) {
      //       pokemon.disableMove(moveSlot.id);
      //     }
      //   }
      // },
    },
    secondary: null,
    target: "ノーマル",
    type: "ノーマル",
    zMove: { boost: { spe: 1 } },
    contestType: "Cute",
  },
  こらえる: {
    num: 203,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "こらえる",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "endure",
    // onPrepareHit(pokemon) {
    //   // return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    // },
    onHit(pokemon) {
      // pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Endure");
      },
      onDamagePriority: -10,
      onDamage(damage, target, source, effect) {
        // if (effect?.effectType === "Move" && damage >= target.hp) {
        //   this.add("-activate", target, "move: Endure");
        //   return target.hp - 1;
        // }
      },
    },
    secondary: null,
    target: "self",
    type: "ノーマル",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough",
  },
  エナジーボール: {
    num: 412,
    accuracy: 100,
    basePower: 90,
    category: "特殊",
    name: "エナジーボール",
    pp: 10,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1,
      },
    },
    target: "ノーマル",
    type: "くさ",
    contestType: "Beautiful",
  },
  しんそく: {
    num: 245,
    accuracy: 100,
    basePower: 80,
    category: "物理",
    name: "しんそく",
    pp: 5,
    priority: 2,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "ノーマル",
    contestType: "Cool",
  },
  ほのおのまい: {
    num: 552,
    accuracy: 100,
    basePower: 80,
    category: "特殊",
    name: "ほのおのまい",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, dance: 1 },
    secondary: {
      chance: 50,
      self: {
        boosts: {
          spa: 1,
        },
      },
    },
    target: "ノーマル",
    type: "ほのお",
    contestType: "Beautiful",
  },
  いのちがけ: {
    num: 515,
    accuracy: 100,
    basePower: 0,
    // damageCallback(pokemon) {
    //   const damage = pokemon.hp;
    //   pokemon.faint();
    //   return damage;
    // },
    selfdestruct: "ifHit",
    category: "特殊",
    name: "いのちがけ",
    pp: 5,
    priority: 0,
    flags: { protect: 1, noparentalbond: 1 },
    secondary: null,
    target: "ノーマル",
    type: "かくとう",
    zMove: { basePower: 180 },
    contestType: "Tough",
  },
  じわれ: {
    num: 90,
    accuracy: 30,
    basePower: 0,
    category: "物理",
    name: "じわれ",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    ohko: true,
    secondary: null,
    target: "ノーマル",
    type: "じめん",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Tough",
  },
  かえんほうしゃ: {
    num: 53,
    accuracy: 100,
    basePower: 90,
    category: "特殊",
    name: "かえんほうしゃ",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn",
    },
    target: "ノーマル",
    type: "ほのお",
    contestType: "Beautiful",
  },
  なげつける: {
    num: 374,
    accuracy: 100,
    basePower: 0,
    category: "物理",
    name: "なげつける",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, allyanim: 1, noparentalbond: 1 },
    // onPrepareHit(target, source, move) {
    //   if (source.ignoringItem()) return false;
    //   const item = source.getItem();
    //   if (!this.singleEvent("TakeItem", item, source.itemState, source, source, move, item)) return false;
    //   if (!item.fling) return false;
    //   move.basePower = item.fling.basePower;
    //   this.debug("BP: " + move.basePower);
    //   if (item.isBerry) {
    //     move.onHit = function (foe) {
    //       if (this.singleEvent("Eat", item, null, foe, null, null)) {
    //         this.runEvent("EatItem", foe, null, null, item);
    //         if (item.id === "leppaberry") foe.staleness = "external";
    //       }
    //       if (item.onEat) foe.ateBerry = true;
    //     };
    //   } else if (item.fling.effect) {
    //     move.onHit = item.fling.effect;
    //   } else {
    //     if (!move.secondaries) move.secondaries = [];
    //     if (item.fling.status) {
    //       move.secondaries.push({ status: item.fling.status });
    //     } else if (item.fling.volatileStatus) {
    //       move.secondaries.push({ volatileStatus: item.fling.volatileStatus });
    //     }
    //   }
    //   source.addVolatile("fling");
    // },
    condition: {
      // onUpdate(pokemon) {
      //   const item = pokemon.getItem();
      //   pokemon.setItem("");
      //   pokemon.lastItem = item.id;
      //   pokemon.usedItemThisTurn = true;
      //   this.add("-enditem", pokemon, item.name, "[from] move: Fling");
      //   this.runEvent("AfterUseItem", pokemon, null, null, item);
      //   pokemon.removeVolatile("fling");
      // },
    },
    secondary: null,
    target: "ノーマル",
    type: "あく",
    contestType: "Cute",
  },
  クイックターン: {
    num: 812,
    accuracy: 100,
    basePower: 60,
    category: "物理",
    name: "クイックターン",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "ノーマル",
    type: "みず",
  },
  フリーズドライ: {
    num: 573,
    accuracy: 100,
    basePower: 70,
    category: "特殊",
    name: "フリーズドライ",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    // onEffectiveness(typeMod, target, type) {
    //   if (type === "Water") return 1;
    // },
    secondary: {
      chance: 10,
      status: "frz",
    },
    target: "ノーマル",
    type: "こおり",
    contestType: "Beautiful",
  },
  くろいきり: {
    num: 114,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "くろいきり",
    pp: 30,
    priority: 0,
    flags: { bypasssub: 1 },
    // onHitField() {
    //   this.add("-clearallboost");
    //   for (const pokemon of this.getAllActive()) {
    //     pokemon.clearBoosts();
    //   }
    // },
    secondary: null,
    target: "all",
    type: "こおり",
    zMove: { effect: "heal" },
    contestType: "Beautiful",
  },
  たたりめ: {
    num: 506,
    accuracy: 100,
    basePower: 65,
    // basePowerCallback(pokemon, target, move) {
    //   if (target.status || target.hasAbility("comatose")) {
    //     this.debug("BP doubled from status condition");
    //     return move.basePower * 2;
    //   }
    //   return move.basePower;
    // },
    category: "特殊",
    name: "たたりめ",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "ゴースト",
    zMove: { basePower: 160 },
    contestType: "Clever",
  },
  ウッドホーン: {
    num: 532,
    accuracy: 100,
    basePower: 75,
    category: "物理",
    name: "ウッドホーン",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "ノーマル",
    type: "くさ",
    contestType: "Tough",
  },
  ハイドロポンプ: {
    num: 56,
    accuracy: 80,
    basePower: 110,
    category: "特殊",
    name: "ハイドロポンプ",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "みず",
    contestType: "Beautiful",
  },
  ハイパーボイス: {
    num: 304,
    accuracy: 100,
    basePower: 90,
    category: "特殊",
    name: "ハイパーボイス",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "ノーマル",
    contestType: "Cool",
  },
  れいとうパンチ: {
    num: 8,
    accuracy: 100,
    basePower: 75,
    category: "物理",
    name: "れいとうパンチ",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      status: "frz",
    },
    target: "ノーマル",
    type: "こおり",
    contestType: "Beautiful",
  },
  こおりのつぶて: {
    num: 420,
    accuracy: 100,
    basePower: 40,
    category: "物理",
    name: "こおりのつぶて",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "こおり",
    contestType: "Beautiful",
  },
  つららおとし: {
    num: 556,
    accuracy: 90,
    basePower: 85,
    category: "物理",
    name: "つららおとし",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch",
    },
    target: "ノーマル",
    type: "こおり",
    contestType: "Beautiful",
  },
  てっぺき: {
    num: 334,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "てっぺき",
    pp: 15,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 2,
    },
    secondary: null,
    target: "self",
    type: "はがね",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough",
  },
  アイアンヘッド: {
    num: 442,
    accuracy: 100,
    basePower: 80,
    category: "物理",
    name: "アイアンヘッド",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch",
    },
    target: "ノーマル",
    type: "はがね",
    contestType: "Tough",
  },
  ツタこんぼう: {
    num: 904,
    accuracy: 100,
    basePower: 100,
    category: "物理",
    name: "ツタこんぼう",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    critRatio: 2,
    // onPrepareHit(target, source, move) {
    //   if (move.type !== "くさ") {
    //     this.attrLastMove("[anim] Ivy Cudgel " + move.type);
    //   }
    // },
    // onModifyType(move, pokemon) {
    //   switch (pokemon.species.name) {
    //     case "Ogerpon-Wellspring":
    //     case "Ogerpon-Wellspring-Tera":
    //       move.type = "Water";
    //       break;
    //     case "Ogerpon-Hearthflame":
    //     case "Ogerpon-Hearthflame-Tera":
    //       move.type = "Fire";
    //       break;
    //     case "Ogerpon-Cornerstone":
    //     case "Ogerpon-Cornerstone-Tera":
    //       move.type = "Rock";
    //       break;
    //   }
    // },
    secondary: null,
    target: "ノーマル",
    type: "くさ",
  },
  はたきおとす: {
    num: 282,
    accuracy: 100,
    basePower: 65,
    category: "物理",
    name: "はたきおとす",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    // onBasePower(basePower, source, target, move) {
    //   const item = target.getItem();
    //   if (!this.singleEvent("TakeItem", item, target.itemState, target, target, move, item)) return;
    //   if (item.id) {
    //     return this.chainModify(1.5);
    //   }
    // },
    // onAfterHit(target, source) {
    //   if (source.hp) {
    //     const item = target.takeItem();
    //     if (item) {
    //       this.add("-enditem", target, item.name, "[from] move: Knock Off", "[of] " + source);
    //     }
    //   }
    // },
    secondary: null,
    target: "ノーマル",
    type: "あく",
    contestType: "Clever",
  },
  アクアブレイク: {
    num: 710,
    accuracy: 100,
    basePower: 85,
    category: "物理",
    name: "アクアブレイク",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1,
      },
    },
    target: "ノーマル",
    type: "みず",
    contestType: "Cool",
  },
  ゴールドラッシュ: {
    num: 874,
    accuracy: 100,
    basePower: 120,
    category: "特殊",
    name: "ゴールドラッシュ",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -1,
      },
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "はがね",
    contestType: "Beautiful",
  },
  ムーンフォース: {
    num: 585,
    accuracy: 100,
    basePower: 95,
    category: "特殊",
    name: "ムーンフォース",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        spa: -1,
      },
    },
    target: "ノーマル",
    type: "フェアリー",
    contestType: "Beautiful",
  },
  キラースピン: {
    num: 866,
    accuracy: 100,
    basePower: 30,
    category: "物理",
    name: "キラースピン",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    // onAfterHit(target, pokemon, move) {
    //   if (!move.hasSheerForce) {
    //     if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
    //       this.add("-end", pokemon, "Leech Seed", "[from] move: Mortal Spin", "[of] " + pokemon);
    //     }
    //     const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
    //     for (const condition of sideConditions) {
    //       if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
    //         this.add(
    //           "-sideend",
    //           pokemon.side,
    //           this.dex.conditions.get(condition).name,
    //           "[from] move: Mortal Spin",
    //           "[of] " + pokemon
    //         );
    //       }
    //     }
    //     if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
    //       pokemon.removeVolatile("partiallytrapped");
    //     }
    //   }
    // },
    // onAfterSubDamage(damage, target, pokemon, move) {
    //   if (!move.hasSheerForce) {
    //     if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
    //       this.add("-end", pokemon, "Leech Seed", "[from] move: Mortal Spin", "[of] " + pokemon);
    //     }
    //     const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
    //     for (const condition of sideConditions) {
    //       if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
    //         this.add(
    //           "-sideend",
    //           pokemon.side,
    //           this.dex.conditions.get(condition).name,
    //           "[from] move: Mortal Spin",
    //           "[of] " + pokemon
    //         );
    //       }
    //     }
    //     if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
    //       pokemon.removeVolatile("partiallytrapped");
    //     }
    //   }
    // },
    secondary: {
      chance: 100,
      status: "psn",
    },
    target: "allAdjacentFoes",
    type: "どく",
  },
  マジカルフレイム: {
    num: 595,
    accuracy: 100,
    basePower: 75,
    category: "特殊",
    name: "マジカルフレイム",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spa: -1,
      },
    },
    target: "ノーマル",
    type: "ほのお",
    contestType: "Beautiful",
  },
  げきりん: {
    num: 200,
    accuracy: 100,
    basePower: 120,
    category: "物理",
    name: "げきりん",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1 },
    self: {
      volatileStatus: "lockedmove",
    },
    // onAfterMove(pokemon) {
    //   if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
    //     pokemon.removeVolatile("lockedmove");
    //   }
    // },
    secondary: null,
    target: "randomNormal",
    type: "ドラゴン",
    contestType: "Cool",
  },
  オーバーヒート: {
    num: 315,
    accuracy: 90,
    basePower: 130,
    category: "特殊",
    name: "オーバーヒート",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -2,
      },
    },
    secondary: null,
    target: "ノーマル",
    type: "ほのお",
    contestType: "Beautiful",
  },
  じゃれつく: {
    num: 583,
    accuracy: 90,
    basePower: 90,
    category: "物理",
    name: "じゃれつく",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1,
      },
    },
    target: "ノーマル",
    type: "フェアリー",
    contestType: "Cute",
  },
  どくどくのキバ: {
    num: 305,
    accuracy: 100,
    basePower: 50,
    category: "物理",
    name: "どくどくのキバ",
    pp: 15,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      status: "tox",
    },
    target: "ノーマル",
    type: "どく",
    contestType: "Clever",
  },
  パワージェム: {
    num: 408,
    accuracy: 100,
    basePower: 80,
    category: "特殊",
    name: "パワージェム",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "いわ",
    contestType: "Beautiful",
  },
  ふんどのこぶし: {
    num: 889,
    accuracy: 100,
    basePower: 50,
    // basePowerCallback(pokemon) {
    //   return Math.min(350, 50 + 50 * pokemon.timesAttacked);
    // },
    category: "物理",
    name: "ふんどのこぶし",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "ノーマル",
    type: "ゴースト",
  },
  じこさいせい: {
    num: 105,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "じこさいせい",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    heal: [1, 2],
    secondary: null,
    target: "self",
    type: "ノーマル",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever",
  },
  ねむる: {
    num: 156,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "ねむる",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    // onTry(source) {
    //   if (source.status === "slp" || source.hasAbility("comatose")) return false;

    //   if (source.hp === source.maxhp) {
    //     this.add("-fail", source, "heal");
    //     return null;
    //   }
    //   if (source.hasAbility(["insomnia", "vitalspirit"])) {
    //     this.add("-fail", source, "[from] ability: " + source.getAbility().name, "[of] " + source);
    //     return null;
    //   }
    // },
    // onHit(target, source, move) {
    //   const result = target.setStatus("slp", source, move);
    //   if (!result) return result;
    //   target.statusState.time = 3;
    //   target.statusState.startTime = 3;
    //   this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
    // },
    secondary: null,
    target: "self",
    type: "エスパー",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute",
  },
  がんせきふうじ: {
    num: 317,
    accuracy: 95,
    basePower: 60,
    category: "物理",
    name: "がんせきふうじ",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1,
      },
    },
    target: "ノーマル",
    type: "いわ",
    contestType: "Clever",
  },
  はねやすめ: {
    num: 355,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "はねやすめ",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    heal: [1, 2],
    self: {
      volatileStatus: "roost",
    },
    condition: {
      duration: 1,
      onResidualOrder: 25,
      // onStart(target) {
      //   if (!target.terastallized) {
      //     this.add("-singleturn", target, "move: Roost");
      //   } else if (target.terastallized === "ひこう") {
      //     this.add("-hint", "If a Flying Terastallized Pokemon uses Roost, it remains Flying-type.");
      //   }
      // },
      // onTypePriority: -1,
      // onType(types, pokemon) {
      //   this.effectState.typeWas = types;
      //   return types.filter((type) => type !== "Flying");
      // },
    },
    secondary: null,
    target: "self",
    type: "ひこう",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever",
  },
  カタストロフィ: {
    num: 877,
    accuracy: 90,
    basePower: 0,
    // damageCallback(pokemon, target) {
    //   return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
    // },
    category: "特殊",
    name: "カタストロフィ",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "ノーマル",
    type: "あく",
    contestType: "Tough",
  },
  せいなるつるぎ: {
    num: 533,
    accuracy: 100,
    basePower: 90,
    category: "物理",
    name: "せいなるつるぎ",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    ignoreEvasion: true,
    ignoreDefensive: true,
    secondary: null,
    target: "ノーマル",
    type: "かくとう",
    contestType: "Cool",
  },
  しおづけ: {
    num: 864,
    accuracy: 100,
    basePower: 40,
    category: "物理",
    name: "しおづけ",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    condition: {
      // noCopy: true,
      onStart(pokemon) {
        this.add("-start", pokemon, "Salt Cure");
      },
      onResidualOrder: 13,
      // onResidual(pokemon) {
      //   this.damage(pokemon.baseMaxhp / (pokemon.hasType(["Water", "Steel"]) ? 4 : 8));
      // },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Salt Cure");
      },
    },
    secondary: {
      chance: 100,
      volatileStatus: "saltcure",
    },
    target: "ノーマル",
    type: "いわ",
  },
  スケイルショット: {
    num: 799,
    accuracy: 90,
    basePower: 25,
    category: "物理",
    name: "スケイルショット",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    selfBoost: {
      boosts: {
        def: -1,
        spe: 1,
      },
    },
    secondary: null,
    target: "ノーマル",
    type: "ドラゴン",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
  },
  シャドーボール: {
    num: 247,
    accuracy: 100,
    basePower: 80,
    category: "特殊",
    name: "シャドーボール",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        spd: -1,
      },
    },
    target: "ノーマル",
    type: "ゴースト",
    contestType: "Clever",
  },
  ヘドロウェーブ: {
    num: 482,
    accuracy: 100,
    basePower: 95,
    category: "特殊",
    name: "ヘドロウェーブ",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "psn",
    },
    target: "allAdjacent",
    type: "どく",
    contestType: "Tough",
  },
  ステルスロック: {
    num: 446,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "ステルスロック",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, mustpressure: 1 },
    sideCondition: "stealthrock",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Stealth Rock");
      },
      // onEntryHazard(pokemon) {
      //   if (pokemon.hasItem("heavydutyboots")) return;
      //   const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
      //   this.damage((pokemon.maxhp * Math.pow(2, typeMod)) / 8);
      // },
    },
    secondary: null,
    target: "foeSide",
    type: "いわ",
    zMove: { boost: { def: 1 } },
    contestType: "Cool",
  },
  みがわり: {
    num: 164,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "みがわり",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, nonsky: 1 },
    volatileStatus: "substitute",
    // onTryHit(source) {
    //   if (source.volatiles["substitute"]) {
    //     this.add("-fail", source, "move: Substitute");
    //     return this.NOT_FAIL;
    //   }
    //   if (source.hp <= source.maxhp / 4 || source.maxhp === 1) {
    //     // Shedinja clause
    //     this.add("-fail", source, "move: Substitute", "[weak]");
    //     return this.NOT_FAIL;
    //   }
    // },
    // onHit(target) {
    //   this.directDamage(target.maxhp / 4);
    // },
    condition: {
      // onStart(target, source, effect) {
      //   if (effect?.id === "shedtail") {
      //     this.add("-start", target, "Substitute", "[from] move: Shed Tail");
      //   } else {
      //     this.add("-start", target, "Substitute");
      //   }
      //   this.effectState.hp = Math.floor(target.maxhp / 4);
      //   if (target.volatiles["partiallytrapped"]) {
      //     this.add("-end", target, target.volatiles["partiallytrapped"].sourceEffect, "[partiallytrapped]", "[silent]");
      //     delete target.volatiles["partiallytrapped"];
      //   }
      // },
      onTryPrimaryHitPriority: -1,
      // onTryPrimaryHit(target, source, move) {
      //   if (target === source || move.flags["bypasssub"] || move.infiltrates) {
      //     return;
      //   }
      //   let damage = this.actions.getDamage(source, target, move);
      //   if (!damage && damage !== 0) {
      //     this.add("-fail", source);
      //     this.attrLastMove("[still]");
      //     return null;
      //   }
      //   damage = this.runEvent("SubDamage", target, source, move, damage);
      //   if (!damage) {
      //     return damage;
      //   }
      //   if (damage > target.volatiles["substitute"].hp) {
      //     damage = target.volatiles["substitute"].hp as number;
      //   }
      //   target.volatiles["substitute"].hp -= damage;
      //   source.lastDamage = damage;
      //   if (target.volatiles["substitute"].hp <= 0) {
      //     if (move.ohko) this.add("-ohko");
      //     target.removeVolatile("substitute");
      //   } else {
      //     this.add("-activate", target, "move: Substitute", "[damage]");
      //   }
      //   if (move.recoil || move.id === "chloroblast") {
      //     this.damage(this.actions.calcRecoilDamage(damage, move, source), source, target, "recoil");
      //   }
      //   if (move.drain) {
      //     this.heal(Math.ceil((damage * move.drain[0]) / move.drain[1]), source, target, "drain");
      //   }
      //   this.singleEvent("AfterSubDamage", move, null, target, source, move, damage);
      //   this.runEvent("AfterSubDamage", target, source, move, damage);
      //   return this.HIT_SUBSTITUTE;
      // },
      onEnd(target) {
        this.add("-end", target, "Substitute");
      },
    },
    secondary: null,
    target: "self",
    type: "ノーマル",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute",
  },
  すいりゅうれんだ: {
    num: 818,
    accuracy: 100,
    basePower: 25,
    category: "物理",
    name: "すいりゅうれんだ",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, punch: 1, mirror: 1 },
    willCrit: true,
    multihit: 3,
    secondary: null,
    target: "ノーマル",
    type: "みず",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
  },
  つるぎのまい: {
    num: 14,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "つるぎのまい",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1 },
    boosts: {
      atk: 2,
    },
    secondary: null,
    target: "self",
    type: "ノーマル",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful",
  },
  こうごうせい: {
    num: 235,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "こうごうせい",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    // onHit(pokemon) {
    //   let factor = 0.5;
    //   switch (pokemon.effectiveWeather()) {
    //     case "sunnyday":
    //     case "desolateland":
    //       factor = 0.667;
    //       break;
    //     case "raindance":
    //     case "primordialsea":
    //     case "sandstorm":
    //     case "hail":
    //     case "snow":
    //       factor = 0.25;
    //       break;
    //   }
    //   const success = !!this.heal(this.modify(pokemon.maxhp, factor));
    //   if (!success) {
    //     this.add("-fail", pokemon, "heal");
    //     return this.NOT_FAIL;
    //   }
    //   return success;
    // },
    secondary: null,
    target: "self",
    type: "くさ",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever",
  },
  テラバースト: {
    num: 851,
    accuracy: 100,
    basePower: 80,
    category: "特殊",
    name: "テラバースト",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, mustpressure: 1 },
    // onPrepareHit(target, source, move) {
    //   if (source.terastallized) {
    //     this.attrLastMove("[anim] Tera Blast " + source.teraType);
    //   }
    // },
    // onModifyType(move, pokemon, target) {
    //   if (pokemon.terastallized) {
    //     move.type = pokemon.teraType;
    //   }
    // },
    // onModifyMove(move, pokemon) {
    //   if (pokemon.terastallized && pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true)) {
    //     move.category = "物理";
    //   }
    // },
    secondary: null,
    target: "ノーマル",
    type: "ノーマル",
  },
  でんじは: {
    num: 86,
    accuracy: 90,
    basePower: 0,
    category: "変化",
    name: "でんじは",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "par",
    ignoreImmunity: false,
    secondary: null,
    target: "ノーマル",
    type: "でんき",
    zMove: { boost: { spd: 1 } },
    contestType: "Cool",
  },
  どくどく: {
    num: 92,
    accuracy: 90,
    basePower: 0,
    category: "変化",
    name: "どくどく",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    // No Guard-like effect for Poison-type users implemented in Scripts#tryMoveHit
    status: "tox",
    secondary: null,
    target: "ノーマル",
    type: "どく",
    zMove: { boost: { def: 1 } },
    contestType: "Clever",
  },
  とんぼがえり: {
    num: 369,
    accuracy: 100,
    basePower: 70,
    category: "物理",
    name: "とんぼがえり",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "ノーマル",
    type: "むし",
    contestType: "Cute",
  },
  ふきとばし: {
    num: 18,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "ふきとばし",
    pp: 20,
    priority: -6,
    flags: { reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, wind: 1, noassist: 1, failcopycat: 1 },
    forceSwitch: true,
    secondary: null,
    target: "ノーマル",
    type: "ノーマル",
    zMove: { boost: { spd: 1 } },
    contestType: "Clever",
  },
  あくび: {
    num: 281,
    accuracy: true,
    basePower: 0,
    category: "変化",
    name: "あくび",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    volatileStatus: "yawn",
    // onTryHit(target) {
    //   if (target.status || !target.runStatusImmunity("slp")) {
    //     return false;
    //   }
    // },
    condition: {
      // noCopy: true, // doesn't get copied by Baton Pass
      duration: 2,
      // onStart(target, source) {
      //   this.add("-start", target, "move: Yawn", "[of] " + source);
      // },
      onResidualOrder: 23,
      // onEnd(target) {
      //   this.add("-end", target, "move: Yawn", "[silent]");
      //   target.trySetStatus("slp", this.effectState.source);
      // },
    },
    secondary: null,
    target: "ノーマル",
    type: "ノーマル",
    zMove: { boost: { spe: 1 } },
    contestType: "Cute",
  },
};
