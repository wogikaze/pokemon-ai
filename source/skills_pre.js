// List of flags and their descriptions can be found in sim/dex-moves.ts

const Moves = {
	"すいとる": {
		accuracy: 100,
		basePower: 20,
		category: "特殊",
		name: "すいとる",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Clever"
	},
	"アクセルロック": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "アクセルロック",
		pp: 20,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Cool"
	},
	"ようかいえき": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "ようかいえき",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
		target: "allAdjacentFoes",
		type: "どく",
		contestType: "Clever"
	},
	"とける": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "とける",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 2
		},
		secondary: null,
		target: "self",
		type: "どく",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"アシッドボム": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "アシッドボム",
		pp: 20,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spd: -2
			}
		},
		target: "normal",
		type: "どく",
		contestType: "Beautiful"
	},
	"アクロバット": {
		accuracy: 100,
		basePower: 55,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("BP doubled for no item")
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "物理",
		name: "アクロバット",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"つぼをつく": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "つぼをつく",
		pp: 30,
		priority: 0,
		flags: {},
		onHit(target) {
			const stats = []
			let stat
			for (stat in target.boosts) {
				if (target.boosts[stat] < 6) {
					stats.push(stat)
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats)
				const boost = {}
				boost[randomStat] = 2
				this.boost(boost)
			} else {
				return false
			}
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "ノーマル",
		zMove: { effect: "crit2" },
		contestType: "Tough"
	},
	"つばめがえし": {
		accuracy: true,
		basePower: 60,
		category: "物理",
		name: "つばめがえし",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1, slicing: 1 },
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"おさきにどうぞ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "おさきにどうぞ",
		pp: 15,
		priority: 0,
		flags: { bypasssub: 1, allyanim: 1 },
		onHit(target) {
			if (this.activePerHalf === 1) return false // fails in singles
			const action = this.queue.willMove(target)
			if (action) {
				this.queue.prioritizeAction(action)
				this.add("-activate", target, "move: After You")
			} else {
				return false
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"こうそくいどう": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "こうそくいどう",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spe: 2
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cool"
	},
	"エアカッター": {
		accuracy: 95,
		basePower: 60,
		category: "特殊",
		name: "エアカッター",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1, slicing: 1, wind: 1 },
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "ひこう",
		contestType: "Cool"
	},
	"エアスラッシュ": {
		accuracy: 95,
		basePower: 75,
		category: "特殊",
		name: "エアスラッシュ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, slicing: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"サイドチェンジ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "サイドチェンジ",
		pp: 15,
		priority: 2,
		flags: {},
		stallingMove: true,
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onTryHit(source) {
			if (source.side.active.length === 1) return false
			if (source.side.active.length === 3 && source.position === 1) return false
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
			const newPosition =
				pokemon.position === 0 ? pokemon.side.active.length - 1 : 0
			if (!pokemon.side.active[newPosition]) return false
			if (pokemon.side.active[newPosition].fainted) return false
			this.swapPosition(pokemon, newPosition, "[from] move: Ally Switch")
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"ドわすれ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ドわすれ",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spd: 2
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"げんしのちから": {
		accuracy: 100,
		basePower: 60,
		category: "特殊",
		name: "げんしのちから",
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
					spe: 1
				}
			}
		},
		target: "normal",
		type: "いわ",
		contestType: "Tough"
	},
	"りんごさん": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "りんごさん",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spd: -1
			}
		},
		target: "normal",
		type: "くさ"
	},
	"アクアカッター": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "アクアカッター",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"アクアジェット": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "アクアジェット",
		pp: 20,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"アクアリング": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "アクアリング",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "アクアリング",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "アクアリング")
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16)
			}
		},
		secondary: null,
		target: "self",
		type: "みず",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful"
	},
	"アクアステップ": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "アクアステップ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, dance: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1
				}
			}
		},
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"アクアテール": {
		accuracy: 90,
		basePower: 90,
		category: "物理",
		name: "アクアテール",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"アーマーキャノン": {
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "アーマーキャノン",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				def: -1,
				spd: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "ほのお"
	},
	"つっぱり": {
		accuracy: 100,
		basePower: 15,
		category: "物理",
		name: "つっぱり",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"アロマミスト": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "アロマミスト",
		pp: 20,
		priority: 0,
		flags: { bypasssub: 1 },
		boosts: {
			spd: 1
		},
		secondary: null,
		target: "adjacentAlly",
		type: "フェアリー",
		zMove: { boost: { spd: 2 } },
		contestType: "Beautiful"
	},
	"ダメおし": {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.hurtThisTurn) {
				this.debug("BP doubled on damaged target")
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "物理",
		name: "ダメおし",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Clever"
	},
	"おどろかす": {
		accuracy: 100,
		basePower: 30,
		category: "物理",
		name: "おどろかす",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "ゴースト",
		contestType: "Cute"
	},
	"アストラルビット": {
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "アストラルビット",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "ゴースト"
	},
	"こうげきしれい": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "こうげきしれい",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Clever"
	},
	"メロメロ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "メロメロ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "メロメロ",
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (
					!(pokemon.gender === "M" && source.gender === "F") &&
					!(pokemon.gender === "F" && source.gender === "M")
				) {
					this.debug("incompatible gender")
					return false
				}
				if (!this.runEvent("メロメロ", pokemon, source)) {
					this.debug("Attract event failed")
					return false
				}

				if (effect.name === "メロメロボディ") {
					this.add(
						"-start",
						pokemon,
						"メロメロ",
						"[from] ability: Cute Charm",
						"[of] " + source
					)
				} else if (effect.name === "あかいいと") {
					this.add(
						"-start",
						pokemon,
						"メロメロ",
						"[from] item: Destiny Knot",
						"[of] " + source
					)
				} else {
					this.add("-start", pokemon, "メロメロ")
				}
			},
			onUpdate(pokemon) {
				if (
					this.effectState.source &&
					!this.effectState.source.isActive &&
					pokemon.volatiles["メロメロ"]
				) {
					this.debug("Removing Attract volatile on " + pokemon)
					pokemon.removeVolatile("メロメロ")
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add(
					"-activate",
					pokemon,
					"move: Attract",
					"[of] " + this.effectState.source
				)
				if (this.randomChance(1, 2)) {
					this.add("cant", pokemon, "メロメロ")
					return false
				}
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "メロメロ", "[silent]")
			}
		},
		onTryImmunity(target, source) {
			return (
				(target.gender === "M" && source.gender === "F") ||
				(target.gender === "F" && source.gender === "M")
			)
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"はどうだん": {
		accuracy: true,
		basePower: 80,
		category: "特殊",
		name: "はどうだん",
		pp: 20,
		priority: 0,
		flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "かくとう",
		contestType: "Beautiful"
	},
	"オーラぐるま": {
		accuracy: 100,
		basePower: 110,
		category: "物理",
		name: "オーラぐるま",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1
				}
			}
		},
		onTry(source) {
			if (source.species.baseSpecies === "Morpeko") {
				return
			}
			this.attrLastMove("[still]")
			this.add("-fail", source, "move: Aura Wheel")
			this.hint(
				"Only a Pokemon whose form is Morpeko or Morpeko-Hangry can use this move."
			)
			return null
		},
		onModifyType(move, pokemon) {
			if (pokemon.species.name === "Morpeko-Hangry") {
				move.type = "Dark"
			} else {
				move.type = "Electric"
			}
		},
		target: "normal",
		type: "でんき"
	},
	"オーロラビーム": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "オーロラビーム",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1
			}
		},
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"オーロラベール": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "オーロラベール",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "オーロラベール",
		onTry() {
			return this.field.isWeather(["hail", "snow"])
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem("ひかりのねんど")) {
					return 8
				}
				return 5
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (
						(target.side.getSideCondition("リフレクター") &&
							this.getCategory(move) === "物理") ||
						(target.side.getSideCondition("ひかりのかべ") &&
							this.getCategory(move) === "特殊")
					) {
						return
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug("Aurora Veil weaken")
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096])
						return this.chainModify(0.5)
					}
				}
			},
			onSideStart(side) {
				this.add("-sidestart", side, "move: Aurora Veil")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add("-sideend", side, "move: Aurora Veil")
			}
		},
		secondary: null,
		target: "allySide",
		type: "こおり",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"ゆきなだれ": {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			)
			if (damagedByTarget) {
				this.debug("BP doubled for getting hit by " + target)
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "物理",
		name: "ゆきなだれ",
		pp: 10,
		priority: -4,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"かかとおとし": {
		accuracy: 90,
		basePower: 120,
		category: "物理",
		name: "かかとおとし",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(
				source.baseMaxhp / 2,
				source,
				source,
				this.dex.conditions.get("とびひざげり")
			)
		},
		secondary: {
			chance: 30,
			volatileStatus: "ねんりき"
		},
		target: "normal",
		type: "かくとう"
	},
	"つぶらなひとみ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "つぶらなひとみ",
		pp: 30,
		priority: 1,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		boosts: {
			atk: -1
		},
		secondary: null,
		target: "normal",
		type: "フェアリー",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"トーチカ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "トーチカ",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "トーチカ",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "move: Protect")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["まもる"]) {
					if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return
					if (move.isZ || move.isMax)
						target.getMoveHitData(move).zBrokeProtect = true
					return
				}
				if (move.smartTarget) {
					move.smartTarget = false
				} else {
					this.add("-activate", target, "move: Protect")
				}
				const lockedmove = source.getVolatile("lockedmove")
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles["lockedmove"].duration === 2) {
						delete source.volatiles["lockedmove"]
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus("psn", target)
				}
				return this.NOT_FAIL
			},
			onHit(target, source, move) {
				if (
					move.isZOrMaxPowered &&
					this.checkMoveMakesContact(move, source, target)
				) {
					source.trySetStatus("psn", target)
				}
			}
		},
		secondary: null,
		target: "self",
		type: "どく",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"どくばりセンボン": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "どくばりセンボン",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon, target) {
			if (target.status === "psn" || target.status === "tox") {
				return this.chainModify(2)
			}
		},
		secondary: {
			chance: 50,
			status: "psn"
		},
		target: "normal",
		type: "どく"
	},
	"バトンタッチ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "バトンタッチ",
		pp: 40,
		priority: 0,
		flags: {},
		onHit(target) {
			if (!this.canSwitch(target.side) || target.volatiles["commanded"]) {
				this.attrLastMove("[still]")
				this.add("-fail", target)
				return this.NOT_FAIL
			}
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true
			}
		},
		selfSwitch: "copyvolatile",
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ふくろだたき": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			const currentSpecies = move.allies.shift().species
			const bp = 5 + Math.floor(currentSpecies.baseStats.atk / 10)
			this.debug("BP for " + currentSpecies.name + " hit: " + bp)
			return bp
		},
		category: "物理",
		name: "ふくろだたき",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1 },
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(
				ally => ally === pokemon || (!ally.fainted && !ally.status)
			)
			move.multihit = move.allies.length
		},
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Clever"
	},
	"きょじゅうだん": {
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "きょじゅうだん",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, failcopycat: 1, failmimic: 1 },
		secondary: null,
		target: "normal",
		type: "はがね"
	},
	"きょじゅうざん": {
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "きょじゅうざん",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			slicing: 1,
			failcopycat: 1,
			failmimic: 1
		},
		secondary: null,
		target: "normal",
		type: "はがね"
	},
	"ゲップ": {
		accuracy: 90,
		basePower: 120,
		category: "特殊",
		name: "ゲップ",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			failmefirst: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		onDisableMove(pokemon) {
			if (!pokemon.ateBerry) pokemon.disableMove("ゲップ")
		},
		secondary: null,
		target: "normal",
		type: "どく",
		contestType: "Tough"
	},
	"はらだいこ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はらだいこ",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		onHit(target) {
			if (
				target.hp <= target.maxhp / 2 ||
				target.boosts.atk >= 6 ||
				target.maxhp === 1
			) {
				// Shedinja clause
				return false
			}
			this.directDamage(target.maxhp / 2)
			this.boost({ atk: 12 }, target)
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "heal" },
		contestType: "Cute"
	},
	"しめつける": {
		accuracy: 85,
		basePower: 15,
		category: "物理",
		name: "しめつける",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"かみつく": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "かみつく",
		pp: 25,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "あく",
		contestType: "Tough"
	},
	"むねんのつるぎ": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "むねんのつるぎ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "ほのお"
	},
	"うらみつらみ": {
		accuracy: 100,
		basePower: 75,
		category: "特殊",
		name: "うらみつらみ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1
			}
		},
		target: "normal",
		type: "ゴースト"
	},
	"ブラストバーン": {
		accuracy: 90,
		basePower: 150,
		category: "特殊",
		name: "ブラストバーン",
		pp: 5,
		priority: 0,
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "mustrecharge"
		},
		secondary: null,
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"ブレイズキック": {
		accuracy: 90,
		basePower: 85,
		category: "物理",
		name: "ブレイズキック",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Cool"
	},
	"こがらしあらし": {
		accuracy: 80,
		basePower: 100,
		category: "特殊",
		name: "こがらしあらし",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		onModifyMove(move, pokemon, target) {
			if (
				target &&
				["あまごい", "はじまりのうみ"].includes(target.effectiveWeather())
			) {
				move.accuracy = true
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1
			}
		},
		target: "allAdjacentFoes",
		type: "ひこう"
	},
	"ふぶき": {
		accuracy: 70,
		basePower: 110,
		category: "特殊",
		name: "ふぶき",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		onModifyMove(move) {
			if (this.field.isWeather(["hail", "snow"])) move.accuracy = true
		},
		secondary: {
			chance: 10,
			status: "frz"
		},
		target: "allAdjacentFoes",
		type: "こおり",
		contestType: "Beautiful"
	},
	"とおせんぼう": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "とおせんぼう",
		pp: 5,
		priority: 0,
		flags: { reflectable: 1, mirror: 1 },
		onHit(target, source, move) {
			return target.addVolatile("trapped", source, move, "trapper")
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"ブラッドムーン": {
		accuracy: 100,
		basePower: 140,
		category: "特殊",
		name: "ブラッドムーン",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル"
	},
	"ボディプレス": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "ボディプレス",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: "def",
		secondary: null,
		target: "normal",
		type: "かくとう"
	},
	"のしかかり": {
		accuracy: 100,
		basePower: 85,
		category: "物理",
		name: "のしかかり",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ボーンラッシュ": {
		accuracy: 90,
		basePower: 25,
		category: "物理",
		name: "ボーンラッシュ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "じめん",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"ばくおんぱ": {
		accuracy: 100,
		basePower: 140,
		category: "特殊",
		name: "ばくおんぱ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "ノーマル",
		contestType: "Tough"
	},
	"とびはねる": {
		accuracy: 85,
		basePower: 85,
		category: "物理",
		name: "とびはねる",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1,
			nosleeptalk: 1,
			noassist: 1,
			failinstruct: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (
					[
						"かぜおこし",
						"たつまき",
						"skyuppercut",
						"かみなり",
						"ぼうふう",
						"うちおとす",
						"thousandarrows"
					].includes(move.id)
				) {
					return
				}
				return false
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === "かぜおこし" || move.id === "たつまき") {
					return this.chainModify(2)
				}
			}
		},
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "any",
		type: "ひこう",
		contestType: "Cute"
	},
	"えだづき": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "えだづき",
		pp: 40,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "くさ"
	},
	"ブレイブバード": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ブレイブバード",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		recoil: [33, 100],
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"ワイドブレイカー": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ワイドブレイカー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1
			}
		},
		target: "allAdjacentFoes",
		type: "ドラゴン"
	},
	"かわらわり": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "かわらわり",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition("リフレクター")
			pokemon.side.removeSideCondition("ひかりのかべ")
			pokemon.side.removeSideCondition("オーロラベール")
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"しおみず": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "しおみず",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2)
			}
		},
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Tough"
	},
	"ぶんまわす": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ぶんまわす",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "あく",
		contestType: "Tough"
	},
	"バブルこうせん": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "バブルこうせん",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1
			}
		},
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"むしくい": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "むしくい",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onHit(target, source) {
			const item = target.getItem()
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add(
					"-enditem",
					target,
					item.name,
					"[from] stealeat",
					"[move] Bug Bite",
					"[of] " + source
				)
				if (this.singleEvent("Eat", item, null, source, null, null)) {
					this.runEvent("EatItem", source, null, null, item)
					if (item.id === "ヒメリのみ") target.staleness = "external"
				}
				if (item.onEat) source.ateBerry = true
			}
		},
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"むしのさざめき": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "むしのさざめき",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
		target: "normal",
		type: "むし",
		contestType: "Beautiful"
	},
	"ビルドアップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ビルドアップ",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: 1,
			def: 1
		},
		secondary: null,
		target: "self",
		type: "かくとう",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool"
	},
	"じならし": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "じならし",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "allAdjacent",
		type: "じめん",
		contestType: "Tough"
	},
	"バレットパンチ": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "バレットパンチ",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "はがね",
		contestType: "Tough"
	},
	"タネマシンガン": {
		accuracy: 100,
		basePower: 25,
		category: "物理",
		name: "タネマシンガン",
		pp: 30,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"しっとのほのお": {
		accuracy: 100,
		basePower: 70,
		category: "特殊",
		name: "しっとのほのお",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target?.statsRaisedThisTurn) {
					target.trySetStatus("brn", source, move)
				}
			}
		},
		target: "allAdjacentFoes",
		type: "ほのお",
		contestType: "Tough"
	},
	"もえつきる": {
		accuracy: 100,
		basePower: 130,
		category: "特殊",
		name: "もえつきる",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType("Fire")) return
			this.add("-fail", pokemon, "move: Burn Up")
			this.attrLastMove("[still]")
			return null
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(
					pokemon.getTypes(true).map(type => (type === "Fire" ? "???" : type))
				)
				this.add(
					"-start",
					pokemon,
					"typechange",
					pokemon.getTypes().join("/"),
					"[from] move: Burn Up"
				)
			}
		},
		secondary: null,
		target: "normal",
		type: "ほのお",
		contestType: "Clever"
	},
	"めいそう": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "めいそう",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spa: 1,
			spd: 1
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"ひけん・ちえなみ": {
		accuracy: 90,
		basePower: 65,
		category: "物理",
		name: "ひけん・ちえなみ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition("まきびし")
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition("まきびし")
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "あく"
	},
	"おいわい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "おいわい",
		pp: 40,
		priority: 0,
		flags: {
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		onTryHit(target, source) {
			this.add("-activate", target, "move: Celebrate")
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
		contestType: "Cute"
	},
	"じゅうでん": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じゅうでん",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "じゅうでん",
		condition: {
			onStart(pokemon, source, effect) {
				if (
					effect &&
					["でんきにかえる", "ふうりょくでんき"].includes(effect.name)
				) {
					this.add(
						"-start",
						pokemon,
						"じゅうでん",
						this.activeMove.name,
						"[from] ability: " + effect.name
					)
				} else {
					this.add("-start", pokemon, "じゅうでん")
				}
			},
			onRestart(pokemon, source, effect) {
				if (
					effect &&
					["でんきにかえる", "ふうりょくでんき"].includes(effect.name)
				) {
					this.add(
						"-start",
						pokemon,
						"じゅうでん",
						this.activeMove.name,
						"[from] ability: " + effect.name
					)
				} else {
					this.add("-start", pokemon, "じゅうでん")
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === "Electric") {
					this.debug("charge boost")
					return this.chainModify(2)
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.type === "Electric" && move.id !== "じゅうでん") {
					pokemon.removeVolatile("じゅうでん")
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === "Electric" && move.id !== "じゅうでん") {
					pokemon.removeVolatile("じゅうでん")
				}
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "じゅうでん", "[silent]")
			}
		},
		boosts: {
			spd: 1
		},
		secondary: null,
		target: "self",
		type: "でんき",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"チャージビーム": {
		accuracy: 90,
		basePower: 50,
		category: "特殊",
		name: "チャージビーム",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 70,
			self: {
				boosts: {
					spa: 1
				}
			}
		},
		target: "normal",
		type: "でんき",
		contestType: "Beautiful"
	},
	"あまえる": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "あまえる",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		boosts: {
			atk: -2
		},
		secondary: null,
		target: "normal",
		type: "フェアリー",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"ひやみず": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "ひやみず",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1
			}
		},
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"さむいギャグ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "さむいギャグ",
		pp: 10,
		priority: 0,
		flags: {},
		// TODO show prepare message before the "POKEMON used MOVE!" message
		// This happens even before sleep shows its "POKEMON is fast asleep." message
		weather: "snow",
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "こおり"
	},
	"クロロブラスト": {
		accuracy: 95,
		basePower: 150,
		category: "特殊",
		name: "クロロブラスト",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		// Recoil implemented in battle-actions.ts
		secondary: null,
		target: "normal",
		type: "くさ"
	},
	"ともえなげ": {
		accuracy: 90,
		basePower: 60,
		category: "物理",
		name: "ともえなげ",
		pp: 10,
		priority: -6,
		flags: { contact: 1, protect: 1, mirror: 1, noassist: 1, failcopycat: 1 },
		forceSwitch: true,
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"スケイルノイズ": {
		accuracy: 100,
		basePower: 110,
		category: "特殊",
		name: "スケイルノイズ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		selfBoost: {
			boosts: {
				def: -1
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "ドラゴン",
		contestType: "Tough"
	},
	"ソウルビート": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "ソウルビート",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, sound: 1, dance: 1 },
		onTry(source) {
			if (source.hp <= (source.maxhp * 33) / 100 || source.maxhp === 1)
				return false
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts)) return null
			delete move.boosts
		},
		onHit(pokemon) {
			this.directDamage((pokemon.maxhp * 33) / 100)
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1
		},
		secondary: null,
		target: "self",
		type: "ドラゴン"
	},
	"クリアスモッグ": {
		accuracy: true,
		basePower: 50,
		category: "特殊",
		name: "クリアスモッグ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts()
			this.add("-clearboost", target)
		},
		secondary: null,
		target: "normal",
		type: "どく",
		contestType: "Beautiful"
	},
	"インファイト": {
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
				spd: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"コーチング": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "コーチング",
		pp: 10,
		priority: 0,
		flags: { bypasssub: 1, allyanim: 1 },
		secondary: null,
		boosts: {
			atk: 1,
			def: 1
		},
		target: "adjacentAlly",
		type: "かくとう"
	},
	"とぐろをまく": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "とぐろをまく",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: 1,
			def: 1,
			accuracy: 1
		},
		secondary: null,
		target: "self",
		type: "どく",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"アクセルブレイク": {
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "アクセルブレイク",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`collision course super effective buff`)
				return this.chainModify([5461, 4096])
			}
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"ほうふく": {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			const lastDamagedBy = pokemon.getLastDamagedBy(true)
			if (lastDamagedBy !== undefined) {
				return lastDamagedBy.damage * 1.5 || 1
			}
			return 0
		},
		category: "物理",
		name: "ほうふく",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, failmefirst: 1 },
		onTry(source) {
			const lastDamagedBy = source.getLastDamagedBy(true)
			if (lastDamagedBy === undefined || !lastDamagedBy.thisTurn) return false
		},
		onModifyTarget(targetRelayVar, source, target, move) {
			const lastDamagedBy = source.getLastDamagedBy(true)
			if (lastDamagedBy) {
				targetRelayVar.target = this.getAtSlot(lastDamagedBy.slot)
			}
		},
		secondary: null,
		target: "scripted",
		type: "あく",
		contestType: "Cool"
	},
	"ないしょばなし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ないしょばなし",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		boosts: {
			spa: -1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute"
	},
	"あやしいひかり": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "あやしいひかり",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "ねんりき",
		secondary: null,
		target: "normal",
		type: "ゴースト",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"ねんりき": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "ねんりき",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: "ねんりき"
		},
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"まねっこ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "まねっこ",
		pp: 20,
		priority: 0,
		flags: {
			failencore: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		onHit(pokemon) {
			let move = this.lastMove
			if (!move) return

			if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove)
			if (move.flags["failcopycat"] || move.isZ || move.isMax) {
				return false
			}
			this.actions.useMove(move.id, pokemon)
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"ふしょくガス": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "ふしょくガス",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onHit(target, source) {
			const item = target.takeItem(source)
			if (item) {
				this.add(
					"-enditem",
					target,
					item.name,
					"[from] move: Corrosive Gas",
					"[of] " + source
				)
			} else {
				this.add("-fail", target, "move: Corrosive Gas")
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "どく"
	},
	"コスモパワー": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "コスモパワー",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1,
			spd: 1
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"コットンガード": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "コットンガード",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 3
		},
		secondary: null,
		target: "self",
		type: "くさ",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"わたほうし": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "わたほうし",
		pp: 40,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			spe: -2
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "くさ",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"カウンター": {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles["カウンター"]) return 0
			return pokemon.volatiles["カウンター"].damage || 1
		},
		category: "物理",
		name: "カウンター",
		pp: 20,
		priority: -5,
		flags: {
			contact: 1,
			protect: 1,
			failmefirst: 1,
			noassist: 1,
			failcopycat: 1
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile("カウンター")
		},
		onTry(source) {
			if (!source.volatiles["カウンター"]) return false
			if (source.volatiles["カウンター"].slot === null) return false
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectState.slot = null
				this.effectState.damage = 0
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2, move) {
				if (move.id !== "カウンター") return
				if (source !== this.effectState.target || !this.effectState.slot) return
				return this.getAtSlot(this.effectState.slot)
			},
			onDamagingHit(damage, target, source, move) {
				if (!source.isAlly(target) && this.getCategory(move) === "物理") {
					this.effectState.slot = source.getSlot()
					this.effectState.damage = 2 * damage
				}
			}
		},
		secondary: null,
		target: "scripted",
		type: "かくとう",
		maxMove: { basePower: 75 },
		contestType: "Tough"
	},
	"コートチェンジ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "コートチェンジ",
		pp: 10,
		priority: 0,
		flags: { mirror: 1 },
		onHitField(target, source) {
			const sideConditions = [
				"しろいきり",
				"ひかりのかべ",
				"リフレクター",
				"まきびし",
				"しんぴのまもり",
				"おいかぜ",
				"どくびし",
				"ステルスロック",
				"みずのちかい",
				"ほのおのちかい",
				"くさのちかい",
				"ねばねばネット",
				"オーロラベール",
				"gmaxsteelsurge",
				"gmaxcannonade",
				"gmaxvinelash",
				"gmaxwildfire"
			]
			let success = false
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1
				// the list of all sides in counterclockwise order
				const sides = [
					this.sides[0],
					this.sides[2],
					this.sides[1],
					this.sides[3]
				]
				const temp = { 0: {}, 1: {}, 2: {}, 3: {} }
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue
						temp[side.n][id] = side.sideConditions[id]
						delete side.sideConditions[id]
						const effectName = this.dex.conditions.get(id).name
						this.add("-sideend", side, effectName, "[silent]")
						success = true
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n]
					const targetSide = sides[(i + offset) % 4] // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id]
						const effectName = this.dex.conditions.get(id).name
						let layers = sourceSideConditions[id].layers || 1
						for (; layers > 0; layers--)
							this.add("-sidestart", targetSide, effectName, "[silent]")
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions
				const targetSideConditions = source.side.foe.sideConditions
				const sourceTemp = {}
				const targetTemp = {}
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue
					sourceTemp[id] = sourceSideConditions[id]
					delete sourceSideConditions[id]
					success = true
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue
					targetTemp[id] = targetSideConditions[id]
					delete targetSideConditions[id]
					success = true
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id]
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id]
				}
				this.add("-swapsideconditions")
			}
			if (!success) return false
			this.add("-activate", source, "move: Court Change")
		},
		secondary: null,
		target: "all",
		type: "ノーマル"
	},
	"ほしがる": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ほしがる",
		pp: 25,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			failmefirst: 1,
			noassist: 1,
			failcopycat: 1
		},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles["gem"]) {
				return
			}
			const yourItem = target.takeItem(source)
			if (!yourItem) {
				return
			}
			if (
				!this.singleEvent(
					"TakeItem",
					yourItem,
					target.itemState,
					source,
					target,
					move,
					yourItem
				) ||
				!source.setItem(yourItem)
			) {
				target.item = yourItem.id // bypass setItem so we don't break choicelock or anything
				return
			}
			this.add(
				"-item",
				source,
				yourItem,
				"[from] move: Covet",
				"[of] " + target
			)
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"クラブハンマー": {
		accuracy: 90,
		basePower: 100,
		category: "物理",
		name: "クラブハンマー",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Tough"
	},
	"クロスチョップ": {
		accuracy: 80,
		basePower: 100,
		category: "物理",
		name: "クロスチョップ",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"クロスポイズン": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "クロスポイズン",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: {
			chance: 10,
			status: "psn"
		},
		critRatio: 2,
		target: "normal",
		type: "どく",
		contestType: "Cool"
	},
	"かみくだく": {
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
				def: -1
			}
		},
		target: "normal",
		type: "あく",
		contestType: "Tough"
	},
	"ブレイククロー": {
		accuracy: 95,
		basePower: 75,
		category: "物理",
		name: "ブレイククロー",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"のろい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "のろい",
		pp: 10,
		priority: 0,
		flags: { bypasssub: 1 },
		volatileStatus: "のろい",
		onModifyMove(move, source, target) {
			if (!source.hasType("Ghost")) {
				move.target = move.nonGhostTarget
			} else if (source.isAlly(target)) {
				move.target = "randomNormal"
			}
		},
		onTryHit(target, source, move) {
			if (!source.hasType("Ghost")) {
				delete move.volatileStatus
				delete move.onHit
				move.self = { boosts: { spe: -1, atk: 1, def: 1 } }
			} else if (move.volatileStatus && target.volatiles["のろい"]) {
				return false
			}
		},
		onHit(target, source) {
			this.directDamage(source.maxhp / 2, source, source)
		},
		condition: {
			onStart(pokemon, source) {
				this.add("-start", pokemon, "のろい", "[of] " + source)
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4)
			}
		},
		secondary: null,
		target: "normal",
		nonGhostTarget: "self",
		type: "ゴースト",
		zMove: { effect: "のろい" },
		contestType: "Tough"
	},
	"いあいぎり": {
		accuracy: 95,
		basePower: 50,
		category: "物理",
		name: "いあいぎり",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"DDラリアット": {
		accuracy: 100,
		basePower: 85,
		category: "物理",
		name: "DDラリアット",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Cool"
	},
	"あくのはどう": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "あくのはどう",
		pp: 15,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "flinch"
		},
		target: "any",
		type: "あく",
		contestType: "Cool"
	},
	"ダークホール": {
		accuracy: 50,
		basePower: 0,
		category: "Status",
		name: "ダークホール",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "slp",
		onTry(source, target, move) {
			if (source.species.name === "Darkrai" || move.hasBounced) {
				return
			}
			this.add("-fail", source, "move: Dark Void")
			this.hint("Only a Pokemon whose form is Darkrai can use this move.")
			return null
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "あく",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"マジカルシャイン": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "マジカルシャイン",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "フェアリー",
		contestType: "Beautiful"
	},
	"ぼうぎょしれい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ぼうぎょしれい",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1,
			spd: 1
		},
		secondary: null,
		target: "self",
		type: "むし",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"まるくなる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "まるくなる",
		pp: 40,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1
		},
		volatileStatus: "まるくなる",
		condition: {
			noCopy: true,
			onRestart: () => null
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"きりばらい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "きりばらい",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		onHit(target, source, move) {
			let success = false
			if (!target.volatiles["みがわり"] || move.infiltrates)
				success = !!this.boost({ evasion: -1 })
			const removeTarget = [
				"リフレクター",
				"ひかりのかべ",
				"オーロラベール",
				"しんぴのまもり",
				"しろいきり",
				"まきびし",
				"どくびし",
				"ステルスロック",
				"ねばねばネット",
				"gmaxsteelsurge"
			]
			const removeAll = [
				"まきびし",
				"どくびし",
				"ステルスロック",
				"ねばねばネット",
				"gmaxsteelsurge"
			]
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue
					this.add(
						"-sideend",
						target.side,
						this.dex.conditions.get(targetCondition).name,
						"[from] move: Defog",
						"[of] " + source
					)
					success = true
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add(
						"-sideend",
						source.side,
						this.dex.conditions.get(sideCondition).name,
						"[from] move: Defog",
						"[of] " + source
					)
					success = true
				}
			}
			this.field.clearTerrain()
			return success
		},
		secondary: null,
		target: "normal",
		type: "ひこう",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cool"
	},
	"みちづれ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みちづれ",
		pp: 5,
		priority: 0,
		flags: { bypasssub: 1, noassist: 1, failcopycat: 1 },
		volatileStatus: "みちづれ",
		onPrepareHit(pokemon) {
			return !pokemon.removeVolatile("みちづれ")
		},
		condition: {
			onStart(pokemon) {
				this.add("-singlemove", pokemon, "みちづれ")
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.isAlly(source)) return
				if (effect.effectType === "Move" && !effect.flags["futuremove"]) {
					if (source.volatiles["dynamax"]) {
						this.add("-hint", "Dynamaxed Pokémon are immune to Destiny Bond.")
						return
					}
					this.add("-activate", target, "move: Destiny Bond")
					source.faint()
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === "みちづれ") return
				this.debug("removing Destiny Bond before attack")
				pokemon.removeVolatile("みちづれ")
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile("みちづれ")
			}
		},
		secondary: null,
		target: "self",
		type: "ゴースト",
		zMove: { effect: "redirect" },
		contestType: "Clever"
	},
	"みきり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みきり",
		pp: 5,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "まもる",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
		},
		secondary: null,
		target: "self",
		type: "かくとう",
		zMove: { boost: { evasion: 1 } },
		contestType: "Cool"
	},
	"ダイヤストーム": {
		accuracy: 95,
		basePower: 100,
		category: "物理",
		name: "ダイヤストーム",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			chance: 50,
			boosts: {
				def: 2
			}
		},
		secondary: {
			// Sheer Force negates the self even though it is not secondary
		},
		target: "allAdjacentFoes",
		type: "いわ",
		contestType: "Beautiful"
	},
	"あなをほる": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "あなをほる",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			nonsky: 1,
			nosleeptalk: 1,
			noassist: 1,
			failinstruct: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === "すなあらし" || type === "hail") return false
			},
			onInvulnerability(target, source, move) {
				if (["じしん", "magnitude"].includes(move.id)) {
					return
				}
				return false
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === "じしん" || move.id === "magnitude") {
					return this.chainModify(2)
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "じめん",
		contestType: "Tough"
	},
	"かなしばり": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "かなしばり",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "かなしばり",
		onTryHit(target) {
			if (
				!target.lastMove ||
				target.lastMove.isZ ||
				target.lastMove.isMax ||
				target.lastMove.id === "わるあがき"
			) {
				return false
			}
		},
		condition: {
			duration: 5,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				// The target hasn't taken its turn, or Cursed Body activated and the move was not used through Dancer or Instruct
				if (
					this.queue.willMove(pokemon) ||
					(pokemon === this.activePokemon &&
						this.activeMove &&
						!this.activeMove.isExternal)
				) {
					this.effectState.duration--
				}
				if (!pokemon.lastMove) {
					this.debug(`Pokemon hasn't moved yet`)
					return false
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id) {
						if (!moveSlot.pp) {
							this.debug("Move out of PP")
							return false
						}
					}
				}
				if (effect.effectType === "Ability") {
					this.add(
						"-start",
						pokemon,
						"かなしばり",
						pokemon.lastMove.name,
						"[from] ability: Cursed Body",
						"[of] " + source
					)
				} else {
					this.add("-start", pokemon, "かなしばり", pokemon.lastMove.name)
				}
				this.effectState.move = pokemon.lastMove.id
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add("-end", pokemon, "かなしばり")
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && move.id === this.effectState.move) {
					this.add("cant", attacker, "かなしばり", move)
					return false
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id)
					}
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"チャームボイス": {
		accuracy: true,
		basePower: 40,
		category: "特殊",
		name: "チャームボイス",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "フェアリー",
		contestType: "Cute"
	},
	"ほうでん": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ほうでん",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "allAdjacent",
		type: "でんき",
		contestType: "Beautiful"
	},
	"フェイタルクロー": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "フェイタルクロー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3)
				if (result === 0) {
					target.trySetStatus("psn", source)
				} else if (result === 1) {
					target.trySetStatus("par", source)
				} else {
					target.trySetStatus("slp", source)
				}
			}
		},
		target: "normal",
		type: "どく"
	},
	"ダイビング": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "ダイビング",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			nonsky: 1,
			allyanim: 1,
			nosleeptalk: 1,
			noassist: 1,
			failinstruct: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			if (
				attacker.hasAbility("うのミサイル") &&
				attacker.species.name === "Cramorant" &&
				!attacker.transformed
			) {
				const forme =
					attacker.hp <= attacker.maxhp / 2
						? "cramorantgorging"
						: "cramorantgulping"
				attacker.formeChange(forme, move)
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === "すなあらし" || type === "hail") return false
			},
			onInvulnerability(target, source, move) {
				if (["なみのり", "うずしお"].includes(move.id)) {
					return
				}
				return false
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === "なみのり" || move.id === "うずしお") {
					return this.chainModify(2)
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"うつしえ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "うつしえ",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			let success = false
			for (const pokemon of source.alliesAndSelf()) {
				if (pokemon.ability === target.ability) continue
				const oldAbility = pokemon.setAbility(target.ability)
				if (oldAbility) {
					this.add(
						"-ability",
						pokemon,
						target.getAbility().name,
						"[from] move: Doodle"
					)
					success = true
				} else if (!success && oldAbility === null) {
					success = null
				}
			}
			if (!success) {
				if (success === false) {
					this.add("-fail", source)
				}
				this.attrLastMove("[still]")
				return this.NOT_FAIL
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "ノーマル"
	},
	"はめつのねがい": {
		accuracy: 100,
		basePower: 140,
		category: "特殊",
		name: "はめつのねがい",
		pp: 5,
		priority: 0,
		flags: { futuremove: 1 },
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, "futuremove")) return false
			Object.assign(target.side.slotConditions[target.position]["futuremove"], {
				move: "はめつのねがい",
				source: source,
				moveData: {
					id: "はめつのねがい",
					name: "はめつのねがい",
					accuracy: 100,
					basePower: 140,
					category: "特殊",
					priority: 0,
					flags: { futuremove: 1 },
					effectType: "Move",
					type: "はがね"
				}
			})
			this.add("-start", source, "はめつのねがい")
			return this.NOT_FAIL
		},
		secondary: null,
		target: "normal",
		type: "はがね",
		contestType: "Beautiful"
	},
	"すてみタックル": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "すてみタックル",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ダブルアタック": {
		accuracy: 90,
		basePower: 35,
		category: "物理",
		name: "ダブルアタック",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 140 },
		maxMove: { basePower: 120 },
		contestType: "Cool"
	},
	"にどげり": {
		accuracy: 100,
		basePower: 30,
		category: "物理",
		name: "にどげり",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "かくとう",
		maxMove: { basePower: 80 },
		contestType: "Cool"
	},
	"でんこうそうげき": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "でんこうそうげき",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType("Electric")) return
			this.add("-fail", pokemon, "move: Double Shock")
			this.attrLastMove("[still]")
			return null
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(
					pokemon
						.getTypes(true)
						.map(type => (type === "Electric" ? "???" : type))
				)
				this.add(
					"-start",
					pokemon,
					"typechange",
					pokemon.getTypes().join("/"),
					"[from] move: Double Shock"
				)
			}
		},
		secondary: null,
		target: "normal",
		type: "でんき",
		contestType: "Clever"
	},
	"かげぶんしん": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "かげぶんしん",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			evasion: 1
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cool"
	},
	"りゅうせいぐん": {
		accuracy: 90,
		basePower: 130,
		category: "特殊",
		name: "りゅうせいぐん",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -2
			}
		},
		secondary: null,
		target: "normal",
		type: "ドラゴン",
		contestType: "Beautiful"
	},
	"ガリョウテンセイ": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ガリョウテンセイ",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		self: {
			boosts: {
				def: -1,
				spd: -1
			}
		},
		target: "any",
		type: "ひこう",
		contestType: "Beautiful"
	},
	"りゅうのいぶき": {
		accuracy: 100,
		basePower: 60,
		category: "特殊",
		name: "りゅうのいぶき",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "ドラゴン",
		contestType: "Cool"
	},
	"ドラゴンクロー": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "ドラゴンクロー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ドラゴン",
		contestType: "Cool"
	},
	"りゅうのまい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "りゅうのまい",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, dance: 1 },
		boosts: {
			atk: 1,
			spe: 1
		},
		secondary: null,
		target: "self",
		type: "ドラゴン",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cool"
	},
	"ドラゴンアロー": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "ドラゴンアロー",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, noparentalbond: 1 },
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "ドラゴン",
		maxMove: { basePower: 130 }
	},
	"ドラゴンエナジー": {
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = (move.basePower * pokemon.hp) / pokemon.maxhp
			this.debug("BP: " + bp)
			return bp
		},
		category: "特殊",
		name: "ドラゴンエナジー",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "ドラゴン"
	},
	"りゅうのはどう": {
		accuracy: 100,
		basePower: 85,
		category: "特殊",
		name: "りゅうのはどう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "ドラゴン",
		contestType: "Beautiful"
	},
	"ドラゴンダイブ": {
		accuracy: 75,
		basePower: 100,
		category: "物理",
		name: "ドラゴンダイブ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "ドラゴン",
		contestType: "Tough"
	},
	"ドラゴンテール": {
		accuracy: 90,
		basePower: 60,
		category: "物理",
		name: "ドラゴンテール",
		pp: 10,
		priority: -6,
		flags: { contact: 1, protect: 1, mirror: 1, noassist: 1, failcopycat: 1 },
		forceSwitch: true,
		target: "normal",
		type: "ドラゴン",
		contestType: "Tough"
	},
	"ドレインキッス": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "ドレインキッス",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "フェアリー",
		contestType: "Cute"
	},
	"ドレインパンチ": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "ドレインパンチ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"ゆめくい": {
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "ゆめくい",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		onTryImmunity(target) {
			return target.status === "slp" || target.hasAbility("ぜったいねむり")
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"ドリルくちばし": {
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
		contestType: "Cool"
	},
	"ドリルライナー": {
		accuracy: 95,
		basePower: 80,
		category: "物理",
		name: "ドリルライナー",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "じめん",
		contestType: "Tough"
	},
	"ドラムアタック": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "ドラムアタック",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "normal",
		type: "くさ"
	},
	"ダブルウイング": {
		accuracy: 90,
		basePower: 40,
		category: "物理",
		name: "ダブルウイング",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "ひこう",
		maxMove: { basePower: 130 }
	},
	"ダイマックスほう": {
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "ダイマックスほう",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			failencore: 1,
			nosleeptalk: 1,
			noparentalbond: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		secondary: null,
		target: "normal",
		type: "ドラゴン"
	},
	"ばくれつパンチ": {
		accuracy: 50,
		basePower: 100,
		category: "物理",
		name: "ばくれつパンチ",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 100,
			volatileStatus: "ねんりき"
		},
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"だいちのちから": {
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
				spd: -1
			}
		},
		target: "normal",
		type: "じめん",
		contestType: "Beautiful"
	},
	"じしん": {
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
		contestType: "Tough"
	},
	"エコーボイス": {
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower
			if (this.field.pseudoWeather.echoedvoice) {
				bp = move.basePower * this.field.pseudoWeather.echoedvoice.multiplier
			}
			this.debug("BP: " + move.basePower)
			return bp
		},
		category: "特殊",
		name: "エコーボイス",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		onTry() {
			this.field.addPseudoWeather("エコーボイス")
		},
		condition: {
			duration: 2,
			onFieldStart() {
				this.effectState.multiplier = 1
			},
			onFieldRestart() {
				if (this.effectState.duration !== 2) {
					this.effectState.duration = 2
					if (this.effectState.multiplier < 5) {
						this.effectState.multiplier++
					}
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"かいでんぱ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "かいでんぱ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			spa: -2
		},
		secondary: null,
		target: "normal",
		type: "でんき",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"ぶきみなじゅもん": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ぶきみなじゅもん",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 100,
			onHit(target) {
				if (!target.hp) return
				let move = target.lastMove
				if (!move || move.isZ) return
				if (move.isMax && move.baseMove)
					move = this.dex.moves.get(move.baseMove)

				const ppDeducted = target.deductPP(move.id, 3)
				if (!ppDeducted) return
				this.add(
					"-activate",
					target,
					"move: Eerie Spell",
					move.name,
					ppDeducted
				)
			}
		},
		target: "normal",
		type: "エスパー"
	},
	"エレキフィールド": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "エレキフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "エレキフィールド",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("グランドコート")) {
					return 8
				}
				return 5
			},
			onSetStatus(status, target, source, effect) {
				if (
					status.id === "slp" &&
					target.isGrounded() &&
					!target.isSemiInvulnerable()
				) {
					if (
						effect.id === "あくび" ||
						(effect.effectType === "Move" && !effect.secondaries)
					) {
						this.add("-activate", target, "move: Electric Terrain")
					}
					return false
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return
				if (status.id === "あくび") {
					this.add("-activate", target, "move: Electric Terrain")
					return null
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (
					move.type === "Electric" &&
					attacker.isGrounded() &&
					!attacker.isSemiInvulnerable()
				) {
					this.debug("electric terrain boost")
					return this.chainModify([5325, 4096])
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === "Ability") {
					this.add(
						"-fieldstart",
						"move: Electric Terrain",
						"[from] ability: " + effect.name,
						"[of] " + source
					)
				} else {
					this.add("-fieldstart", "move: Electric Terrain")
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add("-fieldend", "move: Electric Terrain")
			}
		},
		secondary: null,
		target: "all",
		type: "でんき",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"エレキボール": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat("spe") / target.getStat("spe"))
			if (!isFinite(ratio)) ratio = 0
			const bp = [40, 60, 80, 120, 150][Math.min(ratio, 4)]
			this.debug("BP: " + bp)
			return bp
		},
		category: "特殊",
		name: "エレキボール",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "でんき",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"イナズマドライブ": {
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "イナズマドライブ",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`electro drift super effective buff`)
				return this.chainModify([5461, 4096])
			}
		},
		secondary: null,
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"エレキネット": {
		accuracy: 95,
		basePower: 55,
		category: "特殊",
		name: "エレキネット",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "allAdjacentFoes",
		type: "でんき",
		contestType: "Beautiful"
	},
	"ひのこ": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "ひのこ",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Cute"
	},
	"アンコール": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "アンコール",
		pp: 5,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			bypasssub: 1,
			failencore: 1
		},
		volatileStatus: "アンコール",
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move = target.lastMove
				if (!move || target.volatiles["dynamax"]) return false

				if (move.isMax && move.baseMove)
					move = this.dex.moves.get(move.baseMove)
				const moveIndex = target.moves.indexOf(move.id)
				if (
					move.isZ ||
					move.flags["failencore"] ||
					!target.moveSlots[moveIndex] ||
					target.moveSlots[moveIndex].pp <= 0
				) {
					// it failed
					return false
				}
				this.effectState.move = move.id
				this.add("-start", target, "アンコール")
				if (!this.queue.willMove(target)) {
					this.effectState.duration++
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (
					!target.moves.includes(this.effectState.move) ||
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0
				) {
					// early termination if you run out of PP
					target.removeVolatile("アンコール")
				}
			},
			onEnd(target) {
				this.add("-end", target, "アンコール")
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id)
					}
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"がむしゃら": {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon, target) {
			return target.getUndynamaxedHP() - pokemon.hp
		},
		category: "物理",
		name: "がむしゃら",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, noparentalbond: 1 },
		onTryImmunity(target, pokemon) {
			return pokemon.hp < target.hp
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"こらえる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "こらえる",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "こらえる",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "move: Endure")
			},
			onDamagePriority: -10,
			onDamage(damage, target, source, effect) {
				if (effect?.effectType === "Move" && damage >= target.hp) {
					this.add("-activate", target, "move: Endure")
					return target.hp - 1
				}
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"エナジーボール": {
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
				spd: -1
			}
		},
		target: "normal",
		type: "くさ",
		contestType: "Beautiful"
	},
	"なかまづくり": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "なかまづくり",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onTryHit(target, source) {
			if (target === source || target.volatiles["dynamax"]) return false

			const additionalBannedSourceAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				"しれいとう",
				"フラワーギフト",
				"てんきや",
				"はらぺこスイッチ",
				"イリュージョン",
				"かわりもの",
				"かがくへんかガス",
				"かがくのちから",
				"レシーバー",
				"トレース",
				"ダルマモード"
			]
			if (
				target.ability === source.ability ||
				target.getAbility().isPermanent ||
				target.ability === "なまけ" ||
				source.getAbility().isPermanent ||
				additionalBannedSourceAbilities.includes(source.ability)
			) {
				return false
			}
		},
		onHit(target, source) {
			const oldAbility = target.setAbility(source.ability)
			if (oldAbility) {
				this.add(
					"-ability",
					target,
					target.getAbility().name,
					"[from] move: Entrainment"
				)
				if (!target.isAlly(source)) target.volatileStaleness = "external"
				return
			}
			return oldAbility
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute"
	},
	"ふんか": {
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = (move.basePower * pokemon.hp) / pokemon.maxhp
			this.debug("BP: " + bp)
			return bp
		},
		category: "特殊",
		name: "ふんか",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"オーラウイング": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "オーラウイング",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1
				}
			}
		},
		target: "normal",
		type: "エスパー"
	},
	"ワイドフォース": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ワイドフォース",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower, source) {
			if (this.field.isTerrain("サイコフィールド") && source.isGrounded()) {
				this.debug("terrain buff")
				return this.chainModify(1.5)
			}
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain("サイコフィールド") && source.isGrounded()) {
				move.target = "allAdjacentFoes"
			}
		},
		secondary: null,
		target: "normal",
		type: "エスパー"
	},
	"だいばくはつ": {
		accuracy: 100,
		basePower: 250,
		category: "物理",
		name: "だいばくはつ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, noparentalbond: 1 },
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"じんつうりき": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "じんつうりき",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "エスパー",
		contestType: "Cool"
	},
	"しんそく": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "しんそく",
		pp: 5,
		priority: 2,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"からげんき": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "からげんき",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== "slp") {
				return this.chainModify(2)
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"フェアリーロック": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "フェアリーロック",
		pp: 10,
		priority: 0,
		flags: { mirror: 1, bypasssub: 1 },
		pseudoWeather: "フェアリーロック",
		condition: {
			duration: 2,
			onFieldStart(target) {
				this.add("-fieldactivate", "move: Fairy Lock")
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap()
			}
		},
		secondary: null,
		target: "all",
		type: "フェアリー",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"ようせいのかぜ": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "ようせいのかぜ",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: null,
		target: "normal",
		type: "フェアリー",
		contestType: "Beautiful"
	},
	"ねこだまし": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "ねこだまし",
		pp: 10,
		priority: 3,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Fake Out only works on your first turn out.")
				return false
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"うそなき": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "うそなき",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		boosts: {
			spd: -2
		},
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"どげざつき": {
		accuracy: true,
		basePower: 80,
		category: "物理",
		name: "どげざつき",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "あく"
	},
	"みねうち": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "みねうち",
		pp: 40,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onDamagePriority: -20,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp) return target.hp - 1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"フェザーダンス": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "フェザーダンス",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, dance: 1 },
		boosts: {
			atk: -2
		},
		secondary: null,
		target: "normal",
		type: "ひこう",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful"
	},
	"フェイント": {
		accuracy: 100,
		basePower: 30,
		category: "物理",
		name: "フェイント",
		pp: 10,
		priority: 2,
		flags: { mirror: 1, noassist: 1, failcopycat: 1 },
		breaksProtect: true,
		// Breaking protection implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Clever"
	},
	"とどめばり": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "とどめばり",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0)
				this.boost({ atk: 3 }, pokemon, pokemon, move)
		},
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cool"
	},
	"ほのおのまい": {
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
					spa: 1
				}
			}
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"もえあがるいかり": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "もえあがるいかり",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "flinch"
		},
		target: "allAdjacentFoes",
		type: "あく"
	},
	"みをけずる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みをけずる",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		onTry(source) {
			if (source.hp <= source.maxhp / 2 || source.maxhp === 1) return false
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts)) return null
			delete move.boosts
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 2)
		},
		boosts: {
			atk: 2,
			spa: 2,
			spe: 2
		},
		secondary: null,
		target: "self",
		type: "ノーマル"
	},
	"いのちがけ": {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			const damage = pokemon.hp
			pokemon.faint()
			return damage
		},
		selfdestruct: "ifHit",
		category: "特殊",
		name: "いのちがけ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, noparentalbond: 1 },
		secondary: null,
		target: "normal",
		type: "かくとう",
		zMove: { basePower: 180 },
		contestType: "Tough"
	},
	"だいもんじ": {
		accuracy: 85,
		basePower: 110,
		category: "特殊",
		name: "だいもんじ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"ほのおのキバ": {
		accuracy: 95,
		basePower: 65,
		category: "物理",
		name: "ほのおのキバ",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondaries: [
			{
				chance: 10,
				status: "brn"
			},
			{
				chance: 10,
				volatileStatus: "flinch"
			}
		],
		target: "normal",
		type: "ほのお",
		contestType: "Cool"
	},
	"ほのおのムチ": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "ほのおのムチ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "ほのお",
		contestType: "Cute"
	},
	"ほのおのちかい": {
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (["くさのちかい", "みずのちかい"].includes(move.sourceEffect)) {
				this.add("-combine")
				return 150
			}
			return 80
		},
		category: "特殊",
		name: "ほのおのちかい",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1 },
		onPrepareHit(target, source, move) {
			for (const action of this.queue.list) {
				if (
					!action.move ||
					!action.pokemon?.isActive ||
					action.pokemon.fainted ||
					action.maxMove ||
					action.zmove
				) {
					continue
				}
				if (
					action.pokemon.isAlly(source) &&
					["くさのちかい", "みずのちかい"].includes(action.move.id)
				) {
					this.queue.prioritizeAction(action, move)
					this.add("-waiting", source, action.pokemon)
					return null
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === "みずのちかい") {
				move.type = "Water"
				move.forceSTAB = true
				move.self = { sideCondition: "みずのちかい" }
			}
			if (move.sourceEffect === "くさのちかい") {
				move.type = "Fire"
				move.forceSTAB = true
				move.sideCondition = "ほのおのちかい"
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add("-sidestart", targetSide, "ほのおのちかい")
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(pokemon) {
				if (!pokemon.hasType("Fire"))
					this.damage(pokemon.baseMaxhp / 8, pokemon)
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 8,
			onSideEnd(targetSide) {
				this.add("-sideend", targetSide, "ほのおのちかい")
			}
		},
		secondary: null,
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"ほのおのパンチ": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "ほのおのパンチ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Tough"
	},
	"ほのおのうず": {
		accuracy: 85,
		basePower: 35,
		category: "特殊",
		name: "ほのおのうず",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"であいがしら": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "であいがしら",
		pp: 10,
		priority: 2,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("First Impression only works on your first turn out.")
				return false
			}
		},
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"じわれ": {
		accuracy: 30,
		basePower: 0,
		category: "物理",
		name: "じわれ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		ohko: true,
		secondary: null,
		target: "normal",
		type: "じめん",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"じたばた": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const ratio = Math.max(Math.floor((pokemon.hp * 48) / pokemon.maxhp), 1)
			let bp
			if (ratio < 2) {
				bp = 200
			} else if (ratio < 5) {
				bp = 150
			} else if (ratio < 10) {
				bp = 100
			} else if (ratio < 17) {
				bp = 80
			} else if (ratio < 33) {
				bp = 40
			} else {
				bp = 20
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "じたばた",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cute"
	},
	"ニトロチャージ": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "ニトロチャージ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1
				}
			}
		},
		target: "normal",
		type: "ほのお",
		contestType: "Cool"
	},
	"かえんぐるま": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "かえんぐるま",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"かえんほうしゃ": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "かえんほうしゃ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"フレアドライブ": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "フレアドライブ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, defrost: 1 },
		recoil: [33, 100],
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Cool"
	},
	"ラスターカノン": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ラスターカノン",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
		target: "normal",
		type: "はがね",
		contestType: "Beautiful"
	},
	"おだてる": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "おだてる",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		volatileStatus: "ねんりき",
		boosts: {
			spa: 1
		},
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"フルールカノン": {
		accuracy: 90,
		basePower: 130,
		category: "特殊",
		name: "フルールカノン",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -2
			}
		},
		secondary: null,
		target: "normal",
		type: "フェアリー",
		contestType: "Beautiful"
	},
	"なげつける": {
		accuracy: 100,
		basePower: 0,
		category: "物理",
		name: "なげつける",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, noparentalbond: 1 },
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false
			const item = source.getItem()
			if (
				!this.singleEvent(
					"TakeItem",
					item,
					source.itemState,
					source,
					source,
					move,
					item
				)
			)
				return false
			if (!item.fling) return false
			move.basePower = item.fling.basePower
			this.debug("BP: " + move.basePower)
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent("Eat", item, null, foe, null, null)) {
						this.runEvent("EatItem", foe, null, null, item)
						if (item.id === "ヒメリのみ") foe.staleness = "external"
					}
					if (item.onEat) foe.ateBerry = true
				}
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect
			} else {
				if (!move.secondaries) move.secondaries = []
				if (item.fling.status) {
					move.secondaries.push({ status: item.fling.status })
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({ volatileStatus: item.fling.volatileStatus })
				}
			}
			source.addVolatile("なげつける")
		},
		condition: {
			onUpdate(pokemon) {
				const item = pokemon.getItem()
				pokemon.setItem("")
				pokemon.lastItem = item.id
				pokemon.usedItemThisTurn = true
				this.add("-enditem", pokemon, item.name, "[from] move: Fling")
				this.runEvent("AfterUseItem", pokemon, null, null, item)
				pokemon.removeVolatile("なげつける")
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Cute"
	},
	"クイックターン": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "クイックターン",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "みず"
	},
	"トリックフラワー": {
		accuracy: true,
		basePower: 70,
		category: "物理",
		name: "トリックフラワー",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "くさ"
	},
	"そらをとぶ": {
		accuracy: 95,
		basePower: 90,
		category: "物理",
		name: "そらをとぶ",
		pp: 15,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1,
			nosleeptalk: 1,
			noassist: 1,
			failinstruct: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (
					[
						"かぜおこし",
						"たつまき",
						"skyuppercut",
						"かみなり",
						"ぼうふう",
						"うちおとす",
						"thousandarrows"
					].includes(move.id)
				) {
					return
				}
				return false
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === "かぜおこし" || move.id === "たつまき") {
					return this.chainModify(2)
				}
			}
		},
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Clever"
	},
	"フライングプレス": {
		accuracy: 95,
		basePower: 100,
		category: "物理",
		name: "フライングプレス",
		pp: 10,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			gravity: 1,
			distance: 1,
			nonsky: 1
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness("Flying", type)
		},
		priority: 0,
		secondary: null,
		target: "any",
		type: "かくとう",
		zMove: { basePower: 170 },
		contestType: "Tough"
	},
	"きあいだま": {
		accuracy: 70,
		basePower: 120,
		category: "特殊",
		name: "きあいだま",
		pp: 5,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"きあいだめ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "きあいだめ",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "きあいだめ",
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === "zpower") {
					this.add("-start", target, "move: Focus Energy", "[zeffect]")
				} else if (
					effect &&
					["きょうえん", "かわりもの", "じこあんじ", "へんしん"].includes(effect.id)
				) {
					this.add("-start", target, "move: Focus Energy", "[silent]")
				} else {
					this.add("-start", target, "move: Focus Energy")
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cool"
	},
	"きあいパンチ": {
		accuracy: 100,
		basePower: 150,
		category: "物理",
		name: "きあいパンチ",
		pp: 20,
		priority: -3,
		flags: {
			contact: 1,
			protect: 1,
			punch: 1,
			failmefirst: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile("きあいパンチ")
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles["きあいパンチ"]?.lostFocus) {
				this.add("cant", pokemon, "きあいパンチ", "きあいパンチ")
				return true
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add("-singleturn", pokemon, "move: Focus Punch")
			},
			onHit(pokemon, source, move) {
				if (move.category !== "Status") {
					this.effectState.lostFocus = true
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === "flinch") return null
			}
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"このゆびとまれ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "このゆびとまれ",
		pp: 20,
		priority: 2,
		flags: { noassist: 1, failcopycat: 1 },
		volatileStatus: "このゆびとまれ",
		onTry(source) {
			return this.activePerHalf > 1
		},
		condition: {
			duration: 1,
			onStart(target, source, effect) {
				if (effect?.id === "zpower") {
					this.add("-singleturn", target, "move: Follow Me", "[zeffect]")
				} else {
					this.add("-singleturn", target, "move: Follow Me")
				}
			},
			onFoeRedirectTargetPriority: 1,
			onFoeRedirectTarget(target, source, source2, move) {
				if (
					!this.effectState.target.isSkyDropped() &&
					this.validTarget(this.effectState.target, source, move.target)
				) {
					if (move.smartTarget) move.smartTarget = false
					this.debug("Follow Me redirected target of move")
					return this.effectState.target
				}
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"はっけい": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "はっけい",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"イカサマ": {
		accuracy: 100,
		basePower: 95,
		category: "物理",
		name: "イカサマ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		overrideOffensivePokemon: "target",
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Clever"
	},
	"フリーズドライ": {
		accuracy: 100,
		basePower: 70,
		category: "特殊",
		name: "フリーズドライ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === "Water") return 1
		},
		secondary: {
			chance: 10,
			status: "frz"
		},
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"いてつくしせん": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "いてつくしせん",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "frz"
		},
		target: "normal",
		type: "エスパー"
	},
	"ハードプラント": {
		accuracy: 90,
		basePower: 150,
		category: "特殊",
		name: "ハードプラント",
		pp: 5,
		priority: 0,
		flags: { recharge: 1, protect: 1, mirror: 1, nonsky: 1 },
		self: {
			volatileStatus: "mustrecharge"
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"こおりのいぶき": {
		accuracy: 90,
		basePower: 60,
		category: "特殊",
		name: "こおりのいぶき",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"みだれづき": {
		accuracy: 85,
		basePower: 15,
		category: "物理",
		name: "みだれづき",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"れんぞくぎり": {
		accuracy: 95,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles["れんぞくぎり"] || move.hit === 1) {
				pokemon.addVolatile("れんぞくぎり")
			}
			const bp = this.clampIntRange(
				move.basePower * pokemon.volatiles["れんぞくぎり"].multiplier,
				1,
				160
			)
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "れんぞくぎり",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1
				}
				this.effectState.duration = 2
			}
		},
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cool"
	},
	"みだれひっかき": {
		accuracy: 80,
		basePower: 18,
		category: "物理",
		name: "みだれひっかき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "ノーマル",
		maxMove: { basePower: 100 },
		contestType: "Tough"
	},
	"みらいよち": {
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "みらいよち",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, "futuremove")) return false
			Object.assign(target.side.slotConditions[target.position]["futuremove"], {
				duration: 3,
				move: "みらいよち",
				source: source,
				moveData: {
					id: "みらいよち",
					name: "みらいよち",
					accuracy: 100,
					basePower: 120,
					category: "特殊",
					priority: 0,
					flags: { allyanim: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: "Move",
					type: "エスパー"
				}
			})
			this.add("-start", source, "move: Future Sight")
			return this.NOT_FAIL
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"いえき": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "いえき",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		volatileStatus: "いえき",
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false
			}
			if (target.hasItem("とくせいガード")) {
				this.add("-block", target, "item: Ability Shield")
				return null
			}
		},
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
			onStart(pokemon) {
				if (pokemon.hasItem("とくせいガード")) return false
				this.add("-endability", pokemon)
				this.singleEvent(
					"End",
					pokemon.getAbility(),
					pokemon.abilityState,
					pokemon,
					pokemon,
					"いえき"
				)
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent)
					pokemon.removeVolatile("いえき")
			}
		},
		secondary: null,
		target: "normal",
		type: "どく",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"ギガドレイン": {
		accuracy: 100,
		basePower: 75,
		category: "特殊",
		name: "ギガドレイン",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Clever"
	},
	"ギガインパクト": {
		accuracy: 90,
		basePower: 150,
		category: "物理",
		name: "ギガインパクト",
		pp: 5,
		priority: 0,
		flags: { contact: 1, recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "mustrecharge"
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"デカハンマー": {
		accuracy: 100,
		basePower: 160,
		category: "物理",
		name: "デカハンマー",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		secondary: null,
		target: "normal",
		type: "はがね"
	},
	"ブリザードランス": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ブリザードランス",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "こおり"
	},
	"きょけんとつげき": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "きょけんとつげき",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "きょけんとつげき"
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add("-singlemove", pokemon, "きょけんとつげき", "[silent]")
			},
			onAccuracy() {
				return true
			},
			onSourceModifyDamage() {
				return this.chainModify(2)
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug("removing Glaive Rush drawback before attack")
				pokemon.removeVolatile("きょけんとつげき")
			}
		},
		secondary: null,
		target: "normal",
		type: "ドラゴン"
	},
	"へびにらみ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "へびにらみ",
		pp: 30,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "par",
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spd: 1 } },
		contestType: "Tough"
	},
	"くさむすび": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight()
			let bp
			if (targetWeight >= 2000) {
				bp = 120
			} else if (targetWeight >= 1000) {
				bp = 100
			} else if (targetWeight >= 500) {
				bp = 80
			} else if (targetWeight >= 250) {
				bp = 60
			} else if (targetWeight >= 100) {
				bp = 40
			} else {
				bp = 20
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "特殊",
		name: "くさむすび",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		onTryHit(target, source, move) {
			if (target.volatiles["dynamax"]) {
				this.add("-fail", source, "move: Grass Knot", "[from] Dynamax")
				this.attrLastMove("[still]")
				return null
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cute"
	},
	"くさのちかい": {
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (["みずのちかい", "ほのおのちかい"].includes(move.sourceEffect)) {
				this.add("-combine")
				return 150
			}
			return 80
		},
		category: "特殊",
		name: "くさのちかい",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1 },
		onPrepareHit(target, source, move) {
			for (const action of this.queue.list) {
				if (
					!action.move ||
					!action.pokemon?.isActive ||
					action.pokemon.fainted ||
					action.maxMove ||
					action.zmove
				) {
					continue
				}
				if (
					action.pokemon.isAlly(source) &&
					["みずのちかい", "ほのおのちかい"].includes(action.move.id)
				) {
					this.queue.prioritizeAction(action, move)
					this.add("-waiting", source, action.pokemon)
					return null
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === "みずのちかい") {
				move.type = "Grass"
				move.forceSTAB = true
				move.sideCondition = "くさのちかい"
			}
			if (move.sourceEffect === "ほのおのちかい") {
				move.type = "Fire"
				move.forceSTAB = true
				move.sideCondition = "ほのおのちかい"
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add("-sidestart", targetSide, "くさのちかい")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 9,
			onSideEnd(targetSide) {
				this.add("-sideend", targetSide, "くさのちかい")
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25)
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Beautiful"
	},
	"グラススライダー": {
		accuracy: 100,
		basePower: 55,
		category: "物理",
		name: "グラススライダー",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain("グラスフィールド") && source.isGrounded()) {
				return priority + 1
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"グラスフィールド": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "グラスフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "グラスフィールド",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("グランドコート")) {
					return 8
				}
				return 5
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ["じしん", "じならし", "magnitude"]
				if (
					weakenedMoves.includes(move.id) &&
					defender.isGrounded() &&
					!defender.isSemiInvulnerable()
				) {
					this.debug("move weakened by grassy terrain")
					return this.chainModify(0.5)
				}
				if (move.type === "Grass" && attacker.isGrounded()) {
					this.debug("grassy terrain boost")
					return this.chainModify([5325, 4096])
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === "Ability") {
					this.add(
						"-fieldstart",
						"move: Grassy Terrain",
						"[from] ability: " + effect.name,
						"[of] " + source
					)
				} else {
					this.add("-fieldstart", "move: Grassy Terrain")
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon)
				} else {
					this.debug(
						`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`
					)
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add("-fieldend", "move: Grassy Terrain")
			}
		},
		secondary: null,
		target: "all",
		type: "くさ",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful"
	},
	"Gのちから": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "Gのちから",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower) {
			if (this.field.getPseudoWeather("じゅうりょく")) {
				return this.chainModify(1.5)
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "くさ"
	},
	"じゅうりょく": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じゅうりょく",
		pp: 5,
		priority: 0,
		flags: { nonsky: 1 },
		pseudoWeather: "じゅうりょく",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility("persistent")) {
					this.add("-activate", source, "ability: Persistent", "[move] Gravity")
					return 7
				}
				return 5
			},
			onFieldStart(target, source) {
				if (source?.hasAbility("persistent")) {
					this.add("-fieldstart", "move: Gravity", "[persistent]")
				} else {
					this.add("-fieldstart", "move: Gravity")
				}
				for (const pokemon of this.getAllActive()) {
					let applies = false
					if (
						pokemon.removeVolatile("とびはねる") ||
						pokemon.removeVolatile("そらをとぶ")
					) {
						applies = true
						this.queue.cancelMove(pokemon)
						pokemon.removeVolatile("twoturnmove")
					}
					if (pokemon.volatiles["skydrop"]) {
						applies = true
						this.queue.cancelMove(pokemon)

						if (pokemon.volatiles["skydrop"].source) {
							this.add(
								"-end",
								pokemon.volatiles["twoturnmove"].source,
								"Sky Drop",
								"[interrupt]"
							)
						}
						pokemon.removeVolatile("skydrop")
						pokemon.removeVolatile("twoturnmove")
					}
					if (pokemon.volatiles["でんじふゆう"]) {
						applies = true
						delete pokemon.volatiles["でんじふゆう"]
					}
					if (pokemon.volatiles["telekinesis"]) {
						applies = true
						delete pokemon.volatiles["telekinesis"]
					}
					if (applies) this.add("-activate", pokemon, "move: Gravity")
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== "number") return
				return this.chainModify([6840, 4096])
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags["じゅうりょく"]) {
						pokemon.disableMove(moveSlot.id)
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags["じゅうりょく"] && !move.isZ) {
					this.add("cant", pokemon, "move: Gravity", move)
					return false
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags["じゅうりょく"] && !move.isZ) {
					this.add("cant", pokemon, "move: Gravity", move)
					return false
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add("-fieldend", "move: Gravity")
			}
		},
		secondary: null,
		target: "all",
		type: "エスパー",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"なきごえ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "なきごえ",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		boosts: {
			atk: -1
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"せいちょう": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "せいちょう",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		onModifyMove(move, pokemon) {
			if (["にほんばれ", "おわりのだいち"].includes(pokemon.effectiveWeather()))
				move.boosts = { atk: 2, spa: 2 }
		},
		boosts: {
			atk: 1,
			spa: 1
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { spa: 1 } },
		contestType: "Beautiful"
	},
	"ガードシェア": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ガードシェア",
		pp: 10,
		priority: 0,
		flags: { protect: 1, allyanim: 1 },
		onHit(target, source) {
			const newdef = Math.floor(
				(target.storedStats.def + source.storedStats.def) / 2
			)
			target.storedStats.def = newdef
			source.storedStats.def = newdef
			const newspd = Math.floor(
				(target.storedStats.spd + source.storedStats.spd) / 2
			)
			target.storedStats.spd = newspd
			source.storedStats.spd = newspd
			this.add("-activate", source, "move: Guard Split", "[of] " + target)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ガードスワップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ガードスワップ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1 },
		onHit(target, source) {
			const targetBoosts = {}
			const sourceBoosts = {}

			const defSpd = ["def", "spd"]
			for (const stat of defSpd) {
				targetBoosts[stat] = target.boosts[stat]
				sourceBoosts[stat] = source.boosts[stat]
			}

			source.setBoost(targetBoosts)
			target.setBoost(sourceBoosts)

			this.add(
				"-swapboost",
				source,
				target,
				"def, spd",
				"[from] move: Guard Swap"
			)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ハサミギロチン": {
		accuracy: 30,
		basePower: 0,
		category: "物理",
		name: "ハサミギロチン",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		ohko: true,
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"ダストシュート": {
		accuracy: 80,
		basePower: 120,
		category: "物理",
		name: "ダストシュート",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Tough"
	},
	"かぜおこし": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "かぜおこし",
		pp: 35,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Clever"
	},
	"ジャイロボール": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power =
				Math.floor((25 * target.getStat("spe")) / pokemon.getStat("spe")) + 1
			if (!isFinite(power)) power = 1
			if (power > 150) power = 150
			this.debug("BP: " + power)
			return power
		},
		category: "物理",
		name: "ジャイロボール",
		pp: 5,
		priority: 0,
		flags: { bullet: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "はがね",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"アームハンマー": {
		accuracy: 90,
		basePower: 100,
		category: "物理",
		name: "アームハンマー",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		self: {
			boosts: {
				spe: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"ハッピータイム": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ハッピータイム",
		pp: 30,
		priority: 0,
		flags: {},
		onTryHit(target, source) {
			this.add("-activate", target, "move: Happy Hour")
		},
		secondary: null,
		target: "allySide",
		type: "ノーマル",
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
		contestType: "Cute"
	},
	"かたくなる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "かたくなる",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"くろいきり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "くろいきり",
		pp: 30,
		priority: 0,
		flags: { bypasssub: 1 },
		onHitField() {
			this.add("-clearallboost")
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts()
			}
		},
		secondary: null,
		target: "all",
		type: "こおり",
		zMove: { effect: "heal" },
		contestType: "Beautiful"
	},
	"ずつき": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "ずつき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ぶちかまし": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ぶちかまし",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		self: {
			boosts: {
				def: -1,
				spd: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "じめん"
	},
	"もろはのずつき": {
		accuracy: 80,
		basePower: 150,
		category: "物理",
		name: "もろはのずつき",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Tough"
	},
	"いやしのすず": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いやしのすず",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, sound: 1, distance: 1, bypasssub: 1 },
		onHit(target, source) {
			this.add("-activate", source, "move: Heal Bell")
			let success = false
			const allies = [
				...target.side.pokemon,
				...(target.side.allySide?.pokemon || [])
			]
			for (const ally of allies) {
				if (ally !== source && ally.hasAbility("ぼうおん")) continue
				if (ally.cureStatus()) success = true
			}
			return success
		},
		target: "allyTeam",
		type: "ノーマル",
		zMove: { effect: "heal" },
		contestType: "Beautiful"
	},
	"いやしのねがい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いやしのねがい",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.attrLastMove("[still]")
				this.add("-fail", source)
				return this.NOT_FAIL
			}
		},
		selfdestruct: "ifHit",
		slotCondition: "いやしのねがい",
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp)
					target.clearStatus()
					this.add(
						"-heal",
						target,
						target.getHealth,
						"[from] move: Healing Wish"
					)
					target.side.removeSlotCondition(target, "いやしのねがい")
				}
			}
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		contestType: "Beautiful"
	},
	"いやしのはどう": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いやしのはどう",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			pulse: 1,
			reflectable: 1,
			distance: 1,
			heal: 1,
			allyanim: 1
		},
		onHit(target, source) {
			let success = false
			if (source.hasAbility("メガランチャー")) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.75))
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5))
			}
			if (success && !target.isAlly(source)) {
				target.staleness = "external"
			}
			if (!success) {
				this.add("-fail", target, "heal")
				return this.NOT_FAIL
			}
			return success
		},
		secondary: null,
		target: "any",
		type: "エスパー",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"ハートスワップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ハートスワップ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1 },
		onHit(target, source) {
			const targetBoosts = {}
			const sourceBoosts = {}

			let i
			for (i in target.boosts) {
				targetBoosts[i] = target.boosts[i]
				sourceBoosts[i] = source.boosts[i]
			}

			target.setBoost(sourceBoosts)
			source.setBoost(targetBoosts)

			this.add("-swapboost", source, target, "[from] move: Heart Swap")
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { effect: "crit2" },
		contestType: "Clever"
	},
	"ヒートスタンプ": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight()
			const pokemonWeight = pokemon.getWeight()
			let bp
			if (pokemonWeight >= targetWeight * 5) {
				bp = 120
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60
			} else {
				bp = 40
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "ヒートスタンプ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		onTryHit(target, pokemon, move) {
			if (target.volatiles["dynamax"]) {
				this.add("-fail", pokemon, "Dynamax")
				this.attrLastMove("[still]")
				return null
			}
		},
		secondary: null,
		target: "normal",
		type: "ほのお",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"ねっぷう": {
		accuracy: 90,
		basePower: 95,
		category: "特殊",
		name: "ねっぷう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "allAdjacentFoes",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"ヘビーボンバー": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight()
			const pokemonWeight = pokemon.getWeight()
			let bp
			if (pokemonWeight >= targetWeight * 5) {
				bp = 120
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60
			} else {
				bp = 40
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "ヘビーボンバー",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		onTryHit(target, pokemon, move) {
			if (target.volatiles["dynamax"]) {
				this.add("-fail", pokemon, "Dynamax")
				this.attrLastMove("[still]")
				return null
			}
		},
		secondary: null,
		target: "normal",
		type: "はがね",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"てだすけ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "てだすけ",
		pp: 20,
		priority: 5,
		flags: { bypasssub: 1, noassist: 1, failcopycat: 1 },
		volatileStatus: "てだすけ",
		onTryHit(target) {
			if (!target.newlySwitched && !this.queue.willMove(target)) return false
		},
		condition: {
			duration: 1,
			onStart(target, source) {
				this.effectState.multiplier = 1.5
				this.add("-singleturn", target, "てだすけ", "[of] " + source)
			},
			onRestart(target, source) {
				this.effectState.multiplier *= 1.5
				this.add("-singleturn", target, "てだすけ", "[of] " + source)
			},
			onBasePowerPriority: 10,
			onBasePower(basePower) {
				this.debug("Boosting from Helping Hand: " + this.effectState.multiplier)
				return this.chainModify(this.effectState.multiplier)
			}
		},
		secondary: null,
		target: "adjacentAlly",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"たたりめ": {
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility("ぜったいねむり")) {
				this.debug("BP doubled from status condition")
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "特殊",
		name: "たたりめ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ゴースト",
		zMove: { basePower: 160 },
		contestType: "Clever"
	},
	"10まんばりき": {
		accuracy: 95,
		basePower: 95,
		category: "物理",
		name: "10まんばりき",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "じめん",
		contestType: "Tough"
	},
	"とびひざげり": {
		accuracy: 90,
		basePower: 130,
		category: "物理",
		name: "とびひざげり",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(
				source.baseMaxhp / 2,
				source,
				source,
				this.dex.conditions.get("とびひざげり")
			)
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"てかげん": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "てかげん",
		pp: 40,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onDamagePriority: -20,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp) return target.hp - 1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"てをつなぐ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "てをつなぐ",
		pp: 40,
		priority: 0,
		flags: {
			bypasssub: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		secondary: null,
		target: "adjacentAlly",
		type: "ノーマル",
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
		contestType: "Cute"
	},
	"つめとぎ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "つめとぎ",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: 1,
			accuracy: 1
		},
		secondary: null,
		target: "self",
		type: "あく",
		zMove: { boost: { atk: 1 } },
		contestType: "Cute"
	},
	"つのでつく": {
		accuracy: 100,
		basePower: 65,
		category: "物理",
		name: "つのでつく",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"つのドリル": {
		accuracy: 30,
		basePower: 0,
		category: "物理",
		name: "つのドリル",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		ohko: true,
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"ウッドホーン": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "ウッドホーン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Tough"
	},
	"とおぼえ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "とおぼえ",
		pp: 40,
		priority: 0,
		flags: { snatch: 1, sound: 1 },
		boosts: {
			atk: 1
		},
		secondary: null,
		target: "allies",
		type: "ノーマル",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool"
	},
	"ぼうふう": {
		accuracy: 70,
		basePower: 110,
		category: "特殊",
		name: "ぼうふう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
				case "あまごい":
				case "はじまりのうみ":
					move.accuracy = true
					break
				case "にほんばれ":
				case "おわりのだいち":
					move.accuracy = 50
					break
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: "ねんりき"
		},
		target: "any",
		type: "ひこう",
		contestType: "Tough"
	},
	"ハイドロカノン": {
		accuracy: 90,
		basePower: 150,
		category: "特殊",
		name: "ハイドロカノン",
		pp: 5,
		priority: 0,
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "mustrecharge"
		},
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"ハイドロポンプ": {
		accuracy: 80,
		basePower: 110,
		category: "特殊",
		name: "ハイドロポンプ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"ハイドロスチーム": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ハイドロスチーム",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		// Damage boost in Sun applied in conditions.ts
		thawsTarget: true,
		secondary: null,
		target: "normal",
		type: "みず"
	},
	"はかいこうせん": {
		accuracy: 90,
		basePower: 150,
		category: "特殊",
		name: "はかいこうせん",
		pp: 5,
		priority: 0,
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "mustrecharge"
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"ハイパードリル": {
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "ハイパードリル",
		pp: 5,
		priority: 0,
		flags: { contact: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Clever"
	},
	"いじげんラッシュ": {
		accuracy: true,
		basePower: 100,
		category: "物理",
		name: "いじげんラッシュ",
		pp: 5,
		priority: 0,
		flags: { mirror: 1, bypasssub: 1 },
		breaksProtect: true,
		onTry(source) {
			if (source.species.name === "Hoopa-Unbound") {
				return
			}
			this.hint("Only a Pokemon whose form is Hoopa Unbound can use this move.")
			if (source.species.name === "Hoopa") {
				this.attrLastMove("[still]")
				this.add("-fail", source, "move: Hyperspace Fury", "[forme]")
				return null
			}
			this.attrLastMove("[still]")
			this.add("-fail", source, "move: Hyperspace Fury")
			return null
		},
		self: {
			boosts: {
				def: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Tough"
	},
	"いじげんホール": {
		accuracy: true,
		basePower: 80,
		category: "特殊",
		name: "いじげんホール",
		pp: 5,
		priority: 0,
		flags: { mirror: 1, bypasssub: 1 },
		breaksProtect: true,
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"ハイパーボイス": {
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
		contestType: "Cool"
	},
	"さいみんじゅつ": {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "さいみんじゅつ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "slp",
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"れいとうビーム": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "れいとうビーム",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "frz"
		},
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"こおりのキバ": {
		accuracy: 95,
		basePower: 65,
		category: "物理",
		name: "こおりのキバ",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondaries: [
			{
				chance: 10,
				status: "frz"
			},
			{
				chance: 10,
				volatileStatus: "flinch"
			}
		],
		target: "normal",
		type: "こおり",
		contestType: "Cool"
	},
	"アイスハンマー": {
		accuracy: 90,
		basePower: 100,
		category: "物理",
		name: "アイスハンマー",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		self: {
			boosts: {
				spe: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "こおり",
		contestType: "Tough"
	},
	"れいとうパンチ": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "れいとうパンチ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 10,
			status: "frz"
		},
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"こおりのつぶて": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "こおりのつぶて",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"アイススピナー": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "アイススピナー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onAfterHit(target, source) {
			if (source.hp) {
				this.field.clearTerrain()
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp) {
				this.field.clearTerrain()
			}
		},
		secondary: null,
		target: "normal",
		type: "こおり"
	},
	"つららおとし": {
		accuracy: 90,
		basePower: 85,
		category: "物理",
		name: "つららおとし",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "こおり",
		contestType: "Beautiful"
	},
	"つららばり": {
		accuracy: 100,
		basePower: 25,
		category: "物理",
		name: "つららばり",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "こおり",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful"
	},
	"こごえるかぜ": {
		accuracy: 95,
		basePower: 55,
		category: "特殊",
		name: "こごえるかぜ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "allAdjacentFoes",
		type: "こおり",
		contestType: "Beautiful"
	},
	"ふういん": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ふういん",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, bypasssub: 1, mustpressure: 1 },
		volatileStatus: "ふういん",
		condition: {
			noCopy: true,
			onStart(target) {
				this.add("-start", target, "move: Imprison")
			},
			onFoeDisableMove(pokemon) {
				for (const moveSlot of this.effectState.source.moveSlots) {
					if (moveSlot.id === "わるあがき") continue
					pokemon.disableMove(moveSlot.id, "hidden")
				}
				pokemon.maybeDisabled = true
			},
			onFoeBeforeMovePriority: 4,
			onFoeBeforeMove(attacker, defender, move) {
				if (
					move.id !== "わるあがき" &&
					this.effectState.source.hasMove(move.id) &&
					!move.isZ &&
					!move.isMax
				) {
					this.add("cant", attacker, "move: Imprison", move)
					return false
				}
			}
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { boost: { spd: 2 } },
		contestType: "Clever"
	},
	"やきつくす": {
		accuracy: 100,
		basePower: 60,
		category: "特殊",
		name: "やきつくす",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onHit(pokemon, source) {
			const item = pokemon.getItem()
			if ((item.isBerry || item.isGem) && pokemon.takeItem(source)) {
				this.add("-enditem", pokemon, item.name, "[from] move: Incinerate")
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "ほのお",
		contestType: "Tough"
	},
	"ひゃっきやこう": {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility("ぜったいねむり"))
				return move.basePower * 2
			return move.basePower
		},
		category: "特殊",
		name: "ひゃっきやこう",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "brn"
		},
		target: "normal",
		type: "ゴースト"
	},
	"れんごく": {
		accuracy: 50,
		basePower: 100,
		category: "特殊",
		name: "れんごく",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			status: "brn"
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"まとわりつく": {
		accuracy: 100,
		basePower: 20,
		category: "特殊",
		name: "まとわりつく",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"ねをはる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねをはる",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, nonsky: 1 },
		volatileStatus: "ねをはる",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "move: Ingrain")
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16)
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap()
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onDragOut(pokemon) {
				this.add("-activate", pokemon, "move: Ingrain")
				return null
			}
		},
		secondary: null,
		target: "self",
		type: "くさ",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"さいはい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "さいはい",
		pp: 15,
		priority: 0,
		flags: { protect: 1, bypasssub: 1, allyanim: 1, failinstruct: 1 },
		onHit(target, source) {
			if (!target.lastMove || target.volatiles["dynamax"]) return false
			const lastMove = target.lastMove
			const moveIndex = target.moves.indexOf(lastMove.id)
			if (
				lastMove.flags["failinstruct"] ||
				lastMove.isZ ||
				lastMove.isMax ||
				lastMove.flags["じゅうでん"] ||
				lastMove.flags["recharge"] ||
				target.volatiles["beakblast"] ||
				target.volatiles["きあいパンチ"] ||
				target.volatiles["shelltrap"] ||
				(target.moveSlots[moveIndex] && target.moveSlots[moveIndex].pp <= 0)
			) {
				return false
			}
			this.add("-singleturn", target, "move: Instruct", "[of] " + source)
			this.queue.prioritizeAction(
				this.queue.resolveAction({
					choice: "move",
					pokemon: target,
					moveid: target.lastMove.id,
					targetLoc: target.lastMoveTargetLoc
				})[0]
			)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"てっぺき": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "てっぺき",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 2
		},
		secondary: null,
		target: "self",
		type: "はがね",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"アイアンヘッド": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "アイアンヘッド",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "はがね",
		contestType: "Tough"
	},
	"アイアンテール": {
		accuracy: 75,
		basePower: 100,
		category: "物理",
		name: "アイアンテール",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "はがね",
		contestType: "Cool"
	},
	"ツタこんぼう": {
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "ツタこんぼう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		onPrepareHit(target, source, move) {
			if (move.type !== "Grass") {
				this.attrLastMove("[anim] Ivy Cudgel " + move.type)
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
				case "Ogerpon-Wellspring":
				case "Ogerpon-Wellspring-Tera":
					move.type = "Water"
					break
				case "Ogerpon-Hearthflame":
				case "Ogerpon-Hearthflame-Tera":
					move.type = "Fire"
					break
				case "Ogerpon-Cornerstone":
				case "Ogerpon-Cornerstone-Tera":
					move.type = "Rock"
					break
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ"
	},
	"くらいつく": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "くらいつく",
		pp: 10,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target, source, move) {
			source.addVolatile("trapped", target, move, "trapper")
			target.addVolatile("trapped", source, move, "trapper")
		},
		secondary: null,
		target: "normal",
		type: "あく"
	},
	"ジェットパンチ": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ジェットパンチ",
		pp: 15,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"さばきのつぶて": {
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "さばきのつぶて",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return
			const item = pokemon.getItem()
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"ジャングルヒール": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ジャングルヒール",
		pp: 10,
		priority: 0,
		flags: { heal: 1, bypasssub: 1, allyanim: 1 },
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25))
			return pokemon.cureStatus() || success
		},
		secondary: null,
		target: "allies",
		type: "くさ"
	},
	"はたきおとす": {
		accuracy: 100,
		basePower: 65,
		category: "物理",
		name: "はたきおとす",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem()
			if (
				!this.singleEvent(
					"TakeItem",
					item,
					target.itemState,
					target,
					target,
					move,
					item
				)
			)
				return
			if (item.id) {
				return this.chainModify(1.5)
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem()
				if (item) {
					this.add(
						"-enditem",
						target,
						item.name,
						"[from] move: Knock Off",
						"[of] " + source
					)
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Clever"
	},
	"ドゲザン": {
		accuracy: true,
		basePower: 85,
		category: "物理",
		name: "ドゲザン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		target: "normal",
		type: "あく"
	},
	"うっぷんばらし": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "うっぷんばらし",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source) {
			if (source.statsLoweredThisTurn) {
				this.debug("lashout buff")
				return this.chainModify(2)
			}
		},
		secondary: null,
		target: "normal",
		type: "あく"
	},
	"とっておき": {
		accuracy: 100,
		basePower: 140,
		category: "物理",
		name: "とっておき",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.moveSlots.length < 2) return false // Last Resort fails unless the user knows at least 2 moves
			let hasLastResort = false // User must actually have Last Resort for it to succeed
			for (const moveSlot of source.moveSlots) {
				if (moveSlot.id === "とっておき") {
					hasLastResort = true
					continue
				}
				if (!moveSlot.used) return false
			}
			return hasLastResort
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"おはかまいり": {
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			return 50 + 50 * pokemon.side.totalFainted
		},
		category: "物理",
		name: "おはかまいり",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ゴースト"
	},
	"ふんえん": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ふんえん",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "brn"
		},
		target: "allAdjacent",
		type: "ほのお",
		contestType: "Tough"
	},
	"このは": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "このは",
		pp: 40,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Tough"
	},
	"リーフブレード": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "リーフブレード",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"リーフストーム": {
		accuracy: 90,
		basePower: 130,
		category: "特殊",
		name: "リーフストーム",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -2
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Beautiful"
	},
	"きゅうけつ": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "きゅうけつ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Clever"
	},
	"やどりぎのタネ": {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "やどりぎのタネ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "やどりぎのタネ",
		condition: {
			onStart(target) {
				this.add("-start", target, "move: Leech Seed")
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles["やどりぎのタネ"].sourceSlot)
				if (!target || target.fainted || target.hp <= 0) {
					this.debug("Nothing to leech into")
					return
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target)
				if (damage) {
					this.heal(damage, target, pokemon)
				}
			}
		},
		onTryImmunity(target) {
			return !target.hasType("Grass")
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"にらみつける": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "にらみつける",
		pp: 30,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			def: -1
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "ノーマル",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool"
	},
	"したでなめる": {
		accuracy: 100,
		basePower: 30,
		category: "物理",
		name: "したでなめる",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "ゴースト",
		contestType: "Cute"
	},
	"いのちのしずく": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いのちのしずく",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1, bypasssub: 1 },
		heal: [1, 4],
		secondary: null,
		target: "allies",
		type: "みず"
	},
	"ひかりのかべ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ひかりのかべ",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "ひかりのかべ",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem("ひかりのねんど")) {
					return 8
				}
				return 5
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (
					target !== source &&
					this.effectState.target.hasAlly(target) &&
					this.getCategory(move) === "特殊"
				) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug("Light Screen weaken")
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096])
						return this.chainModify(0.5)
					}
				}
			},
			onSideStart(side) {
				this.add("-sidestart", side, "move: Light Screen")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add("-sideend", side, "move: Light Screen")
			}
		},
		secondary: null,
		target: "allySide",
		type: "エスパー",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"アクアブレイク": {
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
				def: -1
			}
		},
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"ロックオン": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ロックオン",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onTryHit(target, source) {
			if (source.volatiles["ロックオン"]) return false
		},
		onHit(target, source) {
			source.addVolatile("ロックオン", target)
			this.add("-activate", source, "move: Lock-On", "[of] " + target)
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onSourceInvulnerabilityPriority: 1,
			onSourceInvulnerability(target, source, move) {
				if (
					move &&
					source === this.effectState.target &&
					target === this.effectState.source
				)
					return 0
			},
			onSourceAccuracy(accuracy, target, source, move) {
				if (
					move &&
					source === this.effectState.target &&
					target === this.effectState.source
				)
					return true
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"けたぐり": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight()
			let bp
			if (targetWeight >= 2000) {
				bp = 120
			} else if (targetWeight >= 1000) {
				bp = 100
			} else if (targetWeight >= 500) {
				bp = 80
			} else if (targetWeight >= 250) {
				bp = 60
			} else if (targetWeight >= 100) {
				bp = 40
			} else {
				bp = 20
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "けたぐり",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(target, pokemon, move) {
			if (target.volatiles["dynamax"]) {
				this.add("-fail", pokemon, "Dynamax")
				this.attrLastMove("[still]")
				return null
			}
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		zMove: { basePower: 160 },
		contestType: "Tough"
	},
	"ローキック": {
		accuracy: 100,
		basePower: 65,
		category: "物理",
		name: "ローキック",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "normal",
		type: "かくとう",
		contestType: "Clever"
	},
	"ルミナコリジョン": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ルミナコリジョン",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spd: -2
			}
		},
		target: "normal",
		type: "エスパー"
	},
	"みかづきのいのり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みかづきのいのり",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25))
			return pokemon.cureStatus() || success
		},
		secondary: null,
		target: "allies",
		type: "エスパー"
	},
	"みかづきのまい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みかづきのまい",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1, dance: 1 },
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.attrLastMove("[still]")
				this.add("-fail", source)
				return this.NOT_FAIL
			}
		},
		selfdestruct: "ifHit",
		slotCondition: "みかづきのまい",
		condition: {
			onSwap(target) {
				if (
					!target.fainted &&
					(target.hp < target.maxhp ||
						target.status ||
						target.moveSlots.some(moveSlot => moveSlot.pp < moveSlot.maxpp))
				) {
					target.heal(target.maxhp)
					target.clearStatus()
					for (const moveSlot of target.moveSlots) {
						moveSlot.pp = moveSlot.maxpp
					}
					this.add(
						"-heal",
						target,
						target.getHealth,
						"[from] move: Lunar Dance"
					)
					target.side.removeSlotCondition(target, "みかづきのまい")
				}
			}
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		contestType: "Beautiful"
	},
	"とびかかる": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "とびかかる",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1
			}
		},
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"マッハパンチ": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "マッハパンチ",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"マジカルリーフ": {
		accuracy: true,
		basePower: 60,
		category: "特殊",
		name: "マジカルリーフ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Beautiful"
	},
	"まほうのこな": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "まほうのこな",
		pp: 20,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onHit(target) {
			if (target.getTypes().join() === "サイコキネシス" || !target.setType("サイコキネシス"))
				return false
			this.add("-start", target, "typechange", "サイコキネシス")
		},
		secondary: null,
		target: "normal",
		type: "エスパー"
	},
	"マジックルーム": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "マジックルーム",
		pp: 10,
		priority: 0,
		flags: { mirror: 1 },
		pseudoWeather: "マジックルーム",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-activate",
						source,
						"ability: Persistent",
						"[move] Magic Room"
					)
					return 7
				}
				return 5
			},
			onFieldStart(target, source) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-fieldstart",
						"move: Magic Room",
						"[of] " + source,
						"[persistent]"
					)
				} else {
					this.add("-fieldstart", "move: Magic Room", "[of] " + source)
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent("End", mon.getItem(), mon.itemState, mon)
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather("マジックルーム")
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add(
					"-fieldend",
					"move: Magic Room",
					"[of] " + this.effectState.source
				)
			}
		},
		secondary: null,
		target: "all",
		type: "エスパー",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"マグマストーム": {
		accuracy: 75,
		basePower: 100,
		category: "特殊",
		name: "マグマストーム",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "ほのお",
		contestType: "Tough"
	},
	"じばそうさ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じばそうさ",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, distance: 1, bypasssub: 1 },
		onHitSide(side, source, move) {
			const targets = side
				.allies()
				.filter(
					ally =>
						ally.hasAbility(["プラス", "マイナス"]) &&
						(!ally.volatiles["maxguard"] ||
							this.runEvent("TryHit", ally, source, move))
				)
			if (!targets.length) return false

			let didSomething = false
			for (const target of targets) {
				didSomething =
					this.boost({ def: 1, spd: 1 }, target, source, move, false, true) ||
					didSomething
			}
			return didSomething
		},
		secondary: null,
		target: "allySide",
		type: "でんき",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"でんじふゆう": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "でんじふゆう",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, gravity: 1 },
		volatileStatus: "でんじふゆう",
		onTry(source, target, move) {
			if (target.volatiles["うちおとす"] || target.volatiles["ねをはる"])
				return false

			// Additional Gravity check for Z-move variant
			if (this.field.getPseudoWeather("じゅうりょく")) {
				this.add("cant", source, "move: Gravity", move)
				return null
			}
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add("-start", target, "でんじふゆう")
			},
			onImmunity(type) {
				if (type === "じめん") return false
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add("-end", target, "でんじふゆう")
			}
		},
		secondary: null,
		target: "self",
		type: "でんき",
		zMove: { boost: { evasion: 1 } },
		contestType: "Clever"
	},
	"ゴールドラッシュ": {
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "ゴールドラッシュ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "はがね",
		contestType: "Beautiful"
	},
	"シャカシャカほう": {
		accuracy: 90,
		basePower: 80,
		category: "特殊",
		name: "シャカシャカほう",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		drain: [1, 2],
		thawsTarget: true,
		secondary: {
			chance: 20,
			status: "brn"
		},
		target: "allAdjacentFoes",
		type: "くさ"
	},
	"くろいまなざし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "くろいまなざし",
		pp: 5,
		priority: 0,
		flags: { reflectable: 1, mirror: 1 },
		onHit(target, source, move) {
			return target.addVolatile("trapped", source, move, "trapper")
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"メガドレイン": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "メガドレイン",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { basePower: 120 },
		contestType: "Clever"
	},
	"メガホーン": {
		accuracy: 85,
		basePower: 120,
		category: "物理",
		name: "メガホーン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cool"
	},
	"メガトンキック": {
		accuracy: 75,
		basePower: 120,
		category: "物理",
		name: "メガトンキック",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"メガトンパンチ": {
		accuracy: 85,
		basePower: 80,
		category: "物理",
		name: "メガトンパンチ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"おきみやげ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "おきみやげ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		boosts: {
			atk: -2,
			spa: -2
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { effect: "healreplacement" },
		contestType: "Tough"
	},
	"メタルバースト": {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			const lastDamagedBy = pokemon.getLastDamagedBy(true)
			if (lastDamagedBy !== undefined) {
				return lastDamagedBy.damage * 1.5 || 1
			}
			return 0
		},
		category: "物理",
		name: "メタルバースト",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, failmefirst: 1 },
		onTry(source) {
			const lastDamagedBy = source.getLastDamagedBy(true)
			if (lastDamagedBy === undefined || !lastDamagedBy.thisTurn) return false
		},
		onModifyTarget(targetRelayVar, source, target, move) {
			const lastDamagedBy = source.getLastDamagedBy(true)
			if (lastDamagedBy) {
				targetRelayVar.target = this.getAtSlot(lastDamagedBy.slot)
			}
		},
		secondary: null,
		target: "scripted",
		type: "はがね",
		contestType: "Cool"
	},
	"メタルクロー": {
		accuracy: 95,
		basePower: 50,
		category: "物理",
		name: "メタルクロー",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1
				}
			}
		},
		target: "normal",
		type: "はがね",
		contestType: "Cool"
	},
	"きんぞくおん": {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "きんぞくおん",
		pp: 40,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			sound: 1,
			bypasssub: 1,
			allyanim: 1
		},
		boosts: {
			spd: -2
		},
		secondary: null,
		target: "normal",
		type: "はがね",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"メテオビーム": {
		accuracy: 90,
		basePower: 120,
		category: "特殊",
		name: "メテオビーム",
		pp: 10,
		priority: 0,
		flags: { charge: 1, protect: 1, mirror: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			this.boost({ spa: 1 }, attacker, attacker, move)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		secondary: null,
		target: "normal",
		type: "いわ"
	},
	"コメットパンチ": {
		accuracy: 90,
		basePower: 90,
		category: "物理",
		name: "コメットパンチ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1
				}
			}
		},
		target: "normal",
		type: "はがね",
		contestType: "Cool"
	},
	"ゆびをふる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ゆびをふる",
		pp: 10,
		priority: 0,
		flags: {
			failencore: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		noMetronome: [
			"おさきにどうぞ",
			"りんごさん",
			"アーマーキャノン",
			"Assist",
			"アストラルビット",
			"オーラぐるま",
			"トーチカ",
			"Beak Blast",
			"きょじゅうだん",
			"きょじゅうざん",
			"ゲップ",
			"Bestow",
			"Blazing Torque",
			"ボディプレス",
			"えだづき",
			"ワイドブレイカー",
			"おいわい",
			"Chatter",
			"ひやみず",
			"さむいギャグ",
			"ソウルビート",
			"アクセルブレイク",
			"Combat Torque",
			"ほうふく",
			"まねっこ",
			"カウンター",
			"ほしがる",
			"Crafty Shield",
			"Decorate",
			"みちづれ",
			"みきり",
			"ダイヤストーム",
			"うつしえ",
			"Double Iron Bash",
			"でんこうそうげき",
			"ガリョウテンセイ",
			"ドラゴンエナジー",
			"ドラムアタック",
			"ダイマックスほう",
			"イナズマドライブ",
			"こらえる",
			"Eternabeam",
			"どげざつき",
			"フェイント",
			"もえあがるいかり",
			"みをけずる",
			"フルールカノン",
			"きあいパンチ",
			"このゆびとまれ",
			"Freeze Shock",
			"いてつくしせん",
			"ブリザードランス",
			"Gのちから",
			"てだすけ",
			"てをつなぐ",
			"ハイパードリル",
			"いじげんラッシュ",
			"いじげんホール",
			"Ice Burn",
			"さいはい",
			"ジェットパンチ",
			"ジャングルヒール",
			"King's Shield",
			"いのちのしずく",
			"Light of Ruin",
			"Magical Torque",
			"ゴールドラッシュ",
			"Mat Block",
			"Me First",
			"Meteor Assault",
			"ゆびをふる",
			"ものまね",
			"Mind Blown",
			"ミラーコート",
			"Mirror Move",
			"Moongeist Beam",
			"Nature Power",
			"Nature's Madness",
			"Noxious Torque",
			"Obstruct",
			"いっちょうあがり",
			"こんげんのはどう",
			"オーバードライブ",
			"Photon Geyser",
			"Plasma Fists",
			"ネズミざん",
			"とびつく",
			"パワーシフト",
			"だんがいのつるぎ",
			"まもる",
			"かえんボール",
			"さきおくり",
			"ファストガード",
			"ふんどのこぶし",
			"いかりのこな",
			"レイジングブル",
			"だいふんげき",
			"いにしえのうた",
			"さいきのいのり",
			"カタストロフィ",
			"しおづけ",
			"Secret Sword",
			"しっぽきり",
			"Shell Trap",
			"スレッドトラップ",
			"Sketch",
			"ねごと",
			"Snap Trap",
			"バークアウト",
			"Snatch",
			"いびき",
			"ゆきげしき",
			"Spectral Thief",
			"ハバネロエキス",
			"ニードルガード",
			"ソウルクラッシュ",
			"Spotlight",
			"はるのあらし",
			"スチームバースト",
			"てっていこうせん",
			"ワンダースチーム",
			"わるあがき",
			"Sunsteel Strike",
			"すいりゅうれんだ",
			"すりかえ",
			"Techno Blast",
			"どろぼう",
			"Thousand Arrows",
			"Thousand Waves",
			"サンダープリズン",
			"らいめいげり",
			"おかたづけ",
			"くさわけ",
			"へんしん",
			"トリック",
			"ツインビーム",
			"Vジェネレート",
			"あんこくきょうだ",
			"Wicked Torque",
			"ワイドガード"
		],
		onHit(target, source, effect) {
			const moves = this.dex.moves
				.all()
				.filter(
					move =>
						(![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
						!move.realMove &&
						!move.isZ &&
						!move.isMax &&
						(!move.isNonstandard || move.isNonstandard === "Unobtainable") &&
						!effect.noMetronome.includes(move.name)
				)
			let randomMove = ""
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num)
				randomMove = this.sample(moves).id
			}
			if (!randomMove) return false
			source.side.lastSelectedMove = this.toID(randomMove)
			this.actions.useMove(randomMove, target)
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		contestType: "Cute"
	},
	"ミルクのみ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ミルクのみ",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ものまね": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ものまね",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			bypasssub: 1,
			allyanim: 1,
			failencore: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		onHit(target, source) {
			const move = target.lastMove
			if (
				source.transformed ||
				!move ||
				move.flags["failmimic"] ||
				source.moves.includes(move.id)
			) {
				return false
			}
			if (move.isZ || move.isMax) return false
			const mimicIndex = source.moves.indexOf("ものまね")
			if (mimicIndex < 0) return false

			source.moveSlots[mimicIndex] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true
			}
			this.add("-start", source, "ものまね", move.name)
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"ちいさくなる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ちいさくなる",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "ちいさくなる",
		condition: {
			noCopy: true,
			onRestart: () => null,
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					"ふみつけ",
					"steamroller",
					"のしかかり",
					"フライングプレス",
					"ドラゴンダイブ",
					"ヒートスタンプ",
					"ヘビーボンバー",
					"maliciousmoonsault"
				]
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2)
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					"ふみつけ",
					"steamroller",
					"のしかかり",
					"フライングプレス",
					"ドラゴンダイブ",
					"ヒートスタンプ",
					"ヘビーボンバー",
					"maliciousmoonsault"
				]
				if (boostedMoves.includes(move.id)) {
					return true
				}
				return accuracy
			}
		},
		boosts: {
			evasion: 2
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ミラーコート": {
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles["ミラーコート"]) return 0
			return pokemon.volatiles["ミラーコート"].damage || 1
		},
		category: "特殊",
		name: "ミラーコート",
		pp: 20,
		priority: -5,
		flags: { protect: 1, failmefirst: 1, noassist: 1 },
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile("ミラーコート")
		},
		onTry(source) {
			if (!source.volatiles["ミラーコート"]) return false
			if (source.volatiles["ミラーコート"].slot === null) return false
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectState.slot = null
				this.effectState.damage = 0
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2, move) {
				if (move.id !== "ミラーコート") return
				if (source !== this.effectState.target || !this.effectState.slot) return
				return this.getAtSlot(this.effectState.slot)
			},
			onDamagingHit(damage, target, source, move) {
				if (!source.isAlly(target) && this.getCategory(move) === "特殊") {
					this.effectState.slot = source.getSlot()
					this.effectState.damage = 2 * damage
				}
			}
		},
		secondary: null,
		target: "scripted",
		type: "エスパー",
		contestType: "Beautiful"
	},
	"しろいきり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しろいきり",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "しろいきり",
		condition: {
			duration: 5,
			onTryBoost(boost, target, source, effect) {
				if (
					effect.effectType === "Move" &&
					effect.infiltrates &&
					!target.isAlly(source)
				)
					return
				if (source && target !== source) {
					let showMsg = false
					let i
					for (i in boost) {
						if (boost[i] < 0) {
							delete boost[i]
							showMsg = true
						}
					}
					if (showMsg && !effect.secondaries) {
						this.add("-activate", target, "move: Mist")
					}
				}
			},
			onSideStart(side) {
				this.add("-sidestart", side, "しろいきり")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 4,
			onSideEnd(side) {
				this.add("-sideend", side, "しろいきり")
			}
		},
		secondary: null,
		target: "allySide",
		type: "こおり",
		zMove: { effect: "heal" },
		contestType: "Beautiful"
	},
	"ミストバースト": {
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "ミストバースト",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		selfdestruct: "always",
		onBasePower(basePower, source) {
			if (this.field.isTerrain("ミストフィールド") && source.isGrounded()) {
				this.debug("misty terrain boost")
				return this.chainModify(1.5)
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "フェアリー"
	},
	"ミストフィールド": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ミストフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "ミストフィールド",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("グランドコート")) {
					return 8
				}
				return 5
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return
				if (effect && (effect.status || effect.id === "あくび")) {
					this.add("-activate", target, "move: Misty Terrain")
				}
				return false
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return
				if (status.id === "ねんりき") {
					if (effect.effectType === "Move" && !effect.secondaries)
						this.add("-activate", target, "move: Misty Terrain")
					return null
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (
					move.type === "Dragon" &&
					defender.isGrounded() &&
					!defender.isSemiInvulnerable()
				) {
					this.debug("misty terrain weaken")
					return this.chainModify(0.5)
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === "Ability") {
					this.add(
						"-fieldstart",
						"move: Misty Terrain",
						"[from] ability: " + effect.name,
						"[of] " + source
					)
				} else {
					this.add("-fieldstart", "move: Misty Terrain")
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add("-fieldend", "ミストフィールド")
			}
		},
		secondary: null,
		target: "all",
		type: "フェアリー",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"ムーンフォース": {
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
				spa: -1
			}
		},
		target: "normal",
		type: "フェアリー",
		contestType: "Beautiful"
	},
	"つきのひかり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "つきのひかり",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onHit(pokemon) {
			let factor = 0.5
			switch (pokemon.effectiveWeather()) {
				case "にほんばれ":
				case "おわりのだいち":
					factor = 0.667
					break
				case "あまごい":
				case "はじまりのうみ":
				case "すなあらし":
				case "hail":
				case "snow":
					factor = 0.25
					break
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor))
			if (!success) {
				this.add("-fail", pokemon, "heal")
				return this.NOT_FAIL
			}
			return success
		},
		secondary: null,
		target: "self",
		type: "フェアリー",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"あさのひざし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "あさのひざし",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onHit(pokemon) {
			let factor = 0.5
			switch (pokemon.effectiveWeather()) {
				case "にほんばれ":
				case "おわりのだいち":
					factor = 0.667
					break
				case "あまごい":
				case "はじまりのうみ":
				case "すなあらし":
				case "hail":
				case "snow":
					factor = 0.25
					break
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor))
			if (!success) {
				this.add("-fail", pokemon, "heal")
				return this.NOT_FAIL
			}
			return success
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"キラースピン": {
		accuracy: 100,
		basePower: 30,
		category: "物理",
		name: "キラースピン",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile("やどりぎのタネ")) {
					this.add(
						"-end",
						pokemon,
						"やどりぎのタネ",
						"[from] move: Mortal Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"まきびし",
					"どくびし",
					"ステルスロック",
					"ねばねばネット",
					"gmaxsteelsurge"
				]
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add(
							"-sideend",
							pokemon.side,
							this.dex.conditions.get(condition).name,
							"[from] move: Mortal Spin",
							"[of] " + pokemon
						)
					}
				}
				if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
					pokemon.removeVolatile("partiallytrapped")
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile("やどりぎのタネ")) {
					this.add(
						"-end",
						pokemon,
						"やどりぎのタネ",
						"[from] move: Mortal Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"まきびし",
					"どくびし",
					"ステルスロック",
					"ねばねばネット",
					"gmaxsteelsurge"
				]
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add(
							"-sideend",
							pokemon.side,
							this.dex.conditions.get(condition).name,
							"[from] move: Mortal Spin",
							"[of] " + pokemon
						)
					}
				}
				if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
					pokemon.removeVolatile("partiallytrapped")
				}
			}
		},
		secondary: {
			chance: 100,
			status: "psn"
		},
		target: "allAdjacentFoes",
		type: "どく"
	},
	"ひょうざんおろし": {
		accuracy: 85,
		basePower: 100,
		category: "物理",
		name: "ひょうざんおろし",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "こおり"
	},
	"マッドショット": {
		accuracy: 95,
		basePower: 55,
		category: "特殊",
		name: "マッドショット",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "normal",
		type: "じめん",
		contestType: "Tough"
	},
	"どろかけ": {
		accuracy: 100,
		basePower: 20,
		category: "特殊",
		name: "どろかけ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1
			}
		},
		target: "normal",
		type: "じめん",
		contestType: "Cute"
	},
	"だくりゅう": {
		accuracy: 85,
		basePower: 90,
		category: "特殊",
		name: "だくりゅう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1
			}
		},
		target: "allAdjacentFoes",
		type: "みず",
		contestType: "Tough"
	},
	"マジカルフレイム": {
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
				spa: -1
			}
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"しんぴのちから": {
		accuracy: 90,
		basePower: 70,
		category: "特殊",
		name: "しんぴのちから",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1
				}
			}
		},
		target: "normal",
		type: "エスパー"
	},
	"わるだくみ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "わるだくみ",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spa: 2
		},
		secondary: null,
		target: "self",
		type: "あく",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"ナイトバースト": {
		accuracy: 95,
		basePower: 85,
		category: "特殊",
		name: "ナイトバースト",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 40,
			boosts: {
				accuracy: -1
			}
		},
		target: "normal",
		type: "あく",
		contestType: "Cool"
	},
	"ナイトヘッド": {
		accuracy: 100,
		basePower: 0,
		damage: "level",
		category: "特殊",
		name: "ナイトヘッド",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ゴースト",
		contestType: "Clever"
	},
	"つじぎり": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "つじぎり",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Cool"
	},
	"おたけび": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "おたけび",
		pp: 30,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		boosts: {
			atk: -1,
			spa: -1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"はいすいのじん": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はいすいのじん",
		pp: 5,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "はいすいのじん",
		onTry(source, target, move) {
			if (source.volatiles["はいすいのじん"]) return false
			if (source.volatiles["trapped"]) {
				delete move.volatileStatus
			}
		},
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "move: No Retreat")
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap()
			}
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1
		},
		secondary: null,
		target: "self",
		type: "かくとう"
	},
	"ほっぺすりすり": {
		accuracy: 100,
		basePower: 20,
		category: "物理",
		name: "ほっぺすりすり",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cute"
	},
	"いっちょうあがり": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "いっちょうあがり",
		pp: 10,
		priority: 0,
		flags: { protect: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!pokemon.volatiles["commanded"]) return
			const tatsugiri = pokemon.volatiles["commanded"].source
			if (tatsugiri.baseSpecies.baseSpecies !== "Tatsugiri") return // Should never happen
			switch (tatsugiri.baseSpecies.forme) {
				case "Droopy":
					this.boost({ def: 1 }, pokemon, pokemon)
					break
				case "Stretchy":
					this.boost({ spe: 1 }, pokemon, pokemon)
					break
				default:
					this.boost({ atk: 1 }, pokemon, pokemon)
					break
			}
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "ドラゴン"
	},
	"こんげんのはどう": {
		accuracy: 85,
		basePower: 110,
		category: "特殊",
		name: "こんげんのはどう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "みず",
		contestType: "Beautiful"
	},
	"げきりん": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "げきりん",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1 },
		self: {
			volatileStatus: "lockedmove"
		},
		onAfterMove(pokemon) {
			if (
				pokemon.volatiles["lockedmove"] &&
				pokemon.volatiles["lockedmove"].duration === 1
			) {
				pokemon.removeVolatile("lockedmove")
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "ドラゴン",
		contestType: "Cool"
	},
	"オーバードライブ": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "オーバードライブ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "でんき"
	},
	"オーバーヒート": {
		accuracy: 90,
		basePower: 130,
		category: "特殊",
		name: "オーバーヒート",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -2
			}
		},
		secondary: null,
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"いたみわけ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いたみわけ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1 },
		onHit(target, pokemon) {
			const targetHP = target.getUndynamaxedHP()
			const averagehp = Math.floor((targetHP + pokemon.hp) / 2) || 1
			const targetChange = targetHP - averagehp
			target.sethp(target.hp - targetChange)
			this.add(
				"-sethp",
				target,
				target.getHealth,
				"[from] move: Pain Split",
				"[silent]"
			)
			pokemon.sethp(averagehp)
			this.add("-sethp", pokemon, pokemon.getHealth, "[from] move: Pain Split")
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"パラボラチャージ": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "パラボラチャージ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		secondary: null,
		target: "allAdjacent",
		type: "でんき",
		contestType: "Clever"
	},
	"すてゼリフ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "すてゼリフ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		onHit(target, source, move) {
			const success = this.boost({ atk: -1, spa: -1 }, target, source)
			if (!success && !target.hasAbility("ミラーアーマー")) {
				delete move.selfSwitch
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { effect: "healreplacement" },
		contestType: "Cool"
	},
	"しっぺがえし": {
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug("Payback NOT boosted")
				return move.basePower
			}
			this.debug("Payback damage boost")
			return move.basePower * 2
		},
		category: "物理",
		name: "しっぺがえし",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Tough"
	},
	"ネコにこばん": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "ネコにこばん",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Clever"
	},
	"つつく": {
		accuracy: 100,
		basePower: 35,
		category: "物理",
		name: "つつく",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"ほろびのうた": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ほろびのうた",
		pp: 5,
		priority: 0,
		flags: { sound: 1, distance: 1, bypasssub: 1 },
		onHitField(target, source, move) {
			let result = false
			let message = false
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent("Invulnerability", pokemon, source, move) === false) {
					this.add("-miss", source, pokemon)
					result = true
				} else if (this.runEvent("TryHit", pokemon, source, move) === null) {
					result = true
				} else if (!pokemon.volatiles["ほろびのうた"]) {
					pokemon.addVolatile("ほろびのうた")
					this.add("-start", pokemon, "perish3", "[silent]")
					result = true
					message = true
				}
			}
			if (!result) return false
			if (message) this.add("-fieldactivate", "move: Perish Song")
		},
		condition: {
			duration: 4,
			onEnd(target) {
				this.add("-start", target, "perish0")
				target.faint()
			},
			onResidualOrder: 24,
			onResidual(pokemon) {
				const duration = pokemon.volatiles["ほろびのうた"].duration
				this.add("-start", pokemon, "perish" + duration)
			}
		},
		secondary: null,
		target: "all",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"はなふぶき": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "はなふぶき",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "くさ",
		contestType: "Beautiful"
	},
	"はなびらのまい": {
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "はなびらのまい",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, dance: 1, failinstruct: 1 },
		self: {
			volatileStatus: "lockedmove"
		},
		onAfterMove(pokemon) {
			if (
				pokemon.volatiles["lockedmove"] &&
				pokemon.volatiles["lockedmove"].duration === 1
			) {
				pokemon.removeVolatile("lockedmove")
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "くさ",
		contestType: "Beautiful"
	},
	"ゴーストダイブ": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "ゴーストダイブ",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			mirror: 1,
			nosleeptalk: 1,
			noassist: 1,
			failinstruct: 1
		},
		breaksProtect: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		condition: {
			duration: 2,
			onInvulnerability: false
		},
		secondary: null,
		target: "normal",
		type: "ゴースト",
		contestType: "Cool"
	},
	"ミサイルばり": {
		accuracy: 95,
		basePower: 25,
		category: "物理",
		name: "ミサイルばり",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "むし",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"なかよくする": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "なかよくする",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, mirror: 1, bypasssub: 1 },
		boosts: {
			atk: -1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"じゃれつく": {
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
				atk: -1
			}
		},
		target: "normal",
		type: "フェアリー",
		contestType: "Cute"
	},
	"ついばむ": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ついばむ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		onHit(target, source) {
			const item = target.getItem()
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add(
					"-enditem",
					target,
					item.name,
					"[from] stealeat",
					"[move] Pluck",
					"[of] " + source
				)
				if (this.singleEvent("Eat", item, null, source, null, null)) {
					this.runEvent("EatItem", source, null, null, item)
					if (item.id === "ヒメリのみ") target.staleness = "external"
				}
				if (item.onEat) source.ateBerry = true
			}
		},
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Cute"
	},
	"どくどくのキバ": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "どくどくのキバ",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			status: "tox"
		},
		target: "normal",
		type: "どく",
		contestType: "Clever"
	},
	"どくガス": {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "どくガス",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "psn",
		secondary: null,
		target: "allAdjacentFoes",
		type: "どく",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくづき": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "どくづき",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Tough"
	},
	"どくのこな": {
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "どくのこな",
		pp: 35,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		status: "psn",
		secondary: null,
		target: "normal",
		type: "どく",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくばり": {
		accuracy: 100,
		basePower: 15,
		category: "物理",
		name: "どくばり",
		pp: 35,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Clever"
	},
	"ポイズンテール": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "ポイズンテール",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: {
			chance: 10,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Clever"
	},
	"かふんだんご": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "かふんだんご",
		pp: 15,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1, allyanim: 1 },
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0
				move.infiltrates = true
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles["healblock"]) {
				this.attrLastMove("[still]")
				this.add("cant", source, "move: Heal Block", move)
				return false
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					if (target.volatiles["healblock"] && target.hp !== target.maxhp) {
						this.attrLastMove("[still]")
						// Wrong error message, correct one not supported yet
						this.add("cant", source, "move: Heal Block", move)
					} else {
						this.add("-immune", target)
					}
					return this.NOT_FAIL
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"ポルターガイスト": {
		accuracy: 90,
		basePower: 110,
		category: "物理",
		name: "ポルターガイスト",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onTry(source, target) {
			return !!target.item
		},
		onTryHit(target, source, move) {
			this.add(
				"-activate",
				target,
				"move: Poltergeist",
				this.dex.items.get(target.item).name
			)
		},
		secondary: null,
		target: "normal",
		type: "ゴースト"
	},
	"ネズミざん": {
		accuracy: 90,
		basePower: 20,
		category: "物理",
		name: "ネズミざん",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		multihit: 10,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "ノーマル"
	},
	"とびつく": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "とびつく",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1
			}
		},
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"はたく": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "はたく",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"こなゆき": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "こなゆき",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "frz"
		},
		target: "allAdjacentFoes",
		type: "こおり",
		contestType: "Beautiful"
	},
	"パワージェム": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "パワージェム",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Beautiful"
	},
	"パワーシフト": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Unobtainable",
		name: "パワーシフト",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "パワーシフト",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "パワーシフト")
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onCopy(pokemon) {
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "パワーシフト")
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onRestart(pokemon) {
				pokemon.removeVolatile("パワーシフト")
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル"
	},
	"パワーシェア": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "パワーシェア",
		pp: 10,
		priority: 0,
		flags: { protect: 1, allyanim: 1 },
		onHit(target, source) {
			const newatk = Math.floor(
				(target.storedStats.atk + source.storedStats.atk) / 2
			)
			target.storedStats.atk = newatk
			source.storedStats.atk = newatk
			const newspa = Math.floor(
				(target.storedStats.spa + source.storedStats.spa) / 2
			)
			target.storedStats.spa = newspa
			source.storedStats.spa = newspa
			this.add("-activate", source, "move: Power Split", "[of] " + target)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"パワースワップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "パワースワップ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1 },
		onHit(target, source) {
			const targetBoosts = {}
			const sourceBoosts = {}

			const atkSpa = ["atk", "spa"]
			for (const stat of atkSpa) {
				targetBoosts[stat] = target.boosts[stat]
				sourceBoosts[stat] = source.boosts[stat]
			}

			source.setBoost(targetBoosts)
			target.setBoost(sourceBoosts)

			this.add(
				"-swapboost",
				source,
				target,
				"atk, spa",
				"[from] move: Power Swap"
			)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"パワートリック": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "パワートリック",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "パワートリック",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "パワートリック")
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onCopy(pokemon) {
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "パワートリック")
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onRestart(pokemon) {
				pokemon.removeVolatile("パワートリック")
			}
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { boost: { atk: 1 } },
		contestType: "Clever"
	},
	"つけあがる": {
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts()
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "つけあがる",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Clever"
	},
	"パワーウィップ": {
		accuracy: 85,
		basePower: 120,
		category: "物理",
		name: "パワーウィップ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Tough"
	},
	"だんがいのつるぎ": {
		accuracy: 85,
		basePower: 120,
		category: "物理",
		name: "だんがいのつるぎ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		target: "allAdjacentFoes",
		type: "じめん",
		contestType: "Cool"
	},
	"プレゼント": {
		accuracy: 90,
		basePower: 0,
		category: "物理",
		name: "プレゼント",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onModifyMove(move, pokemon, target) {
			const rand = this.random(10)
			if (rand < 2) {
				move.heal = [1, 4]
				move.infiltrates = true
			} else if (rand < 6) {
				move.basePower = 40
			} else if (rand < 9) {
				move.basePower = 80
			} else {
				move.basePower = 120
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"まもる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "まもる",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "まもる",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "まもる")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["まもる"]) {
					if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return
					if (move.isZ || move.isMax)
						target.getMoveHitData(move).zBrokeProtect = true
					return
				}
				if (move.smartTarget) {
					move.smartTarget = false
				} else {
					this.add("-activate", target, "move: Protect")
				}
				const lockedmove = source.getVolatile("lockedmove")
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles["lockedmove"].duration === 2) {
						delete source.volatiles["lockedmove"]
					}
				}
				return this.NOT_FAIL
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"サイケこうせん": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "サイケこうせん",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: "ねんりき"
		},
		target: "normal",
		type: "エスパー",
		contestType: "Beautiful"
	},
	"サイコブレイド": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "サイコブレイド",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		onBasePower(basePower, source) {
			if (this.field.isTerrain("エレキフィールド")) {
				this.debug("psyblade electric terrain boost")
				return this.chainModify(1.5)
			}
		},
		target: "normal",
		type: "エスパー"
	},
	"じこあんじ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じこあんじ",
		pp: 10,
		priority: 0,
		flags: { bypasssub: 1, allyanim: 1 },
		onHit(target, source) {
			let i
			for (i in target.boosts) {
				source.boosts[i] = target.boosts[i]
			}
			const volatilesToCopy = ["きあいだめ", "gmaxchistrike", "laserfocus"]
			for (const volatile of volatilesToCopy) {
				if (target.volatiles[volatile]) {
					source.addVolatile(volatile)
					if (volatile === "gmaxchistrike")
						source.volatiles[volatile].layers =
							target.volatiles[volatile].layers
				} else {
					source.removeVolatile(volatile)
				}
			}
			this.add("-copyboost", source, target, "[from] move: Psych Up")
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { effect: "heal" },
		contestType: "Clever"
	},
	"サイコキネシス": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "サイコキネシス",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1
			}
		},
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"サイコファング": {
		accuracy: 100,
		basePower: 85,
		category: "物理",
		name: "サイコファング",
		pp: 10,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition("リフレクター")
			pokemon.side.removeSideCondition("ひかりのかべ")
			pokemon.side.removeSideCondition("オーロラベール")
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"サイコフィールド": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "サイコフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "サイコフィールド",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("グランドコート")) {
					return 8
				}
				return 5
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === "self")) {
					return
				}
				if (target.isSemiInvulnerable() || target.isAlly(source)) return
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id)
					if (baseMove.priority > 0) {
						this.hint(
							"Psychic Terrain doesn't affect Pokémon immune to Ground."
						)
					}
					return
				}
				this.add("-activate", target, "move: Psychic Terrain")
				return null
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (
					move.type === "サイコキネシス" &&
					attacker.isGrounded() &&
					!attacker.isSemiInvulnerable()
				) {
					this.debug("psychic terrain boost")
					return this.chainModify([5325, 4096])
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === "Ability") {
					this.add(
						"-fieldstart",
						"move: Psychic Terrain",
						"[from] ability: " + effect.name,
						"[of] " + source
					)
				} else {
					this.add("-fieldstart", "move: Psychic Terrain")
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add("-fieldend", "move: Psychic Terrain")
			}
		},
		secondary: null,
		target: "all",
		type: "エスパー",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"サイコカッター": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "サイコカッター",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Cool"
	},
	"バリアーラッシュ": {
		accuracy: 90,
		basePower: 70,
		category: "物理",
		name: "バリアーラッシュ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1
				}
			}
		},
		target: "normal",
		type: "エスパー"
	},
	"サイコショック": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		overrideDefensiveStat: "def",
		name: "サイコショック",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Beautiful"
	},
	"サイコブレイク": {
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		overrideDefensiveStat: "def",
		name: "サイコブレイク",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Cool"
	},
	"かえんボール": {
		accuracy: 90,
		basePower: 120,
		category: "物理",
		name: "かえんボール",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1, bullet: 1 },
		secondary: {
			chance: 10,
			status: "brn"
		},
		target: "normal",
		type: "ほのお"
	},
	"さきおくり": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "さきおくり",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onHit(target) {
			if (this.activePerHalf === 1) return false // fails in singles
			const action = this.queue.willMove(target)
			if (!action) return false

			action.order = 201
			this.add("-activate", target, "move: Quash")
		},
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"でんこうせっか": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "でんこうせっか",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"ファストガード": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ファストガード",
		pp: 15,
		priority: 3,
		flags: { snatch: 1 },
		sideCondition: "ファストガード",
		onTry() {
			return !!this.queue.willAct()
		},
		onHitSide(side, source) {
			source.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add("-singleturn", source, "ファストガード")
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Quick Guard blocks moves with positive priority, even those given increased priority by Prankster or Gale Wings.
				// (e.g. it blocks 0 priority moves boosted by Prankster or Gale Wings; Quick Claw/Custap Berry do not count)
				if (move.priority <= 0.1) return
				if (!move.flags["まもる"]) {
					if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return
					if (move.isZ || move.isMax)
						target.getMoveHitData(move).zBrokeProtect = true
					return
				}
				this.add("-activate", target, "move: Quick Guard")
				const lockedmove = source.getVolatile("lockedmove")
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles["lockedmove"].duration === 2) {
						delete source.volatiles["lockedmove"]
					}
				}
				return this.NOT_FAIL
			}
		},
		secondary: null,
		target: "allySide",
		type: "かくとう",
		zMove: { boost: { def: 1 } },
		contestType: "Cool"
	},
	"ちょうのまい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ちょうのまい",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, dance: 1 },
		boosts: {
			spa: 1,
			spd: 1,
			spe: 1
		},
		secondary: null,
		target: "self",
		type: "むし",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"ふんどのこぶし": {
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 50 * pokemon.timesAttacked)
		},
		category: "物理",
		name: "ふんどのこぶし",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "ゴースト"
	},
	"いかりのこな": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いかりのこな",
		pp: 20,
		priority: 2,
		flags: { powder: 1, noassist: 1, failcopycat: 1 },
		volatileStatus: "いかりのこな",
		onTry(source) {
			return this.activePerHalf > 1
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add("-singleturn", pokemon, "move: Rage Powder")
			},
			onFoeRedirectTargetPriority: 1,
			onFoeRedirectTarget(target, source, source2, move) {
				const ragePowderUser = this.effectState.target
				if (ragePowderUser.isSkyDropped()) return

				if (
					source.runStatusImmunity("powder") &&
					this.validTarget(ragePowderUser, source, move.target)
				) {
					if (move.smartTarget) move.smartTarget = false
					this.debug("Rage Powder redirected target of move")
					return ragePowderUser
				}
			}
		},
		secondary: null,
		target: "self",
		type: "むし",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"レイジングブル": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "レイジングブル",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition("リフレクター")
			pokemon.side.removeSideCondition("ひかりのかべ")
			pokemon.side.removeSideCondition("オーロラベール")
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
				case "Tauros-Paldea-Combat":
					move.type = "Fighting"
					break
				case "Tauros-Paldea-Blaze":
					move.type = "Fire"
					break
				case "Tauros-Paldea-Aqua":
					move.type = "Water"
					break
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル"
	},
	"だいふんげき": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "だいふんげき",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		self: {
			volatileStatus: "lockedmove"
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles["lockedmove"]?.duration === 1) {
				pokemon.removeVolatile("lockedmove")
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "ほのお"
	},
	"あまごい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "あまごい",
		pp: 5,
		priority: 0,
		flags: {},
		weather: "RainDance",
		secondary: null,
		target: "all",
		type: "みず",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"こうそくスピン": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "こうそくスピン",
		pp: 40,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile("やどりぎのタネ")) {
					this.add(
						"-end",
						pokemon,
						"やどりぎのタネ",
						"[from] move: Rapid Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"まきびし",
					"どくびし",
					"ステルスロック",
					"ねばねばネット",
					"gmaxsteelsurge"
				]
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add(
							"-sideend",
							pokemon.side,
							this.dex.conditions.get(condition).name,
							"[from] move: Rapid Spin",
							"[of] " + pokemon
						)
					}
				}
				if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
					pokemon.removeVolatile("partiallytrapped")
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile("やどりぎのタネ")) {
					this.add(
						"-end",
						pokemon,
						"やどりぎのタネ",
						"[from] move: Rapid Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"まきびし",
					"どくびし",
					"ステルスロック",
					"ねばねばネット",
					"gmaxsteelsurge"
				]
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add(
							"-sideend",
							pokemon.side,
							this.dex.conditions.get(condition).name,
							"[from] move: Rapid Spin",
							"[of] " + pokemon
						)
					}
				}
				if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
					pokemon.removeVolatile("partiallytrapped")
				}
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1
				}
			}
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"はっぱカッター": {
		accuracy: 95,
		basePower: 55,
		category: "物理",
		name: "はっぱカッター",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "くさ",
		contestType: "Cool"
	},
	"シェルブレード": {
		accuracy: 95,
		basePower: 75,
		category: "物理",
		name: "シェルブレード",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: {
			chance: 50,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"じこさいせい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じこさいせい",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"リサイクル": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "リサイクル",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		onHit(pokemon) {
			if (pokemon.item || !pokemon.lastItem) return false
			const item = pokemon.lastItem
			pokemon.lastItem = ""
			this.add(
				"-item",
				pokemon,
				this.dex.items.get(item),
				"[from] move: Recycle"
			)
			pokemon.setItem(item)
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"リフレクター": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "リフレクター",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "リフレクター",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem("ひかりのねんど")) {
					return 8
				}
				return 5
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (
					target !== source &&
					this.effectState.target.hasAlly(target) &&
					this.getCategory(move) === "物理"
				) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug("Reflect weaken")
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096])
						return this.chainModify(0.5)
					}
				}
			},
			onSideStart(side) {
				this.add("-sidestart", side, "リフレクター")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add("-sideend", side, "リフレクター")
			}
		},
		secondary: null,
		target: "allySide",
		type: "エスパー",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"ミラータイプ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ミラータイプ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, bypasssub: 1, allyanim: 1 },
		onHit(target, source) {
			if (
				source.species &&
				(source.species.num === 493 || source.species.num === 773)
			)
				return false
			if (source.terastallized) return false
			const oldApparentType = source.apparentType
			let newBaseTypes = target.getTypes(true).filter(type => type !== "???")
			if (!newBaseTypes.length) {
				if (target.addedType) {
					newBaseTypes = ["Normal"]
				} else {
					return false
				}
			}
			this.add(
				"-start",
				source,
				"typechange",
				"[from] move: Reflect Type",
				"[of] " + target
			)
			source.setType(newBaseTypes)
			source.addedType = target.addedType
			source.knownType = target.isAlly(source) && target.knownType
			if (!source.knownType) source.apparentType = oldApparentType
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"いにしえのうた": {
		accuracy: 100,
		basePower: 75,
		category: "特殊",
		name: "いにしえのうた",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 10,
			status: "slp"
		},
		onHit(target, pokemon, move) {
			if (
				pokemon.baseSpecies.baseSpecies === "Meloetta" &&
				!pokemon.transformed
			) {
				move.willChangeForme = true
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme =
					pokemon.species.id === "meloettapirouette" ? "" : "-Pirouette"
				pokemon.formeChange(
					"Meloetta" + meloettaForme,
					this.effect,
					false,
					"[msg]"
				)
			}
		},
		target: "allAdjacentFoes",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"ねむる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねむる",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onTry(source) {
			if (source.status === "slp" || source.hasAbility("ぜったいねむり")) return false

			if (source.hp === source.maxhp) {
				this.add("-fail", source, "heal")
				return null
			}
			if (source.hasAbility(["ふみん", "やるき"])) {
				this.add(
					"-fail",
					source,
					"[from] ability: " + source.getAbility().name,
					"[of] " + source
				)
				return null
			}
		},
		onHit(target, source, move) {
			const result = target.setStatus("slp", source, move)
			if (!result) return result
			target.statusState.time = 3
			target.statusState.startTime = 3
			this.heal(target.maxhp) // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"かたきうち": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "かたきうち",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug("Boosted for a faint last turn")
				return this.chainModify(2)
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"めざめるダンス": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "めざめるダンス",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, dance: 1 },
		onModifyType(move, pokemon) {
			let type = pokemon.getTypes()[0]
			if (type === "Bird") type = "???"
			move.type = type
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"きしかいせい": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const ratio = Math.max(Math.floor((pokemon.hp * 48) / pokemon.maxhp), 1)
			let bp
			if (ratio < 2) {
				bp = 200
			} else if (ratio < 5) {
				bp = 150
			} else if (ratio < 10) {
				bp = 100
			} else if (ratio < 17) {
				bp = 80
			} else if (ratio < 33) {
				bp = 40
			} else {
				bp = 20
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "きしかいせい",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "かくとう",
		zMove: { basePower: 160 },
		contestType: "Cool"
	},
	"さいきのいのり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "さいきのいのり",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onTryHit(source) {
			if (!source.side.pokemon.filter(ally => ally.fainted).length) {
				return false
			}
		},
		slotCondition: "さいきのいのり",
		// No this not a real switchout move
		// This is needed to trigger a switch protocol to choose a fainted party member
		// Feel free to refactor
		selfSwitch: true,
		condition: {
			duration: 1
			// reviving implemented in side.ts, kind of
		},
		secondary: null,
		target: "self",
		type: "ノーマル"
	},
	"ライジングボルト": {
		accuracy: 100,
		basePower: 70,
		basePowerCallback(source, target, move) {
			if (this.field.isTerrain("エレキフィールド") && target.isGrounded()) {
				if (!source.isAlly(target))
					this.hint(`${move.name}'s BP doubled on grounded target.`)
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "特殊",
		name: "ライジングボルト",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "でんき",
		maxMove: { basePower: 140 }
	},
	"ほえる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ほえる",
		pp: 20,
		priority: -6,
		flags: {
			reflectable: 1,
			mirror: 1,
			sound: 1,
			bypasssub: 1,
			allyanim: 1,
			noassist: 1,
			failcopycat: 1
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Cool"
	},
	"ときのほうこう": {
		accuracy: 90,
		basePower: 150,
		category: "特殊",
		name: "ときのほうこう",
		pp: 5,
		priority: 0,
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "mustrecharge"
		},
		secondary: null,
		target: "normal",
		type: "ドラゴン",
		contestType: "Beautiful"
	},
	"ロックブラスト": {
		accuracy: 90,
		basePower: 25,
		category: "物理",
		name: "ロックブラスト",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "いわ",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"ロックカット": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ロックカット",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spe: 2
		},
		secondary: null,
		target: "self",
		type: "いわ",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"いわなだれ": {
		accuracy: 90,
		basePower: 75,
		category: "物理",
		name: "いわなだれ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "allAdjacentFoes",
		type: "いわ",
		contestType: "Tough"
	},
	"いわくだき": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "いわくだき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"いわおとし": {
		accuracy: 90,
		basePower: 50,
		category: "物理",
		name: "いわおとし",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Tough"
	},
	"がんせきふうじ": {
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
				spe: -1
			}
		},
		target: "normal",
		type: "いわ",
		contestType: "Clever"
	},
	"なりきり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "なりきり",
		pp: 10,
		priority: 0,
		flags: { bypasssub: 1, allyanim: 1 },
		onTryHit(target, source) {
			if (target.ability === source.ability) return false

			const additionalBannedTargetAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				"しれいとう",
				"フラワーギフト",
				"てんきや",
				"はらぺこスイッチ",
				"イリュージョン",
				"かわりもの",
				"かがくへんかガス",
				"かがくのちから",
				"レシーバー",
				"トレース",
				"ふしぎなまもり",
				"ダルマモード"
			]

			if (
				target.getAbility().isPermanent ||
				additionalBannedTargetAbilities.includes(target.ability) ||
				source.getAbility().isPermanent
			) {
				return false
			}
		},
		onHit(target, source) {
			const oldAbility = source.setAbility(target.ability)
			if (oldAbility) {
				this.add(
					"-ability",
					source,
					source.getAbility().name,
					"[from] move: Role Play",
					"[of] " + target
				)
				return
			}
			return oldAbility
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"ころがる": {
		accuracy: 90,
		basePower: 30,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower
			const rolloutData = pokemon.volatiles["ころがる"]
			if (rolloutData?.hitCount) {
				bp *= Math.pow(2, rolloutData.contactHitCount)
			}
			if (rolloutData && pokemon.status !== "slp") {
				rolloutData.hitCount++
				rolloutData.contactHitCount++
				if (rolloutData.hitCount < 5) {
					rolloutData.duration = 2
				}
			}
			if (pokemon.volatiles["まるくなる"]) {
				bp *= 2
			}
			this.debug("BP: " + bp)
			return bp
		},
		category: "物理",
		name: "ころがる",
		pp: 20,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			noparentalbond: 1,
			failinstruct: 1
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.volatiles["ころがる"] || pokemon.status === "slp" || !target)
				return
			pokemon.addVolatile("ころがる")
			// @ts-ignore
			// TS thinks pokemon.volatiles['rollout'] doesn't exist because of the condition on the return above
			// but it does exist now because addVolatile created it
			pokemon.volatiles["ころがる"].targetSlot = move.sourceEffect
				? pokemon.lastMoveTargetLoc
				: pokemon.getLocOf(target)
		},
		onAfterMove(source, target, move) {
			const rolloutData = source.volatiles["ころがる"]
			if (
				rolloutData &&
				rolloutData.hitCount === 5 &&
				rolloutData.contactHitCount < 5
				// this conditions can only be met in gen7 and gen8dlc1
				// see `disguise` and `iceface` abilities in the resp mod folders
			) {
				source.addVolatile("rolloutstorage")
				source.volatiles["rolloutstorage"].contactHitCount =
					rolloutData.contactHitCount
			}
		},
		condition: {
			duration: 1,
			onLockMove: "ころがる",
			onStart() {
				this.effectState.hitCount = 0
				this.effectState.contactHitCount = 0
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === "わるあがき") {
					// don't lock
					delete target.volatiles["ころがる"]
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Cute"
	},
	"はねやすめ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はねやすめ",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		self: {
			volatileStatus: "はねやすめ"
		},
		condition: {
			duration: 1,
			onResidualOrder: 25,
			onStart(target) {
				if (!target.terastallized) {
					this.add("-singleturn", target, "move: Roost")
				} else if (target.terastallized === "Flying") {
					this.add(
						"-hint",
						"If a Flying Terastallized Pokemon uses Roost, it remains Flying-type."
					)
				}
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectState.typeWas = types
				return types.filter(type => type !== "Flying")
			}
		},
		secondary: null,
		target: "self",
		type: "ひこう",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"りんしょう": {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(target, source, move) {
			if (move.sourceEffect === "りんしょう") {
				this.debug("BP doubled")
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "特殊",
		name: "りんしょう",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		onTry(source, target, move) {
			for (const action of this.queue.list) {
				if (!action.pokemon || !action.move || action.maxMove || action.zmove)
					continue
				if (action.move.id === "りんしょう") {
					this.queue.prioritizeAction(action, move)
					return
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"カタストロフィ": {
		accuracy: 90,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1)
		},
		category: "特殊",
		name: "カタストロフィ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Tough"
	},
	"せいなるつるぎ": {
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
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"しんぴのまもり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しんぴのまもり",
		pp: 25,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "しんぴのまもり",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-activate",
						source,
						"ability: Persistent",
						"[move] Safeguard"
					)
					return 7
				}
				return 5
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return
				if (effect.id === "あくび") return
				if (
					effect.effectType === "Move" &&
					effect.infiltrates &&
					!target.isAlly(source)
				)
					return
				if (target !== source) {
					this.debug("interrupting setStatus")
					if (
						effect.name === "シンクロ" ||
						(effect.effectType === "Move" && !effect.secondaries)
					) {
						this.add("-activate", target, "move: Safeguard")
					}
					return null
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return
				if (
					effect.effectType === "Move" &&
					effect.infiltrates &&
					!target.isAlly(source)
				)
					return
				if (
					(status.id === "ねんりき" || status.id === "あくび") &&
					target !== source
				) {
					if (effect.effectType === "Move" && !effect.secondaries)
						this.add("-activate", target, "move: Safeguard")
					return null
				}
			},
			onSideStart(side, source) {
				if (source?.hasAbility("persistent")) {
					this.add("-sidestart", side, "しんぴのまもり", "[persistent]")
				} else {
					this.add("-sidestart", side, "しんぴのまもり")
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 3,
			onSideEnd(side) {
				this.add("-sideend", side, "しんぴのまもり")
			}
		},
		secondary: null,
		target: "allySide",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"しおづけ": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "しおづけ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add("-start", pokemon, "しおづけ")
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(
					pokemon.baseMaxhp / (pokemon.hasType(["Water", "Steel"]) ? 4 : 8)
				)
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "しおづけ")
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: "しおづけ"
		},
		target: "normal",
		type: "いわ"
	},
	"すなかけ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "すなかけ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			accuracy: -1
		},
		secondary: null,
		target: "normal",
		type: "じめん",
		zMove: { boost: { evasion: 1 } },
		contestType: "Cute"
	},
	"ねっさのあらし": {
		accuracy: 80,
		basePower: 100,
		category: "特殊",
		name: "ねっさのあらし",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		onModifyMove(move, pokemon, target) {
			if (
				target &&
				["あまごい", "はじまりのうみ"].includes(target.effectiveWeather())
			) {
				move.accuracy = true
			}
		},
		secondary: {
			chance: 20,
			status: "brn"
		},
		target: "allAdjacentFoes",
		type: "じめん"
	},
	"すなあらし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "すなあらし",
		pp: 10,
		priority: 0,
		flags: { wind: 1 },
		weather: "すなあらし",
		secondary: null,
		target: "all",
		type: "いわ",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"すなじごく": {
		accuracy: 85,
		basePower: 35,
		category: "物理",
		name: "すなじごく",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "じめん",
		contestType: "Clever"
	},
	"ねっとう": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ねっとう",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: "brn"
		},
		target: "normal",
		type: "みず",
		contestType: "Tough"
	},
	"スケイルショット": {
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
				spe: 1
			}
		},
		secondary: null,
		target: "normal",
		type: "ドラゴン",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 }
	},
	"こわいかお": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "こわいかお",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		boosts: {
			spe: -2
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"ねっさのだいち": {
		accuracy: 100,
		basePower: 70,
		category: "特殊",
		name: "ねっさのだいち",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: "brn"
		},
		target: "normal",
		type: "じめん"
	},
	"ひっかく": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "ひっかく",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"いやなおと": {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "いやなおと",
		pp: 40,
		priority: 0,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			sound: 1,
			bypasssub: 1,
			allyanim: 1
		},
		boosts: {
			def: -2
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { atk: 1 } },
		contestType: "Clever"
	},
	"タネばくだん": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "タネばくだん",
		pp: 15,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Tough"
	},
	"シードフレア": {
		accuracy: 85,
		basePower: 120,
		category: "特殊",
		name: "シードフレア",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 40,
			boosts: {
				spd: -2
			}
		},
		target: "normal",
		type: "くさ",
		contestType: "Beautiful"
	},
	"ちきゅうなげ": {
		accuracy: 100,
		basePower: 0,
		damage: "level",
		category: "物理",
		name: "ちきゅうなげ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		secondary: null,
		target: "normal",
		type: "かくとう",
		maxMove: { basePower: 75 },
		contestType: "Tough"
	},
	"じばく": {
		accuracy: 100,
		basePower: 200,
		category: "物理",
		name: "じばく",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, noparentalbond: 1 },
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"シャドーボール": {
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
				spd: -1
			}
		},
		target: "normal",
		type: "ゴースト",
		contestType: "Clever"
	},
	"シャドークロー": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "シャドークロー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "ゴースト",
		contestType: "Cool"
	},
	"シャドーダイブ": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "シャドーダイブ",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			mirror: 1,
			nosleeptalk: 1,
			noassist: 1,
			failinstruct: 1
		},
		breaksProtect: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		condition: {
			duration: 2,
			onInvulnerability: false
		},
		secondary: null,
		target: "normal",
		type: "ゴースト",
		contestType: "Cool"
	},
	"シャドーパンチ": {
		accuracy: true,
		basePower: 60,
		category: "物理",
		name: "シャドーパンチ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "ゴースト",
		contestType: "Clever"
	},
	"かげうち": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "かげうち",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ゴースト",
		contestType: "Clever"
	},
	"しっぽきり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しっぽきり",
		pp: 10,
		priority: 0,
		flags: {},
		volatileStatus: "みがわり",
		onTryHit(source) {
			if (!this.canSwitch(source.side) || source.volatiles["commanded"]) {
				this.add("-fail", source)
				return this.NOT_FAIL
			}
			if (source.volatiles["みがわり"]) {
				this.add("-fail", source, "move: Shed Tail")
				return this.NOT_FAIL
			}
			if (source.hp <= Math.ceil(source.maxhp / 2)) {
				this.add("-fail", source, "move: Shed Tail", "[weak]")
				return this.NOT_FAIL
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp / 2))
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true
			}
		},
		selfSwitch: "しっぽきり",
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" }
	},
	"ぜったいれいど": {
		accuracy: 30,
		basePower: 0,
		category: "特殊",
		name: "ぜったいれいど",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		ohko: "Ice",
		target: "normal",
		type: "こおり",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful"
	},
	"シェルアームズ": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "シェルアームズ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onPrepareHit(target, source, move) {
			if (!source.isAlly(target)) {
				this.attrLastMove("[anim] Shell Side Arm " + move.category)
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return
			const atk = pokemon.getStat("atk", false, true)
			const spa = pokemon.getStat("spa", false, true)
			const def = target.getStat("def", false, true)
			const spd = target.getStat("spd", false, true)
			const 物理 = Math.floor(
				Math.floor(
					Math.floor(Math.floor((2 * pokemon.level) / 5 + 2) * 90 * atk) / def
				) / 50
			)
			const 特殊 = Math.floor(
				Math.floor(
					Math.floor(Math.floor((2 * pokemon.level) / 5 + 2) * 90 * spa) / spd
				) / 50
			)
			if (
				物理 > 特殊 ||
				(物理 === 特殊 && this.random(2) === 0)
			) {
				move.category = "物理"
				move.flags.contact = 1
			}
		},
		onHit(target, source, move) {
			// Shell Side Arm normally reveals its category via animation on cart, but doesn't play either custom animation against allies
			if (!source.isAlly(target)) this.hint(move.category + " Shell Side Arm")
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Shell Side Arm")
		},
		secondary: {
			chance: 20,
			status: "psn"
		},
		target: "normal",
		type: "どく"
	},
	"からをやぶる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "からをやぶる",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: -1,
			spd: -1,
			atk: 2,
			spa: 2,
			spe: 2
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"たてこもる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "たてこもる",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 2
		},
		secondary: null,
		target: "self",
		type: "はがね"
	},
	"ギアチェンジ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ギアチェンジ",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spe: 2,
			atk: 1
		},
		secondary: null,
		target: "self",
		type: "はがね",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"でんげきは": {
		accuracy: true,
		basePower: 60,
		category: "特殊",
		name: "でんげきは",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"すなあつめ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "すなあつめ",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onHit(pokemon) {
			let factor = 0.5
			if (this.field.isWeather("すなあらし")) {
				factor = 0.667
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor))
			if (!success) {
				this.add("-fail", pokemon, "heal")
				return this.NOT_FAIL
			}
			return success
		},
		secondary: null,
		target: "self",
		type: "じめん",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"スレッドトラップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "スレッドトラップ",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: "スレッドトラップ",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "まもる")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["まもる"] || move.category === "Status") {
					if (move.isZ || move.isMax)
						target.getMoveHitData(move).zBrokeProtect = true
					return
				}
				if (move.smartTarget) {
					move.smartTarget = false
				} else {
					this.add("-activate", target, "move: Protect")
				}
				const lockedmove = source.getVolatile("lockedmove")
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles["lockedmove"].duration === 2) {
						delete source.volatiles["lockedmove"]
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost(
						{ spe: -1 },
						source,
						target,
						this.dex.getActiveMove("スレッドトラップ")
					)
				}
				return this.NOT_FAIL
			},
			onHit(target, source, move) {
				if (
					move.isZOrMaxPowered &&
					this.checkMoveMakesContact(move, source, target)
				) {
					this.boost(
						{ spe: -1 },
						source,
						target,
						this.dex.getActiveMove("スレッドトラップ")
					)
				}
			}
		},
		target: "self",
		type: "むし"
	},
	"シンプルビーム": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "シンプルビーム",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onTryHit(target) {
			if (
				target.getAbility().isPermanent ||
				target.ability === "たんじゅん" ||
				target.ability === "なまけ"
			) {
				return false
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility("たんじゅん")
			if (oldAbility) {
				this.add("-ability", pokemon, "たんじゅん", "[from] move: Simple Beam")
				return
			}
			return oldAbility
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"うたう": {
		accuracy: 55,
		basePower: 0,
		category: "Status",
		name: "うたう",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		status: "slp",
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"スキルスワップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "スキルスワップ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1 },
		onTryHit(target, source) {
			const additionalBannedAbilities = [
				"はらぺこスイッチ",
				"イリュージョン",
				"かがくへんかガス",
				"ふしぎなまもり"
			]
			const targetAbility = target.getAbility()
			const sourceAbility = source.getAbility()
			// TODO: research in what order these should be checked
			if (
				target.volatiles["dynamax"] ||
				targetAbility.isPermanent ||
				sourceAbility.isPermanent ||
				additionalBannedAbilities.includes(target.ability) ||
				additionalBannedAbilities.includes(source.ability)
			) {
				return false
			}
			const sourceCanBeSet = this.runEvent(
				"SetAbility",
				source,
				source,
				this.effect,
				targetAbility
			)
			if (!sourceCanBeSet) return sourceCanBeSet
			const targetCanBeSet = this.runEvent(
				"SetAbility",
				target,
				source,
				this.effect,
				sourceAbility
			)
			if (!targetCanBeSet) return targetCanBeSet
		},
		onHit(target, source, move) {
			const targetAbility = target.getAbility()
			const sourceAbility = source.getAbility()
			if (target.isAlly(source)) {
				this.add(
					"-activate",
					source,
					"move: Skill Swap",
					"",
					"",
					"[of] " + target
				)
			} else {
				this.add(
					"-activate",
					source,
					"move: Skill Swap",
					targetAbility,
					sourceAbility,
					"[of] " + target
				)
			}
			this.singleEvent("End", sourceAbility, source.abilityState, source)
			this.singleEvent("End", targetAbility, target.abilityState, target)
			source.ability = targetAbility.id
			target.ability = sourceAbility.id
			source.abilityState = { id: this.toID(source.ability), target: source }
			target.abilityState = { id: this.toID(target.ability), target: target }
			if (!target.isAlly(source)) target.volatileStaleness = "external"
			this.singleEvent("Start", targetAbility, source.abilityState, source)
			this.singleEvent("Start", sourceAbility, target.abilityState, target)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"はいよるいちげき": {
		accuracy: 90,
		basePower: 70,
		category: "物理",
		name: "はいよるいちげき",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1
			}
		},
		target: "normal",
		type: "むし"
	},
	"ゴッドバード": {
		accuracy: 90,
		basePower: 140,
		category: "物理",
		name: "ゴッドバード",
		pp: 5,
		priority: 0,
		flags: {
			charge: 1,
			protect: 1,
			mirror: 1,
			distance: 1,
			nosleeptalk: 1,
			failinstruct: 1
		},
		critRatio: 2,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"なまける": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "なまける",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"たたきつける": {
		accuracy: 75,
		basePower: 80,
		category: "物理",
		name: "たたきつける",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"きりさく": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "きりさく",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Cool"
	},
	"ねむりごな": {
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "ねむりごな",
		pp: 15,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		status: "slp",
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ねごと": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねごと",
		pp: 10,
		priority: 0,
		flags: {
			failencore: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		sleepUsable: true,
		onTry(source) {
			return source.status === "slp" || source.hasAbility("ぜったいねむり")
		},
		onHit(pokemon) {
			const moves = []
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id
				if (!moveid) continue
				const move = this.dex.moves.get(moveid)
				if (
					move.flags["nosleeptalk"] ||
					move.flags["じゅうでん"] ||
					(move.isZ && move.basePower !== 1) ||
					move.isMax
				) {
					continue
				}
				moves.push(moveid)
			}
			let randomMove = ""
			if (moves.length) randomMove = this.sample(moves)
			if (!randomMove) {
				return false
			}
			this.actions.useMove(randomMove, pokemon)
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "crit2" },
		contestType: "Cute"
	},
	"ヘドロこうげき": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "ヘドロこうげき",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Tough"
	},
	"ヘドロばくだん": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "ヘドロばくだん",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Tough"
	},
	"ヘドロウェーブ": {
		accuracy: 100,
		basePower: 95,
		category: "特殊",
		name: "ヘドロウェーブ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "psn"
		},
		target: "allAdjacent",
		type: "どく",
		contestType: "Tough"
	},
	"うちおとす": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "うちおとす",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		volatileStatus: "うちおとす",
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false
				if (pokemon.hasType("Flying") || pokemon.hasAbility("ふゆう"))
					applies = true
				if (
					pokemon.hasItem("くろいてっきゅう") ||
					pokemon.volatiles["ねをはる"] ||
					this.field.getPseudoWeather("じゅうりょく")
				)
					applies = false
				if (pokemon.removeVolatile("そらをとぶ") || pokemon.removeVolatile("とびはねる")) {
					applies = true
					this.queue.cancelMove(pokemon)
					pokemon.removeVolatile("twoturnmove")
				}
				if (pokemon.volatiles["でんじふゆう"]) {
					applies = true
					delete pokemon.volatiles["でんじふゆう"]
				}
				if (pokemon.volatiles["telekinesis"]) {
					applies = true
					delete pokemon.volatiles["telekinesis"]
				}
				if (!applies) return false
				this.add("-start", pokemon, "うちおとす")
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile("そらをとぶ") || pokemon.removeVolatile("とびはねる")) {
					this.queue.cancelMove(pokemon)
					pokemon.removeVolatile("twoturnmove")
					this.add("-start", pokemon, "うちおとす")
				}
			}
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Tough"
	},
	"スマートホーン": {
		accuracy: true,
		basePower: 70,
		category: "物理",
		name: "スマートホーン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "はがね",
		contestType: "Cool"
	},
	"スモッグ": {
		accuracy: 70,
		basePower: 30,
		category: "特殊",
		name: "スモッグ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 40,
			status: "psn"
		},
		target: "normal",
		type: "どく",
		contestType: "Tough"
	},
	"えんまく": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "えんまく",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			accuracy: -1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { evasion: 1 } },
		contestType: "Clever"
	},
	"バークアウト": {
		accuracy: 95,
		basePower: 55,
		category: "特殊",
		name: "バークアウト",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1
			}
		},
		target: "allAdjacentFoes",
		type: "あく",
		contestType: "Tough"
	},
	"ねらいうち": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ねらいうち",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "みず"
	},
	"いびき": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "いびき",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		sleepUsable: true,
		onTry(source) {
			return source.status === "slp" || source.hasAbility("ぜったいねむり")
		},
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"ゆきげしき": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ゆきげしき",
		pp: 10,
		priority: 0,
		flags: {},
		weather: "snow",
		secondary: null,
		target: "all",
		type: "こおり"
	},
	"みずびたし": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "みずびたし",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onHit(target) {
			if (target.getTypes().join() === "Water" || !target.setType("Water")) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add("-fail", target)
				return null
			}
			this.add("-start", target, "typechange", "Water")
		},
		secondary: null,
		target: "normal",
		type: "みず",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"タマゴうみ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "タマゴうみ",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ソーラービーム": {
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "ソーラービーム",
		pp: 10,
		priority: 0,
		flags: {
			charge: 1,
			protect: 1,
			mirror: 1,
			nosleeptalk: 1,
			failinstruct: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (["にほんばれ", "おわりのだいち"].includes(attacker.effectiveWeather())) {
				this.attrLastMove("[still]")
				this.addMove("-anim", attacker, move.name, defender)
				return
			}
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = [
				"あまごい",
				"はじまりのうみ",
				"すなあらし",
				"hail",
				"snow"
			]
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug("weakened by weather")
				return this.chainModify(0.5)
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"ソーラーブレード": {
		accuracy: 100,
		basePower: 125,
		category: "物理",
		name: "ソーラーブレード",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1,
			charge: 1,
			protect: 1,
			mirror: 1,
			slicing: 1,
			nosleeptalk: 1,
			failinstruct: 1
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return
			}
			this.add("-prepare", attacker, move.name)
			if (["にほんばれ", "おわりのだいち"].includes(attacker.effectiveWeather())) {
				this.attrLastMove("[still]")
				this.addMove("-anim", attacker, move.name, defender)
				return
			}
			if (!this.runEvent("ChargeMove", attacker, defender, move)) {
				return
			}
			attacker.addVolatile("twoturnmove", defender)
			return null
		},
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = [
				"あまごい",
				"はじまりのうみ",
				"すなあらし",
				"hail",
				"snow"
			]
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug("weakened by weather")
				return this.chainModify(0.5)
			}
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"あくうせつだん": {
		accuracy: 95,
		basePower: 100,
		category: "特殊",
		name: "あくうせつだん",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "ドラゴン",
		contestType: "Beautiful"
	},
	"スパーク": {
		accuracy: 100,
		basePower: 65,
		category: "物理",
		name: "スパーク",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"スピードスワップ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "スピードスワップ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1 },
		onHit(target, source) {
			const targetSpe = target.storedStats.spe
			target.storedStats.spe = source.storedStats.spe
			source.storedStats.spe = targetSpe
			this.add("-activate", source, "move: Speed Swap", "[of] " + target)
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ハバネロエキス": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ハバネロエキス",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			atk: 2,
			def: -2
		},
		secondary: null,
		target: "normal",
		type: "くさ"
	},
	"まきびし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "まきびし",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, nonsky: 1, mustpressure: 1 },
		sideCondition: "まきびし",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add("-sidestart", side, "まきびし")
				this.effectState.layers = 1
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false
				this.add("-sidestart", side, "まきびし")
				this.effectState.layers++
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem("あつぞこブーツ")) return
				const damageAmounts = [0, 3, 4, 6] // 1/8, 1/6, 1/4
				this.damage(
					(damageAmounts[this.effectState.layers] * pokemon.maxhp) / 24
				)
			}
		},
		secondary: null,
		target: "foeSide",
		type: "じめん",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"ニードルガード": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ニードルガード",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "ニードルガード",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "move: Protect")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["まもる"]) {
					if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return
					if (move.isZ || move.isMax)
						target.getMoveHitData(move).zBrokeProtect = true
					return
				}
				if (move.smartTarget) {
					move.smartTarget = false
				} else {
					this.add("-activate", target, "move: Protect")
				}
				const lockedmove = source.getVolatile("lockedmove")
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles["lockedmove"].duration === 2) {
						delete source.volatiles["lockedmove"]
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 8, source, target)
				}
				return this.NOT_FAIL
			},
			onHit(target, source, move) {
				if (
					move.isZOrMaxPowered &&
					this.checkMoveMakesContact(move, source, target)
				) {
					this.damage(source.baseMaxhp / 8, source, target)
				}
			}
		},
		secondary: null,
		target: "self",
		type: "くさ",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"ホイールスピン": {
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "ホイールスピン",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spe: -2
			}
		},
		secondary: null,
		target: "normal",
		type: "はがね"
	},
	"ソウルクラッシュ": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "ソウルクラッシュ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1
			}
		},
		target: "normal",
		type: "フェアリー"
	},
	"かげぬい": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "かげぬい",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive)
					target.addVolatile("trapped", source, move, "trapper")
			}
		},
		target: "normal",
		type: "ゴースト",
		contestType: "Tough"
	},
	"はきだす": {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon) {
			if (!pokemon.volatiles["たくわえる"]?.layers) return false
			return pokemon.volatiles["たくわえる"].layers * 100
		},
		category: "特殊",
		name: "はきだす",
		pp: 10,
		priority: 0,
		flags: { protect: 1 },
		onTry(source) {
			return !!source.volatiles["たくわえる"]
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile("たくわえる")
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"うらみ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "うらみ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		onHit(target) {
			let move = target.lastMove
			if (!move || move.isZ) return false
			if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove)

			const ppDeducted = target.deductPP(move.id, 4)
			if (!ppDeducted) return false
			this.add("-activate", target, "move: Spite", move.name, ppDeducted)
		},
		secondary: null,
		target: "normal",
		type: "ゴースト",
		zMove: { effect: "heal" },
		contestType: "Tough"
	},
	"はねる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はねる",
		pp: 40,
		priority: 0,
		flags: { gravity: 1 },
		onTry(source, target, move) {
			// Additional Gravity check for Z-move variant
			if (this.field.getPseudoWeather("じゅうりょく")) {
				this.add("cant", source, "move: Gravity", move)
				return null
			}
		},
		onTryHit(target, source) {
			this.add("-nothing")
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { atk: 3 } },
		contestType: "Cute"
	},
	"キノコのほうし": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "キノコのほうし",
		pp: 15,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		status: "slp",
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"はるのあらし": {
		accuracy: 80,
		basePower: 100,
		category: "特殊",
		name: "はるのあらし",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: {
			chance: 30,
			boosts: {
				atk: -1
			}
		},
		target: "allAdjacentFoes",
		type: "フェアリー"
	},
	"ステルスロック": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ステルスロック",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, mustpressure: 1 },
		sideCondition: "ステルスロック",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add("-sidestart", side, "move: Stealth Rock")
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem("あつぞこブーツ")) return
				const typeMod = this.clampIntRange(
					pokemon.runEffectiveness(this.dex.getActiveMove("ステルスロック")),
					-6,
					6
				)
				this.damage((pokemon.maxhp * Math.pow(2, typeMod)) / 8)
			}
		},
		secondary: null,
		target: "foeSide",
		type: "いわ",
		zMove: { boost: { def: 1 } },
		contestType: "Cool"
	},
	"スチームバースト": {
		accuracy: 95,
		basePower: 110,
		category: "特殊",
		name: "スチームバースト",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: "brn"
		},
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"てっていこうせん": {
		accuracy: 95,
		basePower: 140,
		category: "特殊",
		name: "てっていこうせん",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp
				this.damage(
					Math.round(pokemon.maxhp / 2),
					pokemon,
					pokemon,
					this.dex.conditions.get("てっていこうせん"),
					true
				)
				if (
					pokemon.hp <= pokemon.maxhp / 2 &&
					hpBeforeRecoil > pokemon.maxhp / 2
				) {
					this.runEvent("EmergencyExit", pokemon, pokemon)
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "はがね"
	},
	"アイアンローラー": {
		accuracy: 100,
		basePower: 130,
		category: "物理",
		name: "アイアンローラー",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTry() {
			return !this.field.isTerrain("")
		},
		onHit() {
			this.field.clearTerrain()
		},
		onAfterSubDamage() {
			this.field.clearTerrain()
		},
		secondary: null,
		target: "normal",
		type: "はがね"
	},
	"はがねのつばさ": {
		accuracy: 90,
		basePower: 70,
		category: "物理",
		name: "はがねのつばさ",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					def: 1
				}
			}
		},
		target: "normal",
		type: "はがね",
		contestType: "Cool"
	},
	"ねばねばネット": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねばねばネット",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1 },
		sideCondition: "ねばねばネット",
		condition: {
			onSideStart(side) {
				this.add("-sidestart", side, "move: Sticky Web")
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem("あつぞこブーツ")) return
				this.add("-activate", pokemon, "move: Sticky Web")
				this.boost(
					{ spe: -1 },
					pokemon,
					this.effectState.source,
					this.dex.getActiveMove("ねばねばネット")
				)
			}
		},
		secondary: null,
		target: "foeSide",
		type: "むし",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"たくわえる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "たくわえる",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		onTry(source) {
			if (
				source.volatiles["たくわえる"] &&
				source.volatiles["たくわえる"].layers >= 3
			)
				return false
		},
		volatileStatus: "たくわえる",
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectState.layers = 1
				this.effectState.def = 0
				this.effectState.spd = 0
				this.add("-start", target, "たくわえる" + this.effectState.layers)
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd]
				this.boost({ def: 1, spd: 1 }, target, target)
				if (curDef !== target.boosts.def) this.effectState.def--
				if (curSpD !== target.boosts.spd) this.effectState.spd--
			},
			onRestart(target) {
				if (this.effectState.layers >= 3) return false
				this.effectState.layers++
				this.add("-start", target, "たくわえる" + this.effectState.layers)
				const curDef = target.boosts.def
				const curSpD = target.boosts.spd
				this.boost({ def: 1, spd: 1 }, target, target)
				if (curDef !== target.boosts.def) this.effectState.def--
				if (curSpD !== target.boosts.spd) this.effectState.spd--
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts = {}
					if (this.effectState.def) boosts.def = this.effectState.def
					if (this.effectState.spd) boosts.spd = this.effectState.spd
					this.boost(boosts, target, target)
				}
				this.add("-end", target, "たくわえる")
				if (
					this.effectState.def !== this.effectState.layers * -1 ||
					this.effectState.spd !== this.effectState.layers * -1
				) {
					this.hint(
						"In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually."
					)
				}
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "heal" },
		contestType: "Tough"
	},
	"ふみつけ": {
		accuracy: 100,
		basePower: 65,
		category: "物理",
		name: "ふみつけ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"じだんだ": {
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) {
				this.debug("doubling Stomping Tantrum BP due to previous move failure")
				return move.basePower * 2
			}
			return move.basePower
		},
		category: "物理",
		name: "じだんだ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "じめん",
		contestType: "Tough"
	},
	"がんせきアックス": {
		accuracy: 90,
		basePower: 65,
		category: "物理",
		name: "がんせきアックス",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition("ステルスロック")
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition("ステルスロック")
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "いわ"
	},
	"ストーンエッジ": {
		accuracy: 80,
		basePower: 100,
		category: "物理",
		name: "ストーンエッジ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "いわ",
		contestType: "Tough"
	},
	"アシストパワー": {
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts()
			this.debug("BP: " + bp)
			return bp
		},
		category: "特殊",
		name: "アシストパワー",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Clever"
	},
	"ワンダースチーム": {
		accuracy: 95,
		basePower: 90,
		category: "特殊",
		name: "ワンダースチーム",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "ねんりき"
		},
		target: "normal",
		type: "フェアリー"
	},
	"かいりき": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "かいりき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ちからをすいとる": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "ちからをすいとる",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, heal: 1 },
		onHit(target, source) {
			if (target.boosts.atk === -6) return false
			const atk = target.getStat("atk", false, true)
			const success = this.boost({ atk: -1 }, target, source, null, false, true)
			return !!(this.heal(atk, source, target) || success)
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"いとをはく": {
		accuracy: 95,
		basePower: 0,
		category: "Status",
		name: "いとをはく",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			spe: -2
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "むし",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"わるあがき": {
		accuracy: true,
		basePower: 50,
		category: "物理",
		name: "わるあがき",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			failencore: 1,
			failmefirst: 1,
			nosleeptalk: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		noSketch: true,
		onModifyMove(move, pokemon, target) {
			move.type = "???"
			this.add("-activate", pokemon, "move: Struggle")
		},
		struggleRecoil: true,
		secondary: null,
		target: "randomNormal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"むしのていこう": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "むしのていこう",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1
			}
		},
		target: "allAdjacentFoes",
		type: "むし",
		contestType: "Cute"
	},
	"ほおばる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ほおばる",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isBerry) pokemon.disableMove("ほおばる")
		},
		onTry(source) {
			return source.getItem().isBerry
		},
		onHit(pokemon) {
			if (!this.boost({ def: 2 })) return null
			pokemon.eatItem(true)
		},
		secondary: null,
		target: "self",
		type: "ノーマル"
	},
	"しびれごな": {
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "しびれごな",
		pp: 30,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		status: "par",
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"みがわり": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みがわり",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, nonsky: 1 },
		volatileStatus: "みがわり",
		onTryHit(source) {
			if (source.volatiles["みがわり"]) {
				this.add("-fail", source, "move: Substitute")
				return this.NOT_FAIL
			}
			if (source.hp <= source.maxhp / 4 || source.maxhp === 1) {
				// Shedinja clause
				this.add("-fail", source, "move: Substitute", "[weak]")
				return this.NOT_FAIL
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 4)
		},
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === "しっぽきり") {
					this.add("-start", target, "みがわり", "[from] move: Shed Tail")
				} else {
					this.add("-start", target, "みがわり")
				}
				this.effectState.hp = Math.floor(target.maxhp / 4)
				if (target.volatiles["partiallytrapped"]) {
					this.add(
						"-end",
						target,
						target.volatiles["partiallytrapped"].sourceEffect,
						"[partiallytrapped]",
						"[silent]"
					)
					delete target.volatiles["partiallytrapped"]
				}
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags["bypasssub"] || move.infiltrates) {
					return
				}
				let damage = this.actions.getDamage(source, target, move)
				if (!damage && damage !== 0) {
					this.add("-fail", source)
					this.attrLastMove("[still]")
					return null
				}
				damage = this.runEvent("SubDamage", target, source, move, damage)
				if (!damage) {
					return damage
				}
				if (damage > target.volatiles["みがわり"].hp) {
					damage = target.volatiles["みがわり"].hp
				}
				target.volatiles["みがわり"].hp -= damage
				source.lastDamage = damage
				if (target.volatiles["みがわり"].hp <= 0) {
					if (move.ohko) this.add("-ohko")
					target.removeVolatile("みがわり")
				} else {
					this.add("-activate", target, "move: Substitute", "[damage]")
				}
				if (move.recoil || move.id === "クロロブラスト") {
					this.damage(
						this.actions.calcRecoilDamage(damage, move, source),
						source,
						target,
						"recoil"
					)
				}
				if (move.drain) {
					this.heal(
						Math.ceil((damage * move.drain[0]) / move.drain[1]),
						source,
						target,
						"drain"
					)
				}
				this.singleEvent(
					"AfterSubDamage",
					move,
					null,
					target,
					source,
					move,
					damage
				)
				this.runEvent("AfterSubDamage", target, source, move, damage)
				return this.HIT_SUBSTITUTE
			},
			onEnd(target) {
				this.add("-end", target, "みがわり")
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ふいうち": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "ふいうち",
		pp: 5,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTry(source, target) {
			const action = this.queue.willMove(target)
			const move = action?.choice === "move" ? action.move : null
			if (
				!move ||
				(move.category === "Status" && move.id !== "mefirst") ||
				target.volatiles["mustrecharge"]
			) {
				return false
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Clever"
	},
	"にほんばれ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "にほんばれ",
		pp: 5,
		priority: 0,
		flags: {},
		weather: "にほんばれ",
		secondary: null,
		target: "all",
		type: "ほのお",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"いかりのまえば": {
		accuracy: 90,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(target.getUndynamaxedHP() / 2, 1)
		},
		category: "物理",
		name: "いかりのまえば",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ばかぢから": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ばかぢから",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				atk: -1,
				def: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Tough"
	},
	"ちょうおんぱ": {
		accuracy: 55,
		basePower: 0,
		category: "Status",
		name: "ちょうおんぱ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		volatileStatus: "ねんりき",
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"なみのり": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "なみのり",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "みず",
		contestType: "Beautiful"
	},
	"すいりゅうれんだ": {
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
		target: "normal",
		type: "みず",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 }
	},
	"いばる": {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "いばる",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		volatileStatus: "ねんりき",
		boosts: {
			atk: 2
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"のみこむ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "のみこむ",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onTry(source) {
			return !!source.volatiles["たくわえる"]
		},
		onHit(pokemon) {
			const healAmount = [0.25, 0.5, 1]
			const success = !!this.heal(
				this.modify(
					pokemon.maxhp,
					healAmount[pokemon.volatiles["たくわえる"].layers - 1]
				)
			)
			if (!success) this.add("-fail", pokemon, "heal")
			pokemon.removeVolatile("たくわえる")
			return success || this.NOT_FAIL
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"てんしのキッス": {
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "てんしのキッス",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "ねんりき",
		secondary: null,
		target: "normal",
		type: "フェアリー",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"あまいかおり": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "あまいかおり",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			evasion: -2
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "ノーマル",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"スピードスター": {
		accuracy: true,
		basePower: 60,
		category: "特殊",
		name: "スピードスター",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "ノーマル",
		contestType: "Cool"
	},
	"すりかえ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "すりかえ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
		onTryImmunity(target) {
			return !target.hasAbility("ねんちゃく")
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source)
			const myItem = source.takeItem()
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id
				if (myItem) source.item = myItem.id
				return false
			}
			if (
				(myItem &&
					!this.singleEvent(
						"TakeItem",
						myItem,
						source.itemState,
						target,
						source,
						move,
						myItem
					)) ||
				(yourItem &&
					!this.singleEvent(
						"TakeItem",
						yourItem,
						target.itemState,
						source,
						target,
						move,
						yourItem
					))
			) {
				if (yourItem) target.item = yourItem.id
				if (myItem) source.item = myItem.id
				return false
			}
			this.add("-activate", source, "move: Trick", "[of] " + target)
			if (myItem) {
				target.setItem(myItem)
				this.add("-item", target, myItem, "[from] move: Switcheroo")
			} else {
				this.add(
					"-enditem",
					target,
					yourItem,
					"[silent]",
					"[from] move: Switcheroo"
				)
			}
			if (yourItem) {
				source.setItem(yourItem)
				this.add("-item", source, yourItem, "[from] move: Switcheroo")
			} else {
				this.add(
					"-enditem",
					source,
					myItem,
					"[silent]",
					"[from] move: Switcheroo"
				)
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"つるぎのまい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "つるぎのまい",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, dance: 1 },
		boosts: {
			atk: 2
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"こうごうせい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "こうごうせい",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onHit(pokemon) {
			let factor = 0.5
			switch (pokemon.effectiveWeather()) {
				case "にほんばれ":
				case "おわりのだいち":
					factor = 0.667
					break
				case "あまごい":
				case "はじまりのうみ":
				case "すなあらし":
				case "hail":
				case "snow":
					factor = 0.25
					break
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor))
			if (!success) {
				this.add("-fail", pokemon, "heal")
				return this.NOT_FAIL
			}
			return success
		},
		secondary: null,
		target: "self",
		type: "くさ",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"みずあめボム": {
		accuracy: 85,
		basePower: 60,
		category: "特殊",
		name: "みずあめボム",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bullet: 1 },
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add("-start", pokemon, "みずあめボム")
			},
			onResidualOrder: 14,
			onResidual() {
				this.boost({ spe: -1 })
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "みずあめボム", "[silent]")
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: "みずあめボム"
		},
		target: "normal",
		type: "くさ"
	},
	"たいあたり": {
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "たいあたり",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ほたるび": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ほたるび",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spa: 3
		},
		secondary: null,
		target: "self",
		type: "むし",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"スイープビンタ": {
		accuracy: 85,
		basePower: 25,
		category: "物理",
		name: "スイープビンタ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cute"
	},
	"しっぽをふる": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "しっぽをふる",
		pp: 30,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		boosts: {
			def: -1
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "ノーマル",
		zMove: { boost: { atk: 1 } },
		contestType: "Cute"
	},
	"おいかぜ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "おいかぜ",
		pp: 15,
		priority: 0,
		flags: { snatch: 1, wind: 1 },
		sideCondition: "おいかぜ",
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-activate",
						source,
						"ability: Persistent",
						"[move] Tailwind"
					)
					return 6
				}
				return 4
			},
			onSideStart(side, source) {
				if (source?.hasAbility("persistent")) {
					this.add("-sidestart", side, "move: Tailwind", "[persistent]")
				} else {
					this.add("-sidestart", side, "move: Tailwind")
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2)
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add("-sideend", side, "move: Tailwind")
			}
		},
		secondary: null,
		target: "allySide",
		type: "ひこう",
		zMove: { effect: "crit2" },
		contestType: "Cool"
	},
	"とっしん": {
		accuracy: 85,
		basePower: 90,
		category: "物理",
		name: "とっしん",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ブレイブチャージ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ブレイブチャージ",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		onHit(pokemon) {
			const success = !!this.boost({ spa: 1, spd: 1 })
			return pokemon.cureStatus() || success
		},
		secondary: null,
		target: "self",
		type: "エスパー"
	},
	"タールショット": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "タールショット",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "タールショット",
		condition: {
			onStart(pokemon) {
				if (pokemon.terastallized) return false
				this.add("-start", pokemon, "タールショット")
			},
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				if (move.type !== "Fire") return
				if (!target) return
				if (type !== target.getTypes()[0]) return
				return typeMod + 1
			}
		},
		boosts: {
			spe: -1
		},
		secondary: null,
		target: "normal",
		type: "いわ"
	},
	"ちょうはつ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "ちょうはつ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "ちょうはつ",
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration++
				}
				this.add("-start", target, "move: Taunt")
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add("-end", target, "move: Taunt")
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id)
					if (move.category === "Status" && move.id !== "mefirst") {
						pokemon.disableMove(moveSlot.id)
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (
					!move.isZ &&
					!move.isMax &&
					move.category === "Status" &&
					move.id !== "mefirst"
				) {
					this.add("cant", attacker, "move: Taunt", move)
					return false
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { boost: { atk: 1 } },
		contestType: "Clever"
	},
	"なみだめ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "なみだめ",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, mirror: 1 },
		boosts: {
			atk: -1,
			spa: -1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"おちゃかい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "おちゃかい",
		pp: 10,
		priority: 0,
		flags: { bypasssub: 1 },
		onHitField(target, source, move) {
			const targets = []
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent("Invulnerability", pokemon, source, move) === false) {
					this.add("-miss", source, pokemon)
				} else if (
					this.runEvent("TryHit", pokemon, source, move) &&
					pokemon.getItem().isBerry
				) {
					targets.push(pokemon)
				}
			}
			this.add("-fieldactivate", "move: Teatime")
			if (!targets.length) {
				this.add("-fail", source, "move: Teatime")
				this.attrLastMove("[still]")
				return this.NOT_FAIL
			}
			for (const pokemon of targets) {
				pokemon.eatItem(true)
			}
		},
		secondary: null,
		target: "all",
		type: "ノーマル"
	},
	"フラフラダンス": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "フラフラダンス",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, dance: 1 },
		volatileStatus: "ねんりき",
		secondary: null,
		target: "allAdjacent",
		type: "ノーマル",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"テレポート": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "テレポート",
		pp: 20,
		priority: -6,
		flags: {},
		onTry(source) {
			return !!this.canSwitch(source.side)
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "エスパー",
		zMove: { effect: "heal" },
		contestType: "Cool"
	},
	"テラバースト": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "テラバースト",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, mustpressure: 1 },
		onPrepareHit(target, source, move) {
			if (source.terastallized) {
				this.attrLastMove("[anim] Tera Blast " + source.teraType)
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType
			}
		},
		onModifyMove(move, pokemon) {
			if (
				pokemon.terastallized &&
				pokemon.getStat("atk", false, true) >
				pokemon.getStat("spa", false, true)
			) {
				move.category = "物理"
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル"
	},
	"だいちのはどう": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "だいちのはどう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, pulse: 1 },
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return
			switch (this.field.terrain) {
				case "エレキフィールド":
					move.type = "Electric"
					break
				case "グラスフィールド":
					move.type = "Grass"
					break
				case "ミストフィールド":
					move.type = "Fairy"
					break
				case "サイコフィールド":
					move.type = "サイコキネシス"
					break
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2
				this.debug("BP doubled in Terrain")
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 }
	},
	"どろぼう": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "どろぼう",
		pp: 25,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
			failmefirst: 1,
			noassist: 1,
			failcopycat: 1
		},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles["gem"]) {
				return
			}
			const yourItem = target.takeItem(source)
			if (!yourItem) {
				return
			}
			if (
				!this.singleEvent(
					"TakeItem",
					yourItem,
					target.itemState,
					source,
					target,
					move,
					yourItem
				) ||
				!source.setItem(yourItem)
			) {
				target.item = yourItem.id // bypass setItem so we don't break choicelock or anything
				return
			}
			this.add(
				"-enditem",
				target,
				yourItem,
				"[silent]",
				"[from] move: Thief",
				"[of] " + source
			)
			this.add(
				"-item",
				source,
				yourItem,
				"[from] move: Thief",
				"[of] " + target
			)
		},
		secondary: null,
		target: "normal",
		type: "あく",
		contestType: "Tough"
	},
	"あばれる": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "あばれる",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1 },
		self: {
			volatileStatus: "lockedmove"
		},
		onAfterMove(pokemon) {
			if (
				pokemon.volatiles["lockedmove"] &&
				pokemon.volatiles["lockedmove"].duration === 1
			) {
				pokemon.removeVolatile("lockedmove")
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"じごくづき": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "じごくづき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		condition: {
			duration: 2,
			onStart(target) {
				this.add("-start", target, "じごくづき", "[silent]")
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags["sound"]) {
						pokemon.disableMove(moveSlot.id)
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags["sound"]) {
					this.add("cant", pokemon, "move: Throat Chop")
					return false
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZ && !move.isMax && move.flags["sound"]) {
					this.add("cant", pokemon, "move: Throat Chop")
					return false
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add("-end", target, "じごくづき", "[silent]")
			}
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile("じごくづき")
			}
		},
		target: "normal",
		type: "あく",
		contestType: "Clever"
	},
	"かみなり": {
		accuracy: 70,
		basePower: 110,
		category: "特殊",
		name: "かみなり",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
				case "あまごい":
				case "はじまりのうみ":
					move.accuracy = true
					break
				case "にほんばれ":
				case "おわりのだいち":
					move.accuracy = 50
					break
			}
		},
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"10まんボルト": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "10まんボルト",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"サンダープリズン": {
		accuracy: 90,
		basePower: 80,
		category: "特殊",
		name: "サンダープリズン",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "でんき"
	},
	"かみなりのキバ": {
		accuracy: 95,
		basePower: 65,
		category: "物理",
		name: "かみなりのキバ",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondaries: [
			{
				chance: 10,
				status: "par"
			},
			{
				chance: 10,
				volatileStatus: "flinch"
			}
		],
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"らいめいげり": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "らいめいげり",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		target: "normal",
		type: "かくとう"
	},
	"かみなりパンチ": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "かみなりパンチ",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 10,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"でんきショック": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "でんきショック",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"でんじは": {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "でんじは",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "par",
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "でんき",
		zMove: { boost: { spd: 1 } },
		contestType: "Cool"
	},
	"くすぐる": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "くすぐる",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		boosts: {
			atk: -1,
			def: -1
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"おかたづけ": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "おかたづけ",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false
			for (const active of this.getAllActive()) {
				if (active.removeVolatile("みがわり")) success = true
			}
			const removeAll = [
				"まきびし",
				"どくびし",
				"ステルスロック",
				"ねばねばネット",
				"gmaxsteelsurge"
			]
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()]
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add(
							"-sideend",
							side,
							this.dex.conditions.get(sideCondition).name
						)
						success = true
					}
				}
			}
			if (success) this.add("-activate", pokemon, "move: Tidy Up")
			return (
				!!this.boost({ atk: 1, spe: 1 }, pokemon, pokemon, null, false, true) ||
				success
			)
		},
		secondary: null,
		target: "self",
		type: "ノーマル"
	},
	"フレアソング": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "フレアソング",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1
				}
			}
		},
		target: "normal",
		type: "ほのお",
		contestType: "Beautiful"
	},
	"いちゃもん": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "いちゃもん",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "いちゃもん",
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (pokemon.volatiles["dynamax"]) {
					delete pokemon.volatiles["いちゃもん"]
					return false
				}
				if (effect?.id === "gmaxmeltdown") this.effectState.duration = 3
				this.add("-start", pokemon, "いちゃもん")
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "いちゃもん")
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== "わるあがき")
					pokemon.disableMove(pokemon.lastMove.id)
			}
		},
		secondary: null,
		target: "normal",
		type: "あく",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"どくどく": {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "どくどく",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		// No Guard-like effect for Poison-type users implemented in Scripts#tryMoveHit
		status: "tox",
		secondary: null,
		target: "normal",
		type: "どく",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくびし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "どくびし",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, nonsky: 1, mustpressure: 1 },
		sideCondition: "どくびし",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add("-sidestart", side, "move: Toxic Spikes")
				this.effectState.layers = 1
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false
				this.add("-sidestart", side, "move: Toxic Spikes")
				this.effectState.layers++
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return
				if (pokemon.hasType("Poison")) {
					this.add(
						"-sideend",
						pokemon.side,
						"move: Toxic Spikes",
						"[of] " + pokemon
					)
					pokemon.side.removeSideCondition("どくびし")
				} else if (
					pokemon.hasType("Steel") ||
					pokemon.hasItem("あつぞこブーツ")
				) {
					return
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus("tox", pokemon.side.foe.active[0])
				} else {
					pokemon.trySetStatus("psn", pokemon.side.foe.active[0])
				}
			}
		},
		secondary: null,
		target: "foeSide",
		type: "どく",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくのいと": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "どくのいと",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "psn",
		boosts: {
			spe: -1
		},
		secondary: null,
		target: "normal",
		type: "どく",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"くさわけ": {
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "くさわけ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1
				}
			}
		},
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"へんしん": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "へんしん",
		pp: 10,
		priority: 0,
		flags: {
			allyanim: 1,
			failencore: 1,
			noassist: 1,
			failcopycat: 1,
			failinstruct: 1,
			failmimic: 1
		},
		onHit(target, pokemon) {
			if (!pokemon.transformInto(target)) {
				return false
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { effect: "heal" },
		contestType: "Clever"
	},
	"トライアタック": {
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "トライアタック",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3)
				if (result === 0) {
					target.trySetStatus("brn", source)
				} else if (result === 1) {
					target.trySetStatus("par", source)
				} else {
					target.trySetStatus("frz", source)
				}
			}
		},
		target: "normal",
		type: "ノーマル",
		contestType: "Beautiful"
	},
	"トリック": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "トリック",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
		onTryImmunity(target) {
			return !target.hasAbility("ねんちゃく")
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source)
			const myItem = source.takeItem()
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id
				if (myItem) source.item = myItem.id
				return false
			}
			if (
				(myItem &&
					!this.singleEvent(
						"TakeItem",
						myItem,
						source.itemState,
						target,
						source,
						move,
						myItem
					)) ||
				(yourItem &&
					!this.singleEvent(
						"TakeItem",
						yourItem,
						target.itemState,
						source,
						target,
						move,
						yourItem
					))
			) {
				if (yourItem) target.item = yourItem.id
				if (myItem) source.item = myItem.id
				return false
			}
			this.add("-activate", source, "move: Trick", "[of] " + target)
			if (myItem) {
				target.setItem(myItem)
				this.add("-item", target, myItem, "[from] move: Trick")
			} else {
				this.add("-enditem", target, yourItem, "[silent]", "[from] move: Trick")
			}
			if (yourItem) {
				source.setItem(yourItem)
				this.add("-item", source, yourItem, "[from] move: Trick")
			} else {
				this.add("-enditem", source, myItem, "[silent]", "[from] move: Trick")
			}
		},
		secondary: null,
		target: "normal",
		type: "エスパー",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"トリックルーム": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "トリックルーム",
		pp: 5,
		priority: -7,
		flags: { mirror: 1 },
		pseudoWeather: "トリックルーム",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-activate",
						source,
						"ability: Persistent",
						"[move] Trick Room"
					)
					return 7
				}
				return 5
			},
			onFieldStart(target, source) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-fieldstart",
						"move: Trick Room",
						"[of] " + source,
						"[persistent]"
					)
				} else {
					this.add("-fieldstart", "move: Trick Room", "[of] " + source)
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather("トリックルーム")
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add("-fieldend", "move: Trick Room")
			}
		},
		secondary: null,
		target: "all",
		type: "エスパー",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Clever"
	},
	"3ぼんのや": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "3ぼんのや",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1
				}
			},
			{
				chance: 30,
				volatileStatus: "flinch"
			}
		],
		target: "normal",
		type: "かくとう"
	},
	"トリプルアクセル": {
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit
		},
		category: "物理",
		name: "トリプルアクセル",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "こおり",
		zMove: { basePower: 120 },
		maxMove: { basePower: 140 }
	},
	"トリプルダイブ": {
		accuracy: 95,
		basePower: 30,
		category: "物理",
		name: "トリプルダイブ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "みず"
	},
	"トロピカルキック": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "トロピカルキック",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1
			}
		},
		target: "normal",
		type: "くさ",
		contestType: "Cute"
	},
	"ツインビーム": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "ツインビーム",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "エスパー",
		contestType: "Cool"
	},
	"たつまき": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "たつまき",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "flinch"
		},
		target: "allAdjacentFoes",
		type: "ドラゴン",
		contestType: "Cool"
	},
	"とんぼがえり": {
		accuracy: 100,
		basePower: 70,
		category: "物理",
		name: "とんぼがえり",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cute"
	},
	"さわぐ": {
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "さわぐ",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			sound: 1,
			bypasssub: 1,
			nosleeptalk: 1,
			failinstruct: 1
		},
		self: {
			volatileStatus: "さわぐ"
		},
		onTryHit(target) {
			const activeTeam = target.side.activeTeam()
			const foeActiveTeam = target.side.foe.activeTeam()
			for (const [i, allyActive] of activeTeam.entries()) {
				if (allyActive && allyActive.status === "slp") allyActive.cureStatus()
				const foeActive = foeActiveTeam[i]
				if (foeActive && foeActive.status === "slp") foeActive.cureStatus()
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add("-start", target, "さわぐ")
			},
			onResidual(target) {
				if (target.volatiles["じごくづき"]) {
					target.removeVolatile("さわぐ")
					return
				}
				if (target.lastMove && target.lastMove.id === "わるあがき") {
					// don't lock
					delete target.volatiles["さわぐ"]
				}
				this.add("-start", target, "さわぐ", "[upkeep]")
			},
			onResidualOrder: 28,
			onResidualSubOrder: 1,
			onEnd(target) {
				this.add("-end", target, "さわぐ")
			},
			onLockMove: "さわぐ",
			onAnySetStatus(status, pokemon) {
				if (status.id === "slp") {
					if (pokemon === this.effectState.target) {
						this.add("-fail", pokemon, "slp", "[from] Uproar", "[msg]")
					} else {
						this.add("-fail", pokemon, "slp", "[from] Uproar")
					}
					return null
				}
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "ノーマル",
		contestType: "Cute"
	},
	"しんくうは": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "しんくうは",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "かくとう",
		contestType: "Cool"
	},
	"Vジェネレート": {
		accuracy: 95,
		basePower: 180,
		category: "物理",
		name: "Vジェネレート",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spe: -1,
				def: -1,
				spd: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "ほのお",
		zMove: { basePower: 220 },
		contestType: "Cool"
	},
	"ベノムショック": {
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "ベノムショック",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon, target) {
			if (target.status === "psn" || target.status === "tox") {
				return this.chainModify(2)
			}
		},
		secondary: null,
		target: "normal",
		type: "どく",
		contestType: "Beautiful"
	},
	"しょうりのまい": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しょうりのまい",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, dance: 1 },
		boosts: {
			atk: 1,
			def: 1,
			spe: 1
		},
		secondary: null,
		target: "self",
		type: "かくとう"
	},
	"つるのムチ": {
		accuracy: 100,
		basePower: 45,
		category: "物理",
		name: "つるのムチ",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Cool"
	},
	"はさむ": {
		accuracy: 100,
		basePower: 55,
		category: "物理",
		name: "はさむ",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"ボルトチェンジ": {
		accuracy: 100,
		basePower: 70,
		category: "特殊",
		name: "ボルトチェンジ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"ボルテッカー": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ボルテッカー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		secondary: {
			chance: 10,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"たきのぼり": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "たきのぼり",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "みず",
		contestType: "Tough"
	},
	"みずでっぽう": {
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "みずでっぽう",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Cute"
	},
	"みずのちかい": {
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (["ほのおのちかい", "くさのちかい"].includes(move.sourceEffect)) {
				this.add("-combine")
				return 150
			}
			return 80
		},
		category: "特殊",
		name: "みずのちかい",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1 },
		onPrepareHit(target, source, move) {
			for (const action of this.queue) {
				if (action.choice !== "move") continue
				const otherMove = action.move
				const otherMoveUser = action.pokemon
				if (
					!otherMove ||
					!action.pokemon ||
					!otherMoveUser.isActive ||
					otherMoveUser.fainted ||
					action.maxMove ||
					action.zmove
				) {
					continue
				}
				if (
					otherMoveUser.isAlly(source) &&
					["ほのおのちかい", "くさのちかい"].includes(otherMove.id)
				) {
					this.queue.prioritizeAction(action, move)
					this.add("-waiting", source, otherMoveUser)
					return null
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === "くさのちかい") {
				move.type = "Grass"
				move.forceSTAB = true
				move.sideCondition = "くさのちかい"
			}
			if (move.sourceEffect === "ほのおのちかい") {
				move.type = "Water"
				move.forceSTAB = true
				move.self = { sideCondition: "みずのちかい" }
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add("-sidestart", targetSide, "みずのちかい")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 7,
			onSideEnd(targetSide) {
				this.add("-sideend", targetSide, "みずのちかい")
			},
			onModifyMove(move, pokemon) {
				if (move.secondaries && move.id !== "secretpower") {
					this.debug("doubling secondary chance")
					for (const secondary of move.secondaries) {
						if (
							pokemon.hasAbility("てんのめぐみ") &&
							secondary.volatileStatus === "flinch"
						)
							continue
						if (secondary.chance) secondary.chance *= 2
					}
					if (move.self?.chance) move.self.chance *= 2
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"みずのはどう": {
		accuracy: 100,
		basePower: 60,
		category: "特殊",
		name: "みずのはどう",
		pp: 20,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "ねんりき"
		},
		target: "any",
		type: "みず",
		contestType: "Beautiful"
	},
	"みずしゅりけん": {
		accuracy: 100,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			if (
				pokemon.species.name === "Greninja-Ash" &&
				pokemon.hasAbility("きずなへんげ") &&
				!pokemon.transformed
			) {
				return move.basePower + 5
			}
			return move.basePower
		},
		category: "特殊",
		name: "みずしゅりけん",
		pp: 20,
		priority: 1,
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Cool"
	},
	"しおふき": {
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = (move.basePower * pokemon.hp) / pokemon.maxhp
			this.debug("BP: " + bp)
			return bp
		},
		category: "特殊",
		name: "しおふき",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "みず",
		contestType: "Beautiful"
	},
	"ウェーブタックル": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ウェーブタックル",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "みず"
	},
	"ウェザーボール": {
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "ウェザーボール",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
				case "にほんばれ":
				case "おわりのだいち":
					move.type = "Fire"
					break
				case "あまごい":
				case "はじまりのうみ":
					move.type = "Water"
					break
				case "すなあらし":
					move.type = "Rock"
					break
				case "hail":
				case "snow":
					move.type = "Ice"
					break
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
				case "にほんばれ":
				case "おわりのだいち":
					move.basePower *= 2
					break
				case "あまごい":
				case "はじまりのうみ":
					move.basePower *= 2
					break
				case "すなあらし":
					move.basePower *= 2
					break
				case "hail":
				case "snow":
					move.basePower *= 2
					break
			}
			this.debug("BP: " + move.basePower)
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful"
	},
	"うずしお": {
		accuracy: 85,
		basePower: 35,
		category: "特殊",
		name: "うずしお",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "みず",
		contestType: "Beautiful"
	},
	"ふきとばし": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ふきとばし",
		pp: 20,
		priority: -6,
		flags: {
			reflectable: 1,
			mirror: 1,
			bypasssub: 1,
			allyanim: 1,
			wind: 1,
			noassist: 1,
			failcopycat: 1
		},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"あんこくきょうだ": {
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "あんこくきょうだ",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, punch: 1, mirror: 1 },
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "あく"
	},
	"ワイドガード": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ワイドガード",
		pp: 10,
		priority: 3,
		flags: { snatch: 1 },
		sideCondition: "ワイドガード",
		onTry() {
			return !!this.queue.willAct()
		},
		onHitSide(side, source) {
			source.addVolatile("あとだし")
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add("-singleturn", source, "ワイドガード")
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Wide Guard blocks all spread moves
				if (
					move?.target !== "allAdjacent" &&
					move.target !== "allAdjacentFoes"
				) {
					return
				}
				if (move.isZ || move.isMax) {
					if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id)) return
					target.getMoveHitData(move).zBrokeProtect = true
					return
				}
				this.add("-activate", target, "move: Wide Guard")
				const lockedmove = source.getVolatile("lockedmove")
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles["lockedmove"].duration === 2) {
						delete source.volatiles["lockedmove"]
					}
				}
				return this.NOT_FAIL
			}
		},
		secondary: null,
		target: "allySide",
		type: "いわ",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"かみなりあらし": {
		accuracy: 80,
		basePower: 100,
		category: "特殊",
		name: "かみなりあらし",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		onModifyMove(move, pokemon, target) {
			if (
				target &&
				["あまごい", "はじまりのうみ"].includes(target.effectiveWeather())
			) {
				move.accuracy = true
			}
		},
		secondary: {
			chance: 20,
			status: "par"
		},
		target: "allAdjacentFoes",
		type: "でんき"
	},
	"ワイルドボルト": {
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "ワイルドボルト",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "でんき",
		contestType: "Tough"
	},
	"おにび": {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "おにび",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		status: "brn",
		secondary: null,
		target: "normal",
		type: "ほのお",
		zMove: { boost: { atk: 1 } },
		contestType: "Beautiful"
	},
	"つばさでうつ": {
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "つばさでうつ",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "ひこう",
		contestType: "Cool"
	},
	"ねがいごと": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねがいごと",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		slotCondition: "ねがいごと",
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectState.hp = source.maxhp / 2
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target)
					if (damage) {
						this.add(
							"-heal",
							target,
							target.getHealth,
							"[from] move: Wish",
							"[wisher] " + this.effectState.source.name
						)
					}
				}
			}
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute"
	},
	"からにこもる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "からにこもる",
		pp: 40,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1
		},
		secondary: null,
		target: "self",
		type: "みず",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"ワンダールーム": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ワンダールーム",
		pp: 10,
		priority: 0,
		flags: { mirror: 1 },
		pseudoWeather: "ワンダールーム",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-activate",
						source,
						"ability: Persistent",
						"[move] Wonder Room"
					)
					return 7
				}
				return 5
			},
			onModifyMove(move, source, target) {
				// This code is for moves that use defensive stats as the attacking stat; see below for most of the implementation
				if (!move.overrideOffensiveStat) return
				const statAndBoosts = move.overrideOffensiveStat
				if (!["def", "spd"].includes(statAndBoosts)) return
				move.overrideOffensiveStat = statAndBoosts === "def" ? "spd" : "def"
				this.hint(
					`${move.name} uses ${statAndBoosts === "def" ? "" : "Sp. "
					}Def boosts when Wonder Room is active.`
				)
			},
			onFieldStart(field, source) {
				if (source?.hasAbility("persistent")) {
					this.add(
						"-fieldstart",
						"move: Wonder Room",
						"[of] " + source,
						"[persistent]"
					)
				} else {
					this.add("-fieldstart", "move: Wonder Room", "[of] " + source)
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather("ワンダールーム")
			},
			// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add("-fieldend", "move: Wonder Room")
			}
		},
		secondary: null,
		target: "all",
		type: "エスパー",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"ウッドハンマー": {
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ウッドハンマー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "くさ",
		contestType: "Tough"
	},
	"ふるいたてる": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ふるいたてる",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: 1,
			spa: 1
		},
		secondary: null,
		target: "self",
		type: "ノーマル",
		zMove: { boost: { atk: 1 } },
		contestType: "Tough"
	},
	"なやみのタネ": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "なやみのタネ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onTryImmunity(target) {
			// Truant and Insomnia have 特殊 treatment; they fail before
			// checking accuracy and will double Stomping Tantrum's BP
			if (target.ability === "なまけ" || target.ability === "ふみん") {
				return false
			}
		},
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility("ふみん")
			if (oldAbility) {
				this.add("-ability", pokemon, "ふみん", "[from] move: Worry Seed")
				if (pokemon.status === "slp") {
					pokemon.cureStatus()
				}
				return
			}
			return oldAbility
		},
		secondary: null,
		target: "normal",
		type: "くさ",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"まきつく": {
		accuracy: 90,
		basePower: 15,
		category: "物理",
		name: "まきつく",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		volatileStatus: "partiallytrapped",
		secondary: null,
		target: "normal",
		type: "ノーマル",
		contestType: "Tough"
	},
	"シザークロス": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "シザークロス",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		target: "normal",
		type: "むし",
		contestType: "Cool"
	},
	"あくび": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "あくび",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "あくび",
		onTryHit(target) {
			if (target.status || !target.runStatusImmunity("slp")) {
				return false
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onStart(target, source) {
				this.add("-start", target, "move: Yawn", "[of] " + source)
			},
			onResidualOrder: 23,
			onEnd(target) {
				this.add("-end", target, "move: Yawn", "[silent]")
				target.trySetStatus("slp", this.effectState.source)
			}
		},
		secondary: null,
		target: "normal",
		type: "ノーマル",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"でんじほう": {
		accuracy: 50,
		basePower: 120,
		category: "特殊",
		name: "でんじほう",
		pp: 5,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			status: "par"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
	"しねんのずつき": {
		accuracy: 90,
		basePower: 80,
		category: "物理",
		name: "しねんのずつき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "エスパー",
		contestType: "Clever"
	},
	"びりびりちくちく": {
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "びりびりちくちく",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "でんき",
		contestType: "Cool"
	},
}