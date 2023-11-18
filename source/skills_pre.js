// List of flags and their descriptions can be found in sim/dex-moves.ts

const Moves = {
	"すいとる": {
		num: 71,
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
		type: "Grass",
		contestType: "Clever"
	},
	"アクセルロック": {
		num: 709,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "アクセルロック",
		pp: 20,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool"
	},
	"ようかいえき": {
		num: 51,
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
		type: "Poison",
		contestType: "Clever"
	},
	"とける": {
		num: 151,
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
		type: "Poison",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"アシッドボム": {
		num: 491,
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
		type: "Poison",
		contestType: "Beautiful"
	},
	"アクロバット": {
		num: 512,
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
		type: "Flying",
		contestType: "Cool"
	},
	"つぼをつく": {
		num: 367,
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
		type: "Normal",
		zMove: { effect: "crit2" },
		contestType: "Tough"
	},
	"つばめがえし": {
		num: 332,
		accuracy: true,
		basePower: 60,
		category: "物理",
		name: "つばめがえし",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1, slicing: 1 },
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool"
	},
	"おさきにどうぞ": {
		num: 495,
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
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"こうそくいどう": {
		num: 97,
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
		type: "Psychic",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cool"
	},
	"エアカッター": {
		num: 314,
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
		type: "Flying",
		contestType: "Cool"
	},
	"エアスラッシュ": {
		num: 403,
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
		type: "Flying",
		contestType: "Cool"
	},
	"サイドチェンジ": {
		num: 502,
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
			pokemon.addVolatile("stall")
			const newPosition =
				pokemon.position === 0 ? pokemon.side.active.length - 1 : 0
			if (!pokemon.side.active[newPosition]) return false
			if (pokemon.side.active[newPosition].fainted) return false
			this.swapPosition(pokemon, newPosition, "[from] move: Ally Switch")
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"ドわすれ": {
		num: 133,
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
		type: "Psychic",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"げんしのちから": {
		num: 246,
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
		type: "Rock",
		contestType: "Tough"
	},
	"りんごさん": {
		num: 787,
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
		type: "Grass"
	},
	"アクアカッター": {
		num: 895,
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
		type: "Water",
		contestType: "Cool"
	},
	"アクアジェット": {
		num: 453,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "アクアジェット",
		pp: 20,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool"
	},
	"アクアリング": {
		num: 392,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "アクアリング",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "aquaring",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "Aqua Ring")
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16)
			}
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful"
	},
	"アクアステップ": {
		num: 872,
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
		type: "Water",
		contestType: "Cool"
	},
	"アクアテール": {
		num: 401,
		accuracy: 90,
		basePower: 90,
		category: "物理",
		name: "アクアテール",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful"
	},
	"アーマーキャノン": {
		num: 890,
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
		type: "Fire"
	},
	"つっぱり": {
		num: 292,
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
		type: "Fighting",
		contestType: "Tough"
	},
	"アロマミスト": {
		num: 597,
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
		type: "Fairy",
		zMove: { boost: { spd: 2 } },
		contestType: "Beautiful"
	},
	"ダメおし": {
		num: 372,
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
		type: "Dark",
		contestType: "Clever"
	},
	"おどろかす": {
		num: 310,
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
		type: "Ghost",
		contestType: "Cute"
	},
	"アストラルビット": {
		num: 825,
		accuracy: 100,
		basePower: 120,
		category: "特殊",
		name: "アストラルビット",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost"
	},
	"こうげきしれい": {
		num: 454,
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
		type: "Bug",
		contestType: "Clever"
	},
	"メロメロ": {
		num: 213,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "メロメロ",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "attract",
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
				if (!this.runEvent("Attract", pokemon, source)) {
					this.debug("Attract event failed")
					return false
				}

				if (effect.name === "Cute Charm") {
					this.add(
						"-start",
						pokemon,
						"Attract",
						"[from] ability: Cute Charm",
						"[of] " + source
					)
				} else if (effect.name === "Destiny Knot") {
					this.add(
						"-start",
						pokemon,
						"Attract",
						"[from] item: Destiny Knot",
						"[of] " + source
					)
				} else {
					this.add("-start", pokemon, "Attract")
				}
			},
			onUpdate(pokemon) {
				if (
					this.effectState.source &&
					!this.effectState.source.isActive &&
					pokemon.volatiles["attract"]
				) {
					this.debug("Removing Attract volatile on " + pokemon)
					pokemon.removeVolatile("attract")
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
					this.add("cant", pokemon, "Attract")
					return false
				}
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "Attract", "[silent]")
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"はどうだん": {
		num: 396,
		accuracy: true,
		basePower: 80,
		category: "特殊",
		name: "はどうだん",
		pp: 20,
		priority: 0,
		flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "Fighting",
		contestType: "Beautiful"
	},
	"オーラぐるま": {
		num: 783,
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
		type: "Electric"
	},
	"オーロラビーム": {
		num: 62,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"オーロラベール": {
		num: 694,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "オーロラベール",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "auroraveil",
		onTry() {
			return this.field.isWeather(["hail", "snow"])
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem("lightclay")) {
					return 8
				}
				return 5
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (
						(target.side.getSideCondition("reflect") &&
							this.getCategory(move) === "物理") ||
						(target.side.getSideCondition("lightscreen") &&
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
		type: "Ice",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"ゆきなだれ": {
		num: 419,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"かかとおとし": {
		num: 853,
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
				this.dex.conditions.get("High Jump Kick")
			)
		},
		secondary: {
			chance: 30,
			volatileStatus: "confusion"
		},
		target: "normal",
		type: "Fighting"
	},
	"つぶらなひとみ": {
		num: 608,
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
		type: "Fairy",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"トーチカ": {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "トーチカ",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "banefulbunker",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("stall")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "move: Protect")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["protect"]) {
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
		type: "Poison",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"どくばりセンボン": {
		num: 839,
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
		type: "Poison"
	},
	"バトンタッチ": {
		num: 226,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ふくろだたき": {
		num: 251,
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
		type: "Dark",
		contestType: "Clever"
	},
	"きょじゅうだん": {
		num: 782,
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "きょじゅうだん",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, failcopycat: 1, failmimic: 1 },
		secondary: null,
		target: "normal",
		type: "Steel"
	},
	"きょじゅうざん": {
		num: 781,
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
		type: "Steel"
	},
	"ゲップ": {
		num: 562,
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
			if (!pokemon.ateBerry) pokemon.disableMove("belch")
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough"
	},
	"はらだいこ": {
		num: 187,
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
		type: "Normal",
		zMove: { effect: "heal" },
		contestType: "Cute"
	},
	"しめつける": {
		num: 20,
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
		type: "Normal",
		contestType: "Tough"
	},
	"かみつく": {
		num: 44,
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
		type: "Dark",
		contestType: "Tough"
	},
	"むねんのつるぎ": {
		num: 891,
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
		type: "Fire"
	},
	"うらみつらみ": {
		num: 841,
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
		type: "Ghost"
	},
	"ブラストバーン": {
		num: 307,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"ブレイズキック": {
		num: 299,
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
		type: "Fire",
		contestType: "Cool"
	},
	"こがらしあらし": {
		num: 846,
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
				["raindance", "primordialsea"].includes(target.effectiveWeather())
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
		type: "Flying"
	},
	"ふぶき": {
		num: 59,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"とおせんぼう": {
		num: 335,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"ブラッドムーン": {
		num: 901,
		accuracy: 100,
		basePower: 140,
		category: "特殊",
		name: "ブラッドムーン",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		secondary: null,
		target: "normal",
		type: "Normal"
	},
	"ボディプレス": {
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
		target: "normal",
		type: "Fighting"
	},
	"のしかかり": {
		num: 34,
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
		type: "Normal",
		contestType: "Tough"
	},
	"ボーンラッシュ": {
		num: 198,
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
		type: "Ground",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"ばくおんぱ": {
		num: 586,
		accuracy: 100,
		basePower: 140,
		category: "特殊",
		name: "ばくおんぱ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		contestType: "Tough"
	},
	"とびはねる": {
		num: 340,
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
						"gust",
						"twister",
						"skyuppercut",
						"thunder",
						"hurricane",
						"smackdown",
						"thousandarrows"
					].includes(move.id)
				) {
					return
				}
				return false
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === "gust" || move.id === "twister") {
					return this.chainModify(2)
				}
			}
		},
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "any",
		type: "Flying",
		contestType: "Cute"
	},
	"えだづき": {
		num: 785,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "えだづき",
		pp: 40,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Grass"
	},
	"ブレイブバード": {
		num: 413,
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
		type: "Flying",
		contestType: "Cool"
	},
	"ワイドブレイカー": {
		num: 784,
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
		type: "Dragon"
	},
	"かわらわり": {
		num: 280,
		accuracy: 100,
		basePower: 75,
		category: "物理",
		name: "かわらわり",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition("reflect")
			pokemon.side.removeSideCondition("lightscreen")
			pokemon.side.removeSideCondition("auroraveil")
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"しおみず": {
		num: 362,
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
		type: "Water",
		contestType: "Tough"
	},
	"ぶんまわす": {
		num: 693,
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ぶんまわす",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "Dark",
		contestType: "Tough"
	},
	"バブルこうせん": {
		num: 61,
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
		type: "Water",
		contestType: "Beautiful"
	},
	"むしくい": {
		num: 450,
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
					if (item.id === "leppaberry") target.staleness = "external"
				}
				if (item.onEat) source.ateBerry = true
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cute"
	},
	"むしのさざめき": {
		num: 405,
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
		type: "Bug",
		contestType: "Beautiful"
	},
	"ビルドアップ": {
		num: 339,
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
		type: "Fighting",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool"
	},
	"じならし": {
		num: 523,
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
		type: "Ground",
		contestType: "Tough"
	},
	"バレットパンチ": {
		num: 418,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "バレットパンチ",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough"
	},
	"タネマシンガン": {
		num: 331,
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
		type: "Grass",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"しっとのほのお": {
		num: 807,
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
		type: "Fire",
		contestType: "Tough"
	},
	"もえつきる": {
		num: 682,
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
		type: "Fire",
		contestType: "Clever"
	},
	"めいそう": {
		num: 347,
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
		type: "Psychic",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"ひけん・ちえなみ": {
		num: 845,
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
					side.addSideCondition("spikes")
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition("spikes")
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Dark"
	},
	"おいわい": {
		num: 606,
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
		type: "Normal",
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
		contestType: "Cute"
	},
	"じゅうでん": {
		num: 268,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じゅうでん",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "charge",
		condition: {
			onStart(pokemon, source, effect) {
				if (
					effect &&
					["Electromorphosis", "Wind Power"].includes(effect.name)
				) {
					this.add(
						"-start",
						pokemon,
						"Charge",
						this.activeMove.name,
						"[from] ability: " + effect.name
					)
				} else {
					this.add("-start", pokemon, "Charge")
				}
			},
			onRestart(pokemon, source, effect) {
				if (
					effect &&
					["Electromorphosis", "Wind Power"].includes(effect.name)
				) {
					this.add(
						"-start",
						pokemon,
						"Charge",
						this.activeMove.name,
						"[from] ability: " + effect.name
					)
				} else {
					this.add("-start", pokemon, "Charge")
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
				if (move.type === "Electric" && move.id !== "charge") {
					pokemon.removeVolatile("charge")
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === "Electric" && move.id !== "charge") {
					pokemon.removeVolatile("charge")
				}
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "Charge", "[silent]")
			}
		},
		boosts: {
			spd: 1
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"チャージビーム": {
		num: 451,
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
		type: "Electric",
		contestType: "Beautiful"
	},
	"あまえる": {
		num: 204,
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
		type: "Fairy",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"ひやみず": {
		num: 886,
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
		type: "Water",
		contestType: "Beautiful"
	},
	"さむいギャグ": {
		num: 881,
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
		type: "Ice"
	},
	"クロロブラスト": {
		num: 835,
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
		type: "Grass"
	},
	"ともえなげ": {
		num: 509,
		accuracy: 90,
		basePower: 60,
		category: "物理",
		name: "ともえなげ",
		pp: 10,
		priority: -6,
		flags: { contact: 1, protect: 1, mirror: 1, noassist: 1, failcopycat: 1 },
		forceSwitch: true,
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"スケイルノイズ": {
		num: 691,
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
		type: "Dragon",
		contestType: "Tough"
	},
	"ソウルビート": {
		num: 775,
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
		type: "Dragon"
	},
	"クリアスモッグ": {
		num: 499,
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
		type: "Poison",
		contestType: "Beautiful"
	},
	"インファイト": {
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
				spd: -1
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough"
	},
	"コーチング": {
		num: 811,
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
		type: "Fighting"
	},
	"とぐろをまく": {
		num: 489,
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
		type: "Poison",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"アクセルブレイク": {
		num: 878,
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
		type: "Fighting",
		contestType: "Tough"
	},
	"ほうふく": {
		num: 894,
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
		type: "Dark",
		contestType: "Cool"
	},
	"ないしょばなし": {
		num: 590,
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
		type: "Normal",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute"
	},
	"あやしいひかり": {
		num: 109,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "あやしいひかり",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "confusion",
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"ねんりき": {
		num: 93,
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "ねんりき",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: "confusion"
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever"
	},
	"まねっこ": {
		num: 383,
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
		type: "Normal",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"ふしょくガス": {
		num: 810,
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
		type: "Poison"
	},
	"コスモパワー": {
		num: 322,
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
		type: "Psychic",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"コットンガード": {
		num: 538,
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
		type: "Grass",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"わたほうし": {
		num: 178,
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
		type: "Grass",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"カウンター": {
		num: 68,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles["counter"]) return 0
			return pokemon.volatiles["counter"].damage || 1
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
			pokemon.addVolatile("counter")
		},
		onTry(source) {
			if (!source.volatiles["counter"]) return false
			if (source.volatiles["counter"].slot === null) return false
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
				if (move.id !== "counter") return
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
		type: "Fighting",
		maxMove: { basePower: 75 },
		contestType: "Tough"
	},
	"コートチェンジ": {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "コートチェンジ",
		pp: 10,
		priority: 0,
		flags: { mirror: 1 },
		onHitField(target, source) {
			const sideConditions = [
				"mist",
				"lightscreen",
				"reflect",
				"spikes",
				"safeguard",
				"tailwind",
				"toxicspikes",
				"stealthrock",
				"waterpledge",
				"firepledge",
				"grasspledge",
				"stickyweb",
				"auroraveil",
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
		type: "Normal"
	},
	"ほしがる": {
		num: 343,
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
		type: "Normal",
		contestType: "Cute"
	},
	"クラブハンマー": {
		num: 152,
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
		type: "Water",
		contestType: "Tough"
	},
	"クロスチョップ": {
		num: 238,
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
		type: "Fighting",
		contestType: "Cool"
	},
	"クロスポイズン": {
		num: 440,
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
		type: "Poison",
		contestType: "Cool"
	},
	"かみくだく": {
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
				def: -1
			}
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough"
	},
	"ブレイククロー": {
		num: 306,
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
		type: "Normal",
		contestType: "Cool"
	},
	"のろい": {
		num: 174,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "のろい",
		pp: 10,
		priority: 0,
		flags: { bypasssub: 1 },
		volatileStatus: "curse",
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
			} else if (move.volatileStatus && target.volatiles["curse"]) {
				return false
			}
		},
		onHit(target, source) {
			this.directDamage(source.maxhp / 2, source, source)
		},
		condition: {
			onStart(pokemon, source) {
				this.add("-start", pokemon, "Curse", "[of] " + source)
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4)
			}
		},
		secondary: null,
		target: "normal",
		nonGhostTarget: "self",
		type: "Ghost",
		zMove: { effect: "curse" },
		contestType: "Tough"
	},
	"いあいぎり": {
		num: 15,
		accuracy: 95,
		basePower: 50,
		category: "物理",
		name: "いあいぎり",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool"
	},
	"DDラリアット": {
		num: 663,
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
		type: "Dark",
		contestType: "Cool"
	},
	"あくのはどう": {
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
			volatileStatus: "flinch"
		},
		target: "any",
		type: "Dark",
		contestType: "Cool"
	},
	"ダークホール": {
		num: 464,
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
		type: "Dark",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"マジカルシャイン": {
		num: 605,
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "マジカルシャイン",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful"
	},
	"ぼうぎょしれい": {
		num: 455,
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
		type: "Bug",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"まるくなる": {
		num: 111,
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
		volatileStatus: "defensecurl",
		condition: {
			noCopy: true,
			onRestart: () => null
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"きりばらい": {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "きりばらい",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		onHit(target, source, move) {
			let success = false
			if (!target.volatiles["substitute"] || move.infiltrates)
				success = !!this.boost({ evasion: -1 })
			const removeTarget = [
				"reflect",
				"lightscreen",
				"auroraveil",
				"safeguard",
				"mist",
				"spikes",
				"toxicspikes",
				"stealthrock",
				"stickyweb",
				"gmaxsteelsurge"
			]
			const removeAll = [
				"spikes",
				"toxicspikes",
				"stealthrock",
				"stickyweb",
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
		type: "Flying",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cool"
	},
	"みちづれ": {
		num: 194,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みちづれ",
		pp: 5,
		priority: 0,
		flags: { bypasssub: 1, noassist: 1, failcopycat: 1 },
		volatileStatus: "destinybond",
		onPrepareHit(pokemon) {
			return !pokemon.removeVolatile("destinybond")
		},
		condition: {
			onStart(pokemon) {
				this.add("-singlemove", pokemon, "Destiny Bond")
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
				if (move.id === "destinybond") return
				this.debug("removing Destiny Bond before attack")
				pokemon.removeVolatile("destinybond")
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile("destinybond")
			}
		},
		secondary: null,
		target: "self",
		type: "Ghost",
		zMove: { effect: "redirect" },
		contestType: "Clever"
	},
	"みきり": {
		num: 197,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みきり",
		pp: 5,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "protect",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("stall")
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: { boost: { evasion: 1 } },
		contestType: "Cool"
	},
	"ダイヤストーム": {
		num: 591,
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
		type: "Rock",
		contestType: "Beautiful"
	},
	"あなをほる": {
		num: 91,
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
				if (type === "sandstorm" || type === "hail") return false
			},
			onInvulnerability(target, source, move) {
				if (["earthquake", "magnitude"].includes(move.id)) {
					return
				}
				return false
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === "earthquake" || move.id === "magnitude") {
					return this.chainModify(2)
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough"
	},
	"かなしばり": {
		num: 50,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "かなしばり",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "disable",
		onTryHit(target) {
			if (
				!target.lastMove ||
				target.lastMove.isZ ||
				target.lastMove.isMax ||
				target.lastMove.id === "struggle"
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
						"Disable",
						pokemon.lastMove.name,
						"[from] ability: Cursed Body",
						"[of] " + source
					)
				} else {
					this.add("-start", pokemon, "Disable", pokemon.lastMove.name)
				}
				this.effectState.move = pokemon.lastMove.id
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add("-end", pokemon, "Disable")
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && move.id === this.effectState.move) {
					this.add("cant", attacker, "Disable", move)
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"チャームボイス": {
		num: 574,
		accuracy: true,
		basePower: 40,
		category: "特殊",
		name: "チャームボイス",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Cute"
	},
	"ほうでん": {
		num: 435,
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
		type: "Electric",
		contestType: "Beautiful"
	},
	"フェイタルクロー": {
		num: 827,
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
		type: "Poison"
	},
	"ダイビング": {
		num: 291,
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
				attacker.hasAbility("gulpmissile") &&
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
				if (type === "sandstorm" || type === "hail") return false
			},
			onInvulnerability(target, source, move) {
				if (["surf", "whirlpool"].includes(move.id)) {
					return
				}
				return false
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === "surf" || move.id === "whirlpool") {
					return this.chainModify(2)
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful"
	},
	"うつしえ": {
		num: 867,
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
		type: "Normal"
	},
	"はめつのねがい": {
		num: 353,
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
				move: "doomdesire",
				source: source,
				moveData: {
					id: "doomdesire",
					name: "はめつのねがい",
					accuracy: 100,
					basePower: 140,
					category: "特殊",
					priority: 0,
					flags: { futuremove: 1 },
					effectType: "Move",
					type: "Steel"
				}
			})
			this.add("-start", source, "Doom Desire")
			return this.NOT_FAIL
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful"
	},
	"すてみタックル": {
		num: 38,
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
		type: "Normal",
		contestType: "Tough"
	},
	"ダブルアタック": {
		num: 458,
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
		type: "Normal",
		zMove: { basePower: 140 },
		maxMove: { basePower: 120 },
		contestType: "Cool"
	},
	"にどげり": {
		num: 24,
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
		type: "Fighting",
		maxMove: { basePower: 80 },
		contestType: "Cool"
	},
	"でんこうそうげき": {
		num: 892,
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
		type: "Electric",
		contestType: "Clever"
	},
	"かげぶんしん": {
		num: 104,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cool"
	},
	"りゅうせいぐん": {
		num: 434,
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
		type: "Dragon",
		contestType: "Beautiful"
	},
	"ガリョウテンセイ": {
		num: 620,
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
		type: "Flying",
		contestType: "Beautiful"
	},
	"りゅうのいぶき": {
		num: 225,
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
		type: "Dragon",
		contestType: "Cool"
	},
	"ドラゴンクロー": {
		num: 337,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "ドラゴンクロー",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool"
	},
	"りゅうのまい": {
		num: 349,
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
		type: "Dragon",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cool"
	},
	"ドラゴンアロー": {
		num: 751,
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
		type: "Dragon",
		maxMove: { basePower: 130 }
	},
	"ドラゴンエナジー": {
		num: 820,
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
		type: "Dragon"
	},
	"りゅうのはどう": {
		num: 406,
		accuracy: 100,
		basePower: 85,
		category: "特殊",
		name: "りゅうのはどう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "Dragon",
		contestType: "Beautiful"
	},
	"ドラゴンダイブ": {
		num: 407,
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
		type: "Dragon",
		contestType: "Tough"
	},
	"ドラゴンテール": {
		num: 525,
		accuracy: 90,
		basePower: 60,
		category: "物理",
		name: "ドラゴンテール",
		pp: 10,
		priority: -6,
		flags: { contact: 1, protect: 1, mirror: 1, noassist: 1, failcopycat: 1 },
		forceSwitch: true,
		target: "normal",
		type: "Dragon",
		contestType: "Tough"
	},
	"ドレインキッス": {
		num: 577,
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
		type: "Fairy",
		contestType: "Cute"
	},
	"ドレインパンチ": {
		num: 409,
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
		type: "Fighting",
		contestType: "Tough"
	},
	"ゆめくい": {
		num: 138,
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "ゆめくい",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		onTryImmunity(target) {
			return target.status === "slp" || target.hasAbility("comatose")
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever"
	},
	"ドリルくちばし": {
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
		type: "Flying",
		contestType: "Cool"
	},
	"ドリルライナー": {
		num: 529,
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
		type: "Ground",
		contestType: "Tough"
	},
	"ドラムアタック": {
		num: 778,
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
		type: "Grass"
	},
	"ダブルウイング": {
		num: 814,
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
		type: "Flying",
		maxMove: { basePower: 130 }
	},
	"ダイマックスほう": {
		num: 744,
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
		type: "Dragon"
	},
	"ばくれつパンチ": {
		num: 223,
		accuracy: 50,
		basePower: 100,
		category: "物理",
		name: "ばくれつパンチ",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 100,
			volatileStatus: "confusion"
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"だいちのちから": {
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
				spd: -1
			}
		},
		target: "normal",
		type: "Ground",
		contestType: "Beautiful"
	},
	"じしん": {
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
		type: "Ground",
		contestType: "Tough"
	},
	"エコーボイス": {
		num: 497,
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
			this.field.addPseudoWeather("echoedvoice")
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"かいでんぱ": {
		num: 598,
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
		type: "Electric",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"ぶきみなじゅもん": {
		num: 826,
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
		type: "Psychic"
	},
	"エレキフィールド": {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "エレキフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "electricterrain",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("terrainextender")) {
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
						effect.id === "yawn" ||
						(effect.effectType === "Move" && !effect.secondaries)
					) {
						this.add("-activate", target, "move: Electric Terrain")
					}
					return false
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return
				if (status.id === "yawn") {
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
		type: "Electric",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"エレキボール": {
		num: 486,
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
		type: "Electric",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"イナズマドライブ": {
		num: 879,
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
		type: "Electric",
		contestType: "Cool"
	},
	"エレキネット": {
		num: 527,
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
		type: "Electric",
		contestType: "Beautiful"
	},
	"ひのこ": {
		num: 52,
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
		type: "Fire",
		contestType: "Cute"
	},
	"アンコール": {
		num: 227,
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
		volatileStatus: "encore",
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
				this.add("-start", target, "Encore")
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
					target.removeVolatile("encore")
				}
			},
			onEnd(target) {
				this.add("-end", target, "Encore")
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
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"がむしゃら": {
		num: 283,
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
		type: "Normal",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"こらえる": {
		num: 203,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "こらえる",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "endure",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("stall")
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"エナジーボール": {
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
				spd: -1
			}
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful"
	},
	"なかまづくり": {
		num: 494,
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
				"commander",
				"flowergift",
				"forecast",
				"hungerswitch",
				"illusion",
				"imposter",
				"neutralizinggas",
				"powerofalchemy",
				"receiver",
				"trace",
				"zenmode"
			]
			if (
				target.ability === source.ability ||
				target.getAbility().isPermanent ||
				target.ability === "truant" ||
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
		type: "Normal",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute"
	},
	"ふんか": {
		num: 284,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"オーラウイング": {
		num: 840,
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
		type: "Psychic"
	},
	"ワイドフォース": {
		num: 797,
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "ワイドフォース",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower, source) {
			if (this.field.isTerrain("psychicterrain") && source.isGrounded()) {
				this.debug("terrain buff")
				return this.chainModify(1.5)
			}
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain("psychicterrain") && source.isGrounded()) {
				move.target = "allAdjacentFoes"
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic"
	},
	"だいばくはつ": {
		num: 153,
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"じんつうりき": {
		num: 326,
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
		type: "Psychic",
		contestType: "Cool"
	},
	"しんそく": {
		num: 245,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "しんそく",
		pp: 5,
		priority: 2,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool"
	},
	"からげんき": {
		num: 263,
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
		type: "Normal",
		contestType: "Cute"
	},
	"フェアリーロック": {
		num: 587,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "フェアリーロック",
		pp: 10,
		priority: 0,
		flags: { mirror: 1, bypasssub: 1 },
		pseudoWeather: "fairylock",
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
		type: "Fairy",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"ようせいのかぜ": {
		num: 584,
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "ようせいのかぜ",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful"
	},
	"ねこだまし": {
		num: 252,
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
		type: "Normal",
		contestType: "Cute"
	},
	"うそなき": {
		num: 313,
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
		type: "Dark",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"どげざつき": {
		num: 793,
		accuracy: true,
		basePower: 80,
		category: "物理",
		name: "どげざつき",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Dark"
	},
	"みねうち": {
		num: 206,
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
		type: "Normal",
		contestType: "Cool"
	},
	"フェザーダンス": {
		num: 297,
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
		type: "Flying",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful"
	},
	"フェイント": {
		num: 364,
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
		type: "Normal",
		contestType: "Clever"
	},
	"とどめばり": {
		num: 565,
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
		type: "Bug",
		contestType: "Cool"
	},
	"ほのおのまい": {
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
					spa: 1
				}
			}
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful"
	},
	"もえあがるいかり": {
		num: 822,
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
		type: "Dark"
	},
	"みをけずる": {
		num: 868,
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
		type: "Normal"
	},
	"いのちがけ": {
		num: 515,
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
		type: "Fighting",
		zMove: { basePower: 180 },
		contestType: "Tough"
	},
	"だいもんじ": {
		num: 126,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"ほのおのキバ": {
		num: 424,
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
		type: "Fire",
		contestType: "Cool"
	},
	"ほのおのムチ": {
		num: 680,
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
		type: "Fire",
		contestType: "Cute"
	},
	"ほのおのちかい": {
		num: 519,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (["grasspledge", "waterpledge"].includes(move.sourceEffect)) {
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
					["grasspledge", "waterpledge"].includes(action.move.id)
				) {
					this.queue.prioritizeAction(action, move)
					this.add("-waiting", source, action.pokemon)
					return null
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === "waterpledge") {
				move.type = "Water"
				move.forceSTAB = true
				move.self = { sideCondition: "waterpledge" }
			}
			if (move.sourceEffect === "grasspledge") {
				move.type = "Fire"
				move.forceSTAB = true
				move.sideCondition = "firepledge"
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add("-sidestart", targetSide, "Fire Pledge")
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
				this.add("-sideend", targetSide, "Fire Pledge")
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful"
	},
	"ほのおのパンチ": {
		num: 7,
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
		type: "Fire",
		contestType: "Tough"
	},
	"ほのおのうず": {
		num: 83,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"であいがしら": {
		num: 660,
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
		type: "Bug",
		contestType: "Cute"
	},
	"じわれ": {
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
		target: "normal",
		type: "Ground",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"じたばた": {
		num: 175,
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
		type: "Normal",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cute"
	},
	"ニトロチャージ": {
		num: 488,
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
		type: "Fire",
		contestType: "Cool"
	},
	"かえんぐるま": {
		num: 172,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"かえんほうしゃ": {
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
			status: "brn"
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful"
	},
	"フレアドライブ": {
		num: 394,
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
		type: "Fire",
		contestType: "Cool"
	},
	"ラスターカノン": {
		num: 430,
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
		type: "Steel",
		contestType: "Beautiful"
	},
	"おだてる": {
		num: 260,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "おだてる",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		volatileStatus: "confusion",
		boosts: {
			spa: 1
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"フルールカノン": {
		num: 705,
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
		type: "Fairy",
		contestType: "Beautiful"
	},
	"なげつける": {
		num: 374,
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
						if (item.id === "leppaberry") foe.staleness = "external"
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
			source.addVolatile("fling")
		},
		condition: {
			onUpdate(pokemon) {
				const item = pokemon.getItem()
				pokemon.setItem("")
				pokemon.lastItem = item.id
				pokemon.usedItemThisTurn = true
				this.add("-enditem", pokemon, item.name, "[from] move: Fling")
				this.runEvent("AfterUseItem", pokemon, null, null, item)
				pokemon.removeVolatile("fling")
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cute"
	},
	"クイックターン": {
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
		target: "normal",
		type: "Water"
	},
	"トリックフラワー": {
		num: 870,
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
		type: "Grass"
	},
	"そらをとぶ": {
		num: 19,
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
						"gust",
						"twister",
						"skyuppercut",
						"thunder",
						"hurricane",
						"smackdown",
						"thousandarrows"
					].includes(move.id)
				) {
					return
				}
				return false
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === "gust" || move.id === "twister") {
					return this.chainModify(2)
				}
			}
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever"
	},
	"フライングプレス": {
		num: 560,
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
		type: "Fighting",
		zMove: { basePower: 170 },
		contestType: "Tough"
	},
	"きあいだま": {
		num: 411,
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
		type: "Fighting",
		contestType: "Cool"
	},
	"きあいだめ": {
		num: 116,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "きあいだめ",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "focusenergy",
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === "zpower") {
					this.add("-start", target, "move: Focus Energy", "[zeffect]")
				} else if (
					effect &&
					["costar", "imposter", "psychup", "transform"].includes(effect.id)
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
		type: "Normal",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cool"
	},
	"きあいパンチ": {
		num: 264,
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
			pokemon.addVolatile("focuspunch")
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles["focuspunch"]?.lostFocus) {
				this.add("cant", pokemon, "Focus Punch", "Focus Punch")
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
		type: "Fighting",
		contestType: "Tough"
	},
	"このゆびとまれ": {
		num: 266,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "このゆびとまれ",
		pp: 20,
		priority: 2,
		flags: { noassist: 1, failcopycat: 1 },
		volatileStatus: "followme",
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"はっけい": {
		num: 395,
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
		type: "Fighting",
		contestType: "Cool"
	},
	"イカサマ": {
		num: 492,
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
		type: "Dark",
		contestType: "Clever"
	},
	"フリーズドライ": {
		num: 573,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"いてつくしせん": {
		num: 821,
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
		type: "Psychic"
	},
	"ハードプラント": {
		num: 338,
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
		type: "Grass",
		contestType: "Cool"
	},
	"こおりのいぶき": {
		num: 524,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"みだれづき": {
		num: 31,
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
		type: "Normal",
		contestType: "Cool"
	},
	"れんぞくぎり": {
		num: 210,
		accuracy: 95,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles["furycutter"] || move.hit === 1) {
				pokemon.addVolatile("furycutter")
			}
			const bp = this.clampIntRange(
				move.basePower * pokemon.volatiles["furycutter"].multiplier,
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
		type: "Bug",
		contestType: "Cool"
	},
	"みだれひっかき": {
		num: 154,
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
		type: "Normal",
		maxMove: { basePower: 100 },
		contestType: "Tough"
	},
	"みらいよち": {
		num: 248,
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
				move: "futuresight",
				source: source,
				moveData: {
					id: "futuresight",
					name: "みらいよち",
					accuracy: 100,
					basePower: 120,
					category: "特殊",
					priority: 0,
					flags: { allyanim: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: "Move",
					type: "Psychic"
				}
			})
			this.add("-start", source, "move: Future Sight")
			return this.NOT_FAIL
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever"
	},
	"いえき": {
		num: 380,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "いえき",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		volatileStatus: "gastroacid",
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false
			}
			if (target.hasItem("Ability Shield")) {
				this.add("-block", target, "item: Ability Shield")
				return null
			}
		},
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
			onStart(pokemon) {
				if (pokemon.hasItem("Ability Shield")) return false
				this.add("-endability", pokemon)
				this.singleEvent(
					"End",
					pokemon.getAbility(),
					pokemon.abilityState,
					pokemon,
					pokemon,
					"gastroacid"
				)
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent)
					pokemon.removeVolatile("gastroacid")
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"ギガドレイン": {
		num: 202,
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
		type: "Grass",
		contestType: "Clever"
	},
	"ギガインパクト": {
		num: 416,
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
		type: "Normal",
		contestType: "Tough"
	},
	"デカハンマー": {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "物理",
		name: "デカハンマー",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		secondary: null,
		target: "normal",
		type: "Steel"
	},
	"ブリザードランス": {
		num: 824,
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "ブリザードランス",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice"
	},
	"きょけんとつげき": {
		num: 862,
		accuracy: 100,
		basePower: 120,
		category: "物理",
		name: "きょけんとつげき",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: "glaiverush"
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add("-singlemove", pokemon, "Glaive Rush", "[silent]")
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
				pokemon.removeVolatile("glaiverush")
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon"
	},
	"へびにらみ": {
		num: 137,
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
		type: "Normal",
		zMove: { boost: { spd: 1 } },
		contestType: "Tough"
	},
	"くさむすび": {
		num: 447,
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
		type: "Grass",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cute"
	},
	"くさのちかい": {
		num: 520,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (["waterpledge", "firepledge"].includes(move.sourceEffect)) {
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
					["waterpledge", "firepledge"].includes(action.move.id)
				) {
					this.queue.prioritizeAction(action, move)
					this.add("-waiting", source, action.pokemon)
					return null
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === "waterpledge") {
				move.type = "Grass"
				move.forceSTAB = true
				move.sideCondition = "grasspledge"
			}
			if (move.sourceEffect === "firepledge") {
				move.type = "Fire"
				move.forceSTAB = true
				move.sideCondition = "firepledge"
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add("-sidestart", targetSide, "Grass Pledge")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 9,
			onSideEnd(targetSide) {
				this.add("-sideend", targetSide, "Grass Pledge")
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25)
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful"
	},
	"グラススライダー": {
		num: 803,
		accuracy: 100,
		basePower: 55,
		category: "物理",
		name: "グラススライダー",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain("grassyterrain") && source.isGrounded()) {
				return priority + 1
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool"
	},
	"グラスフィールド": {
		num: 580,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "グラスフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "grassyterrain",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("terrainextender")) {
					return 8
				}
				return 5
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ["earthquake", "bulldoze", "magnitude"]
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
		type: "Grass",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful"
	},
	"Gのちから": {
		num: 788,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "Gのちから",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onBasePower(basePower) {
			if (this.field.getPseudoWeather("gravity")) {
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
		type: "Grass"
	},
	"じゅうりょく": {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "じゅうりょく",
		pp: 5,
		priority: 0,
		flags: { nonsky: 1 },
		pseudoWeather: "gravity",
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
						pokemon.removeVolatile("bounce") ||
						pokemon.removeVolatile("fly")
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
					if (pokemon.volatiles["magnetrise"]) {
						applies = true
						delete pokemon.volatiles["magnetrise"]
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
					if (this.dex.moves.get(moveSlot.id).flags["gravity"]) {
						pokemon.disableMove(moveSlot.id)
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags["gravity"] && !move.isZ) {
					this.add("cant", pokemon, "move: Gravity", move)
					return false
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags["gravity"] && !move.isZ) {
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
		type: "Psychic",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"なきごえ": {
		num: 45,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"せいちょう": {
		num: 74,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "せいちょう",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		onModifyMove(move, pokemon) {
			if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
				move.boosts = { atk: 2, spa: 2 }
		},
		boosts: {
			atk: 1,
			spa: 1
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: { boost: { spa: 1 } },
		contestType: "Beautiful"
	},
	"ガードシェア": {
		num: 470,
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ガードスワップ": {
		num: 385,
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ハサミギロチン": {
		num: 12,
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
		type: "Normal",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"ダストシュート": {
		num: 441,
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
		type: "Poison",
		contestType: "Tough"
	},
	"かぜおこし": {
		num: 16,
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "かぜおこし",
		pp: 35,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever"
	},
	"ジャイロボール": {
		num: 360,
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
		type: "Steel",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"アームハンマー": {
		num: 359,
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
		type: "Fighting",
		contestType: "Tough"
	},
	"ハッピータイム": {
		num: 603,
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
		type: "Normal",
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
		contestType: "Cute"
	},
	"かたくなる": {
		num: 106,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"くろいきり": {
		num: 114,
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
		type: "Ice",
		zMove: { effect: "heal" },
		contestType: "Beautiful"
	},
	"ずつき": {
		num: 29,
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
		type: "Normal",
		contestType: "Tough"
	},
	"ぶちかまし": {
		num: 838,
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
		type: "Ground"
	},
	"もろはのずつき": {
		num: 457,
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
		type: "Rock",
		contestType: "Tough"
	},
	"いやしのすず": {
		num: 215,
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
				if (ally !== source && ally.hasAbility("soundproof")) continue
				if (ally.cureStatus()) success = true
			}
			return success
		},
		target: "allyTeam",
		type: "Normal",
		zMove: { effect: "heal" },
		contestType: "Beautiful"
	},
	"いやしのねがい": {
		num: 361,
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
		slotCondition: "healingwish",
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
					target.side.removeSlotCondition(target, "healingwish")
				}
			}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Beautiful"
	},
	"いやしのはどう": {
		num: 505,
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
			if (source.hasAbility("megalauncher")) {
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
		type: "Psychic",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"ハートスワップ": {
		num: 391,
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
		type: "Psychic",
		zMove: { effect: "crit2" },
		contestType: "Clever"
	},
	"ヒートスタンプ": {
		num: 535,
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
		type: "Fire",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"ねっぷう": {
		num: 257,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"ヘビーボンバー": {
		num: 484,
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
		type: "Steel",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"てだすけ": {
		num: 270,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "てだすけ",
		pp: 20,
		priority: 5,
		flags: { bypasssub: 1, noassist: 1, failcopycat: 1 },
		volatileStatus: "helpinghand",
		onTryHit(target) {
			if (!target.newlySwitched && !this.queue.willMove(target)) return false
		},
		condition: {
			duration: 1,
			onStart(target, source) {
				this.effectState.multiplier = 1.5
				this.add("-singleturn", target, "Helping Hand", "[of] " + source)
			},
			onRestart(target, source) {
				this.effectState.multiplier *= 1.5
				this.add("-singleturn", target, "Helping Hand", "[of] " + source)
			},
			onBasePowerPriority: 10,
			onBasePower(basePower) {
				this.debug("Boosting from Helping Hand: " + this.effectState.multiplier)
				return this.chainModify(this.effectState.multiplier)
			}
		},
		secondary: null,
		target: "adjacentAlly",
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"たたりめ": {
		num: 506,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility("comatose")) {
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
		type: "Ghost",
		zMove: { basePower: 160 },
		contestType: "Clever"
	},
	"10まんばりき": {
		num: 667,
		accuracy: 95,
		basePower: 95,
		category: "物理",
		name: "10まんばりき",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough"
	},
	"とびひざげり": {
		num: 136,
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
				this.dex.conditions.get("High Jump Kick")
			)
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"てかげん": {
		num: 610,
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
		type: "Normal",
		contestType: "Cool"
	},
	"てをつなぐ": {
		num: 607,
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
		type: "Normal",
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
		contestType: "Cute"
	},
	"つめとぎ": {
		num: 468,
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
		type: "Dark",
		zMove: { boost: { atk: 1 } },
		contestType: "Cute"
	},
	"つのでつく": {
		num: 30,
		accuracy: 100,
		basePower: 65,
		category: "物理",
		name: "つのでつく",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool"
	},
	"つのドリル": {
		num: 32,
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
		type: "Normal",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"ウッドホーン": {
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
		target: "normal",
		type: "Grass",
		contestType: "Tough"
	},
	"とおぼえ": {
		num: 336,
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
		type: "Normal",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool"
	},
	"ぼうふう": {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "特殊",
		name: "ぼうふう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
				case "raindance":
				case "primordialsea":
					move.accuracy = true
					break
				case "sunnyday":
				case "desolateland":
					move.accuracy = 50
					break
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: "confusion"
		},
		target: "any",
		type: "Flying",
		contestType: "Tough"
	},
	"ハイドロカノン": {
		num: 308,
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
		type: "Water",
		contestType: "Beautiful"
	},
	"ハイドロポンプ": {
		num: 56,
		accuracy: 80,
		basePower: 110,
		category: "特殊",
		name: "ハイドロポンプ",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful"
	},
	"ハイドロスチーム": {
		num: 876,
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
		type: "Water"
	},
	"はかいこうせん": {
		num: 63,
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
		type: "Normal",
		contestType: "Cool"
	},
	"ハイパードリル": {
		num: 887,
		accuracy: 100,
		basePower: 100,
		category: "物理",
		name: "ハイパードリル",
		pp: 5,
		priority: 0,
		flags: { contact: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever"
	},
	"いじげんラッシュ": {
		num: 621,
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
		type: "Dark",
		contestType: "Tough"
	},
	"いじげんホール": {
		num: 593,
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
		type: "Psychic",
		contestType: "Clever"
	},
	"ハイパーボイス": {
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
		type: "Normal",
		contestType: "Cool"
	},
	"さいみんじゅつ": {
		num: 95,
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"れいとうビーム": {
		num: 58,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"こおりのキバ": {
		num: 423,
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
		type: "Ice",
		contestType: "Cool"
	},
	"アイスハンマー": {
		num: 665,
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
		type: "Ice",
		contestType: "Tough"
	},
	"れいとうパンチ": {
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
			status: "frz"
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful"
	},
	"こおりのつぶて": {
		num: 420,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "こおりのつぶて",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful"
	},
	"アイススピナー": {
		num: 861,
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
		type: "Ice"
	},
	"つららおとし": {
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
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful"
	},
	"つららばり": {
		num: 333,
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
		type: "Ice",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful"
	},
	"こごえるかぜ": {
		num: 196,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"ふういん": {
		num: 286,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ふういん",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, bypasssub: 1, mustpressure: 1 },
		volatileStatus: "imprison",
		condition: {
			noCopy: true,
			onStart(target) {
				this.add("-start", target, "move: Imprison")
			},
			onFoeDisableMove(pokemon) {
				for (const moveSlot of this.effectState.source.moveSlots) {
					if (moveSlot.id === "struggle") continue
					pokemon.disableMove(moveSlot.id, "hidden")
				}
				pokemon.maybeDisabled = true
			},
			onFoeBeforeMovePriority: 4,
			onFoeBeforeMove(attacker, defender, move) {
				if (
					move.id !== "struggle" &&
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
		type: "Psychic",
		zMove: { boost: { spd: 2 } },
		contestType: "Clever"
	},
	"やきつくす": {
		num: 510,
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
		type: "Fire",
		contestType: "Tough"
	},
	"ひゃっきやこう": {
		num: 844,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility("comatose"))
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
		type: "Ghost"
	},
	"れんごく": {
		num: 517,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"まとわりつく": {
		num: 611,
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
		type: "Bug",
		contestType: "Cute"
	},
	"ねをはる": {
		num: 275,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねをはる",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, nonsky: 1 },
		volatileStatus: "ingrain",
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
		type: "Grass",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"さいはい": {
		num: 689,
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
				lastMove.flags["charge"] ||
				lastMove.flags["recharge"] ||
				target.volatiles["beakblast"] ||
				target.volatiles["focuspunch"] ||
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
		type: "Psychic",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"てっぺき": {
		num: 334,
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
		type: "Steel",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"アイアンヘッド": {
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
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough"
	},
	"アイアンテール": {
		num: 231,
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
		type: "Steel",
		contestType: "Cool"
	},
	"ツタこんぼう": {
		num: 904,
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
		type: "Grass"
	},
	"くらいつく": {
		num: 746,
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
		type: "Dark"
	},
	"ジェットパンチ": {
		num: 857,
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "ジェットパンチ",
		pp: 15,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool"
	},
	"さばきのつぶて": {
		num: 449,
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"ジャングルヒール": {
		num: 816,
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
		type: "Grass"
	},
	"はたきおとす": {
		num: 282,
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
		type: "Dark",
		contestType: "Clever"
	},
	"ドゲザン": {
		num: 869,
		accuracy: true,
		basePower: 85,
		category: "物理",
		name: "ドゲザン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		target: "normal",
		type: "Dark"
	},
	"うっぷんばらし": {
		num: 808,
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
		type: "Dark"
	},
	"とっておき": {
		num: 387,
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
				if (moveSlot.id === "lastresort") {
					hasLastResort = true
					continue
				}
				if (!moveSlot.used) return false
			}
			return hasLastResort
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute"
	},
	"おはかまいり": {
		num: 854,
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
		type: "Ghost"
	},
	"ふんえん": {
		num: 436,
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
		type: "Fire",
		contestType: "Tough"
	},
	"このは": {
		num: 670,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "このは",
		pp: 40,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough"
	},
	"リーフブレード": {
		num: 348,
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
		type: "Grass",
		contestType: "Cool"
	},
	"リーフストーム": {
		num: 437,
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
		type: "Grass",
		contestType: "Beautiful"
	},
	"きゅうけつ": {
		num: 141,
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
		type: "Bug",
		contestType: "Clever"
	},
	"やどりぎのタネ": {
		num: 73,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "やどりぎのタネ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "leechseed",
		condition: {
			onStart(target) {
				this.add("-start", target, "move: Leech Seed")
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles["leechseed"].sourceSlot)
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
		type: "Grass",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"にらみつける": {
		num: 43,
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
		type: "Normal",
		zMove: { boost: { atk: 1 } },
		contestType: "Cool"
	},
	"したでなめる": {
		num: 122,
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
		type: "Ghost",
		contestType: "Cute"
	},
	"いのちのしずく": {
		num: 791,
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
		type: "Water"
	},
	"ひかりのかべ": {
		num: 113,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ひかりのかべ",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "lightscreen",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem("lightclay")) {
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
		type: "Psychic",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"アクアブレイク": {
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
				def: -1
			}
		},
		target: "normal",
		type: "Water",
		contestType: "Cool"
	},
	"ロックオン": {
		num: 199,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ロックオン",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onTryHit(target, source) {
			if (source.volatiles["lockon"]) return false
		},
		onHit(target, source) {
			source.addVolatile("lockon", target)
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
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"けたぐり": {
		num: 67,
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
		type: "Fighting",
		zMove: { basePower: 160 },
		contestType: "Tough"
	},
	"ローキック": {
		num: 490,
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
		type: "Fighting",
		contestType: "Clever"
	},
	"ルミナコリジョン": {
		num: 855,
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
		type: "Psychic"
	},
	"みかづきのいのり": {
		num: 849,
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
		type: "Psychic"
	},
	"みかづきのまい": {
		num: 461,
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
		slotCondition: "lunardance",
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
					target.side.removeSlotCondition(target, "lunardance")
				}
			}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Beautiful"
	},
	"とびかかる": {
		num: 679,
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
		type: "Bug",
		contestType: "Cute"
	},
	"マッハパンチ": {
		num: 183,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "マッハパンチ",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"マジカルリーフ": {
		num: 345,
		accuracy: true,
		basePower: 60,
		category: "特殊",
		name: "マジカルリーフ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful"
	},
	"まほうのこな": {
		num: 750,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "まほうのこな",
		pp: 20,
		priority: 0,
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		onHit(target) {
			if (target.getTypes().join() === "Psychic" || !target.setType("Psychic"))
				return false
			this.add("-start", target, "typechange", "Psychic")
		},
		secondary: null,
		target: "normal",
		type: "Psychic"
	},
	"マジックルーム": {
		num: 478,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "マジックルーム",
		pp: 10,
		priority: 0,
		flags: { mirror: 1 },
		pseudoWeather: "magicroom",
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
				this.field.removePseudoWeather("magicroom")
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
		type: "Psychic",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"マグマストーム": {
		num: 463,
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
		type: "Fire",
		contestType: "Tough"
	},
	"じばそうさ": {
		num: 602,
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
						ally.hasAbility(["plus", "minus"]) &&
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
		type: "Electric",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"でんじふゆう": {
		num: 393,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "でんじふゆう",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, gravity: 1 },
		volatileStatus: "magnetrise",
		onTry(source, target, move) {
			if (target.volatiles["smackdown"] || target.volatiles["ingrain"])
				return false

			// Additional Gravity check for Z-move variant
			if (this.field.getPseudoWeather("Gravity")) {
				this.add("cant", source, "move: Gravity", move)
				return null
			}
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add("-start", target, "Magnet Rise")
			},
			onImmunity(type) {
				if (type === "Ground") return false
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add("-end", target, "Magnet Rise")
			}
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: { boost: { evasion: 1 } },
		contestType: "Clever"
	},
	"ゴールドラッシュ": {
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
				spa: -1
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Beautiful"
	},
	"シャカシャカほう": {
		num: 902,
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
		type: "Grass"
	},
	"くろいまなざし": {
		num: 212,
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
		type: "Normal",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"メガドレイン": {
		num: 72,
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
		type: "Grass",
		zMove: { basePower: 120 },
		contestType: "Clever"
	},
	"メガホーン": {
		num: 224,
		accuracy: 85,
		basePower: 120,
		category: "物理",
		name: "メガホーン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool"
	},
	"メガトンキック": {
		num: 25,
		accuracy: 75,
		basePower: 120,
		category: "物理",
		name: "メガトンキック",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool"
	},
	"メガトンパンチ": {
		num: 5,
		accuracy: 85,
		basePower: 80,
		category: "物理",
		name: "メガトンパンチ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"おきみやげ": {
		num: 262,
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
		type: "Dark",
		zMove: { effect: "healreplacement" },
		contestType: "Tough"
	},
	"メタルバースト": {
		num: 368,
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
		type: "Steel",
		contestType: "Cool"
	},
	"メタルクロー": {
		num: 232,
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
		type: "Steel",
		contestType: "Cool"
	},
	"きんぞくおん": {
		num: 319,
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
		type: "Steel",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"メテオビーム": {
		num: 800,
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
		type: "Rock"
	},
	"コメットパンチ": {
		num: 309,
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
		type: "Steel",
		contestType: "Cool"
	},
	"ゆびをふる": {
		num: 118,
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
			"After You",
			"Apple Acid",
			"Armor Cannon",
			"Assist",
			"Astral Barrage",
			"Aura Wheel",
			"Baneful Bunker",
			"Beak Blast",
			"Behemoth Bash",
			"Behemoth Blade",
			"Belch",
			"Bestow",
			"Blazing Torque",
			"Body Press",
			"Branch Poke",
			"Breaking Swipe",
			"Celebrate",
			"Chatter",
			"Chilling Water",
			"Chilly Reception",
			"Clangorous Soul",
			"Collision Course",
			"Combat Torque",
			"Comeuppance",
			"Copycat",
			"Counter",
			"Covet",
			"Crafty Shield",
			"Decorate",
			"Destiny Bond",
			"Detect",
			"Diamond Storm",
			"Doodle",
			"Double Iron Bash",
			"Double Shock",
			"Dragon Ascent",
			"Dragon Energy",
			"Drum Beating",
			"Dynamax Cannon",
			"Electro Drift",
			"Endure",
			"Eternabeam",
			"False Surrender",
			"Feint",
			"Fiery Wrath",
			"Fillet Away",
			"Fleur Cannon",
			"Focus Punch",
			"Follow Me",
			"Freeze Shock",
			"Freezing Glare",
			"Glacial Lance",
			"Grav Apple",
			"Helping Hand",
			"Hold Hands",
			"Hyper Drill",
			"Hyperspace Fury",
			"Hyperspace Hole",
			"Ice Burn",
			"Instruct",
			"Jet Punch",
			"Jungle Healing",
			"King's Shield",
			"Life Dew",
			"Light of Ruin",
			"Magical Torque",
			"Make It Rain",
			"Mat Block",
			"Me First",
			"Meteor Assault",
			"Metronome",
			"Mimic",
			"Mind Blown",
			"Mirror Coat",
			"Mirror Move",
			"Moongeist Beam",
			"Nature Power",
			"Nature's Madness",
			"Noxious Torque",
			"Obstruct",
			"Order Up",
			"Origin Pulse",
			"Overdrive",
			"Photon Geyser",
			"Plasma Fists",
			"Population Bomb",
			"Pounce",
			"Power Shift",
			"Precipice Blades",
			"Protect",
			"Pyro Ball",
			"Quash",
			"Quick Guard",
			"Rage Fist",
			"Rage Powder",
			"Raging Bull",
			"Raging Fury",
			"Relic Song",
			"Revival Blessing",
			"Ruination",
			"Salt Cure",
			"Secret Sword",
			"Shed Tail",
			"Shell Trap",
			"Silk Trap",
			"Sketch",
			"Sleep Talk",
			"Snap Trap",
			"Snarl",
			"Snatch",
			"Snore",
			"Snowscape",
			"Spectral Thief",
			"Spicy Extract",
			"Spiky Shield",
			"Spirit Break",
			"Spotlight",
			"Springtide Storm",
			"Steam Eruption",
			"Steel Beam",
			"Strange Steam",
			"Struggle",
			"Sunsteel Strike",
			"Surging Strikes",
			"Switcheroo",
			"Techno Blast",
			"Thief",
			"Thousand Arrows",
			"Thousand Waves",
			"Thunder Cage",
			"Thunderous Kick",
			"Tidy Up",
			"Trailblaze",
			"Transform",
			"Trick",
			"Twin Beam",
			"V-create",
			"Wicked Blow",
			"Wicked Torque",
			"Wide Guard"
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
		type: "Normal",
		contestType: "Cute"
	},
	"ミルクのみ": {
		num: 208,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ものまね": {
		num: 102,
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
			const mimicIndex = source.moves.indexOf("mimic")
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
			this.add("-start", source, "Mimic", move.name)
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"ちいさくなる": {
		num: 107,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ちいさくなる",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "minimize",
		condition: {
			noCopy: true,
			onRestart: () => null,
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					"stomp",
					"steamroller",
					"bodyslam",
					"flyingpress",
					"dragonrush",
					"heatcrash",
					"heavyslam",
					"maliciousmoonsault"
				]
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2)
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					"stomp",
					"steamroller",
					"bodyslam",
					"flyingpress",
					"dragonrush",
					"heatcrash",
					"heavyslam",
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ミラーコート": {
		num: 243,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles["mirrorcoat"]) return 0
			return pokemon.volatiles["mirrorcoat"].damage || 1
		},
		category: "特殊",
		name: "ミラーコート",
		pp: 20,
		priority: -5,
		flags: { protect: 1, failmefirst: 1, noassist: 1 },
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile("mirrorcoat")
		},
		onTry(source) {
			if (!source.volatiles["mirrorcoat"]) return false
			if (source.volatiles["mirrorcoat"].slot === null) return false
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
				if (move.id !== "mirrorcoat") return
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
		type: "Psychic",
		contestType: "Beautiful"
	},
	"しろいきり": {
		num: 54,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しろいきり",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "mist",
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
				this.add("-sidestart", side, "Mist")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 4,
			onSideEnd(side) {
				this.add("-sideend", side, "Mist")
			}
		},
		secondary: null,
		target: "allySide",
		type: "Ice",
		zMove: { effect: "heal" },
		contestType: "Beautiful"
	},
	"ミストバースト": {
		num: 802,
		accuracy: 100,
		basePower: 100,
		category: "特殊",
		name: "ミストバースト",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		selfdestruct: "always",
		onBasePower(basePower, source) {
			if (this.field.isTerrain("mistyterrain") && source.isGrounded()) {
				this.debug("misty terrain boost")
				return this.chainModify(1.5)
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy"
	},
	"ミストフィールド": {
		num: 581,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ミストフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "mistyterrain",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("terrainextender")) {
					return 8
				}
				return 5
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return
				if (effect && (effect.status || effect.id === "yawn")) {
					this.add("-activate", target, "move: Misty Terrain")
				}
				return false
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return
				if (status.id === "confusion") {
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
				this.add("-fieldend", "Misty Terrain")
			}
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful"
	},
	"ムーンフォース": {
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
				spa: -1
			}
		},
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful"
	},
	"つきのひかり": {
		num: 236,
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
				case "sunnyday":
				case "desolateland":
					factor = 0.667
					break
				case "raindance":
				case "primordialsea":
				case "sandstorm":
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
		type: "Fairy",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"あさのひざし": {
		num: 234,
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
				case "sunnyday":
				case "desolateland":
					factor = 0.667
					break
				case "raindance":
				case "primordialsea":
				case "sandstorm":
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"キラースピン": {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "物理",
		name: "キラースピン",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
					this.add(
						"-end",
						pokemon,
						"Leech Seed",
						"[from] move: Mortal Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"spikes",
					"toxicspikes",
					"stealthrock",
					"stickyweb",
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
				if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
					this.add(
						"-end",
						pokemon,
						"Leech Seed",
						"[from] move: Mortal Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"spikes",
					"toxicspikes",
					"stealthrock",
					"stickyweb",
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
		type: "Poison"
	},
	"ひょうざんおろし": {
		num: 836,
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
		type: "Ice"
	},
	"マッドショット": {
		num: 341,
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
		type: "Ground",
		contestType: "Tough"
	},
	"どろかけ": {
		num: 189,
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
		type: "Ground",
		contestType: "Cute"
	},
	"だくりゅう": {
		num: 330,
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
		type: "Water",
		contestType: "Tough"
	},
	"マジカルフレイム": {
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
				spa: -1
			}
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful"
	},
	"しんぴのちから": {
		num: 832,
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
		type: "Psychic"
	},
	"わるだくみ": {
		num: 417,
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
		type: "Dark",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"ナイトバースト": {
		num: 539,
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
		type: "Dark",
		contestType: "Cool"
	},
	"ナイトヘッド": {
		num: 101,
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
		type: "Ghost",
		contestType: "Clever"
	},
	"つじぎり": {
		num: 400,
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
		type: "Dark",
		contestType: "Cool"
	},
	"おたけび": {
		num: 568,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"はいすいのじん": {
		num: 748,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はいすいのじん",
		pp: 5,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "noretreat",
		onTry(source, target, move) {
			if (source.volatiles["noretreat"]) return false
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
		type: "Fighting"
	},
	"ほっぺすりすり": {
		num: 609,
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
		type: "Electric",
		contestType: "Cute"
	},
	"いっちょうあがり": {
		num: 856,
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
		type: "Dragon"
	},
	"こんげんのはどう": {
		num: 618,
		accuracy: 85,
		basePower: 110,
		category: "特殊",
		name: "こんげんのはどう",
		pp: 10,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Beautiful"
	},
	"げきりん": {
		num: 200,
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
		type: "Dragon",
		contestType: "Cool"
	},
	"オーバードライブ": {
		num: 786,
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "オーバードライブ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Electric"
	},
	"オーバーヒート": {
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
				spa: -2
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful"
	},
	"いたみわけ": {
		num: 220,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"パラボラチャージ": {
		num: 570,
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
		type: "Electric",
		contestType: "Clever"
	},
	"すてゼリフ": {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "すてゼリフ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		onHit(target, source, move) {
			const success = this.boost({ atk: -1, spa: -1 }, target, source)
			if (!success && !target.hasAbility("mirrorarmor")) {
				delete move.selfSwitch
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: { effect: "healreplacement" },
		contestType: "Cool"
	},
	"しっぺがえし": {
		num: 371,
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
		type: "Dark",
		contestType: "Tough"
	},
	"ネコにこばん": {
		num: 6,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "ネコにこばん",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever"
	},
	"つつく": {
		num: 64,
		accuracy: 100,
		basePower: 35,
		category: "物理",
		name: "つつく",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool"
	},
	"ほろびのうた": {
		num: 195,
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
				} else if (!pokemon.volatiles["perishsong"]) {
					pokemon.addVolatile("perishsong")
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
				const duration = pokemon.volatiles["perishsong"].duration
				this.add("-start", pokemon, "perish" + duration)
			}
		},
		secondary: null,
		target: "all",
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"はなふぶき": {
		num: 572,
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "はなふぶき",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, wind: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		contestType: "Beautiful"
	},
	"はなびらのまい": {
		num: 80,
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
		type: "Grass",
		contestType: "Beautiful"
	},
	"ゴーストダイブ": {
		num: 566,
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
		type: "Ghost",
		contestType: "Cool"
	},
	"ミサイルばり": {
		num: 42,
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
		type: "Bug",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cool"
	},
	"なかよくする": {
		num: 589,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"じゃれつく": {
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
				atk: -1
			}
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute"
	},
	"ついばむ": {
		num: 365,
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
					if (item.id === "leppaberry") target.staleness = "external"
				}
				if (item.onEat) source.ateBerry = true
			}
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cute"
	},
	"どくどくのキバ": {
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
			status: "tox"
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever"
	},
	"どくガス": {
		num: 139,
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
		type: "Poison",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくづき": {
		num: 398,
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
		type: "Poison",
		contestType: "Tough"
	},
	"どくのこな": {
		num: 77,
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
		type: "Poison",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくばり": {
		num: 40,
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
		type: "Poison",
		contestType: "Clever"
	},
	"ポイズンテール": {
		num: 342,
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
		type: "Poison",
		contestType: "Clever"
	},
	"かふんだんご": {
		num: 676,
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
		type: "Bug",
		contestType: "Cute"
	},
	"ポルターガイスト": {
		num: 809,
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
		type: "Ghost"
	},
	"ネズミざん": {
		num: 860,
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
		type: "Normal"
	},
	"とびつく": {
		num: 884,
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
		type: "Bug",
		contestType: "Cute"
	},
	"はたく": {
		num: 1,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "はたく",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"こなゆき": {
		num: 181,
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
		type: "Ice",
		contestType: "Beautiful"
	},
	"パワージェム": {
		num: 408,
		accuracy: 100,
		basePower: 80,
		category: "特殊",
		name: "パワージェム",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful"
	},
	"パワーシフト": {
		num: 829,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Unobtainable",
		name: "パワーシフト",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "powershift",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "Power Shift")
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
				this.add("-end", pokemon, "Power Shift")
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onRestart(pokemon) {
				pokemon.removeVolatile("Power Shift")
			}
		},
		secondary: null,
		target: "self",
		type: "Normal"
	},
	"パワーシェア": {
		num: 471,
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"パワースワップ": {
		num: 384,
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"パワートリック": {
		num: 379,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "パワートリック",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: "powertrick",
		condition: {
			onStart(pokemon) {
				this.add("-start", pokemon, "Power Trick")
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
				this.add("-end", pokemon, "Power Trick")
				const newatk = pokemon.storedStats.def
				const newdef = pokemon.storedStats.atk
				pokemon.storedStats.atk = newatk
				pokemon.storedStats.def = newdef
			},
			onRestart(pokemon) {
				pokemon.removeVolatile("Power Trick")
			}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: { boost: { atk: 1 } },
		contestType: "Clever"
	},
	"つけあがる": {
		num: 681,
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
		type: "Dark",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Clever"
	},
	"パワーウィップ": {
		num: 438,
		accuracy: 85,
		basePower: 120,
		category: "物理",
		name: "パワーウィップ",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough"
	},
	"だんがいのつるぎ": {
		num: 619,
		accuracy: 85,
		basePower: 120,
		category: "物理",
		name: "だんがいのつるぎ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Cool"
	},
	"プレゼント": {
		num: 217,
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
		type: "Normal",
		contestType: "Cute"
	},
	"まもる": {
		num: 182,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "まもる",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "protect",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("stall")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "Protect")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["protect"]) {
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"サイケこうせん": {
		num: 60,
		accuracy: 100,
		basePower: 65,
		category: "特殊",
		name: "サイケこうせん",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: "confusion"
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful"
	},
	"サイコブレイド": {
		num: 875,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "サイコブレイド",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		onBasePower(basePower, source) {
			if (this.field.isTerrain("electricterrain")) {
				this.debug("psyblade electric terrain boost")
				return this.chainModify(1.5)
			}
		},
		target: "normal",
		type: "Psychic"
	},
	"じこあんじ": {
		num: 244,
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
			const volatilesToCopy = ["focusenergy", "gmaxchistrike", "laserfocus"]
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
		type: "Normal",
		zMove: { effect: "heal" },
		contestType: "Clever"
	},
	"サイコキネシス": {
		num: 94,
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
		type: "Psychic",
		contestType: "Clever"
	},
	"サイコファング": {
		num: 706,
		accuracy: 100,
		basePower: 85,
		category: "物理",
		name: "サイコファング",
		pp: 10,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition("reflect")
			pokemon.side.removeSideCondition("lightscreen")
			pokemon.side.removeSideCondition("auroraveil")
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever"
	},
	"サイコフィールド": {
		num: 678,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "サイコフィールド",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1 },
		terrain: "psychicterrain",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem("terrainextender")) {
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
					move.type === "Psychic" &&
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
		type: "Psychic",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"サイコカッター": {
		num: 427,
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
		type: "Psychic",
		contestType: "Cool"
	},
	"バリアーラッシュ": {
		num: 828,
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
		type: "Psychic"
	},
	"サイコショック": {
		num: 473,
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
		type: "Psychic",
		contestType: "Beautiful"
	},
	"サイコブレイク": {
		num: 540,
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
		type: "Psychic",
		contestType: "Cool"
	},
	"かえんボール": {
		num: 780,
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
		type: "Fire"
	},
	"さきおくり": {
		num: 511,
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
		type: "Dark",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"でんこうせっか": {
		num: 98,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "でんこうせっか",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool"
	},
	"ファストガード": {
		num: 501,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ファストガード",
		pp: 15,
		priority: 3,
		flags: { snatch: 1 },
		sideCondition: "quickguard",
		onTry() {
			return !!this.queue.willAct()
		},
		onHitSide(side, source) {
			source.addVolatile("stall")
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add("-singleturn", source, "Quick Guard")
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Quick Guard blocks moves with positive priority, even those given increased priority by Prankster or Gale Wings.
				// (e.g. it blocks 0 priority moves boosted by Prankster or Gale Wings; Quick Claw/Custap Berry do not count)
				if (move.priority <= 0.1) return
				if (!move.flags["protect"]) {
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
		type: "Fighting",
		zMove: { boost: { def: 1 } },
		contestType: "Cool"
	},
	"ちょうのまい": {
		num: 483,
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
		type: "Bug",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"ふんどのこぶし": {
		num: 889,
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
		type: "Ghost"
	},
	"いかりのこな": {
		num: 476,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "いかりのこな",
		pp: 20,
		priority: 2,
		flags: { powder: 1, noassist: 1, failcopycat: 1 },
		volatileStatus: "ragepowder",
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
		type: "Bug",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"レイジングブル": {
		num: 873,
		accuracy: 100,
		basePower: 90,
		category: "物理",
		name: "レイジングブル",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition("reflect")
			pokemon.side.removeSideCondition("lightscreen")
			pokemon.side.removeSideCondition("auroraveil")
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
		type: "Normal"
	},
	"だいふんげき": {
		num: 833,
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
		type: "Fire"
	},
	"あまごい": {
		num: 240,
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
		type: "Water",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"こうそくスピン": {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "こうそくスピン",
		pp: 40,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
					this.add(
						"-end",
						pokemon,
						"Leech Seed",
						"[from] move: Rapid Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"spikes",
					"toxicspikes",
					"stealthrock",
					"stickyweb",
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
				if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
					this.add(
						"-end",
						pokemon,
						"Leech Seed",
						"[from] move: Rapid Spin",
						"[of] " + pokemon
					)
				}
				const sideConditions = [
					"spikes",
					"toxicspikes",
					"stealthrock",
					"stickyweb",
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
		type: "Normal",
		contestType: "Cool"
	},
	"はっぱカッター": {
		num: 75,
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
		type: "Grass",
		contestType: "Cool"
	},
	"シェルブレード": {
		num: 534,
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
		type: "Water",
		contestType: "Cool"
	},
	"じこさいせい": {
		num: 105,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"リサイクル": {
		num: 278,
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
		type: "Normal",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"リフレクター": {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "リフレクター",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "reflect",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem("lightclay")) {
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
				this.add("-sidestart", side, "Reflect")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add("-sideend", side, "Reflect")
			}
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"ミラータイプ": {
		num: 513,
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
		type: "Normal",
		zMove: { boost: { spa: 1 } },
		contestType: "Clever"
	},
	"いにしえのうた": {
		num: 547,
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"ねむる": {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねむる",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onTry(source) {
			if (source.status === "slp" || source.hasAbility("comatose")) return false

			if (source.hp === source.maxhp) {
				this.add("-fail", source, "heal")
				return null
			}
			if (source.hasAbility(["insomnia", "vitalspirit"])) {
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
		type: "Psychic",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"かたきうち": {
		num: 514,
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
		type: "Normal",
		contestType: "Cool"
	},
	"めざめるダンス": {
		num: 686,
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"きしかいせい": {
		num: 179,
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
		type: "Fighting",
		zMove: { basePower: 160 },
		contestType: "Cool"
	},
	"さいきのいのり": {
		num: 863,
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
		slotCondition: "revivalblessing",
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
		type: "Normal"
	},
	"ライジングボルト": {
		num: 804,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(source, target, move) {
			if (this.field.isTerrain("electricterrain") && target.isGrounded()) {
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
		type: "Electric",
		maxMove: { basePower: 140 }
	},
	"ほえる": {
		num: 46,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Cool"
	},
	"ときのほうこう": {
		num: 459,
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
		type: "Dragon",
		contestType: "Beautiful"
	},
	"ロックブラスト": {
		num: 350,
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
		type: "Rock",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Tough"
	},
	"ロックカット": {
		num: 397,
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
		type: "Rock",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"いわなだれ": {
		num: 157,
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
		type: "Rock",
		contestType: "Tough"
	},
	"いわくだき": {
		num: 249,
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
		type: "Fighting",
		contestType: "Tough"
	},
	"いわおとし": {
		num: 88,
		accuracy: 90,
		basePower: 50,
		category: "物理",
		name: "いわおとし",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough"
	},
	"がんせきふうじ": {
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
				spe: -1
			}
		},
		target: "normal",
		type: "Rock",
		contestType: "Clever"
	},
	"なりきり": {
		num: 272,
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
				"commander",
				"flowergift",
				"forecast",
				"hungerswitch",
				"illusion",
				"imposter",
				"neutralizinggas",
				"powerofalchemy",
				"receiver",
				"trace",
				"wonderguard",
				"zenmode"
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"ころがる": {
		num: 205,
		accuracy: 90,
		basePower: 30,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower
			const rolloutData = pokemon.volatiles["rollout"]
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
			if (pokemon.volatiles["defensecurl"]) {
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
			if (pokemon.volatiles["rollout"] || pokemon.status === "slp" || !target)
				return
			pokemon.addVolatile("rollout")
			// @ts-ignore
			// TS thinks pokemon.volatiles['rollout'] doesn't exist because of the condition on the return above
			// but it does exist now because addVolatile created it
			pokemon.volatiles["rollout"].targetSlot = move.sourceEffect
				? pokemon.lastMoveTargetLoc
				: pokemon.getLocOf(target)
		},
		onAfterMove(source, target, move) {
			const rolloutData = source.volatiles["rollout"]
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
			onLockMove: "rollout",
			onStart() {
				this.effectState.hitCount = 0
				this.effectState.contactHitCount = 0
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === "struggle") {
					// don't lock
					delete target.volatiles["rollout"]
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cute"
	},
	"はねやすめ": {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はねやすめ",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		self: {
			volatileStatus: "roost"
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
		type: "Flying",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"りんしょう": {
		num: 496,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(target, source, move) {
			if (move.sourceEffect === "round") {
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
				if (action.move.id === "round") {
					this.queue.prioritizeAction(action, move)
					return
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful"
	},
	"カタストロフィ": {
		num: 877,
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
		type: "Dark",
		contestType: "Tough"
	},
	"せいなるつるぎ": {
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
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"しんぴのまもり": {
		num: 219,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しんぴのまもり",
		pp: 25,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "safeguard",
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
				if (effect.id === "yawn") return
				if (
					effect.effectType === "Move" &&
					effect.infiltrates &&
					!target.isAlly(source)
				)
					return
				if (target !== source) {
					this.debug("interrupting setStatus")
					if (
						effect.name === "Synchronize" ||
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
					(status.id === "confusion" || status.id === "yawn") &&
					target !== source
				) {
					if (effect.effectType === "Move" && !effect.secondaries)
						this.add("-activate", target, "move: Safeguard")
					return null
				}
			},
			onSideStart(side, source) {
				if (source?.hasAbility("persistent")) {
					this.add("-sidestart", side, "Safeguard", "[persistent]")
				} else {
					this.add("-sidestart", side, "Safeguard")
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 3,
			onSideEnd(side) {
				this.add("-sideend", side, "Safeguard")
			}
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"しおづけ": {
		num: 864,
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
				this.add("-start", pokemon, "Salt Cure")
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(
					pokemon.baseMaxhp / (pokemon.hasType(["Water", "Steel"]) ? 4 : 8)
				)
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "Salt Cure")
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: "saltcure"
		},
		target: "normal",
		type: "Rock"
	},
	"すなかけ": {
		num: 28,
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
		type: "Ground",
		zMove: { boost: { evasion: 1 } },
		contestType: "Cute"
	},
	"ねっさのあらし": {
		num: 848,
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
				["raindance", "primordialsea"].includes(target.effectiveWeather())
			) {
				move.accuracy = true
			}
		},
		secondary: {
			chance: 20,
			status: "brn"
		},
		target: "allAdjacentFoes",
		type: "Ground"
	},
	"すなあらし": {
		num: 201,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "すなあらし",
		pp: 10,
		priority: 0,
		flags: { wind: 1 },
		weather: "Sandstorm",
		secondary: null,
		target: "all",
		type: "Rock",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"すなじごく": {
		num: 328,
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
		type: "Ground",
		contestType: "Clever"
	},
	"ねっとう": {
		num: 503,
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
		type: "Water",
		contestType: "Tough"
	},
	"スケイルショット": {
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
				spe: 1
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 }
	},
	"こわいかお": {
		num: 184,
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
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"ねっさのだいち": {
		num: 815,
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
		type: "Ground"
	},
	"ひっかく": {
		num: 10,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "ひっかく",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"いやなおと": {
		num: 103,
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
		type: "Normal",
		zMove: { boost: { atk: 1 } },
		contestType: "Clever"
	},
	"タネばくだん": {
		num: 402,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "タネばくだん",
		pp: 15,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough"
	},
	"シードフレア": {
		num: 465,
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
		type: "Grass",
		contestType: "Beautiful"
	},
	"ちきゅうなげ": {
		num: 69,
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
		type: "Fighting",
		maxMove: { basePower: 75 },
		contestType: "Tough"
	},
	"じばく": {
		num: 120,
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"シャドーボール": {
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
				spd: -1
			}
		},
		target: "normal",
		type: "Ghost",
		contestType: "Clever"
	},
	"シャドークロー": {
		num: 421,
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
		type: "Ghost",
		contestType: "Cool"
	},
	"シャドーダイブ": {
		num: 467,
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
		type: "Ghost",
		contestType: "Cool"
	},
	"シャドーパンチ": {
		num: 325,
		accuracy: true,
		basePower: 60,
		category: "物理",
		name: "シャドーパンチ",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever"
	},
	"かげうち": {
		num: 425,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "かげうち",
		pp: 30,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever"
	},
	"しっぽきり": {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "しっぽきり",
		pp: 10,
		priority: 0,
		flags: {},
		volatileStatus: "substitute",
		onTryHit(source) {
			if (!this.canSwitch(source.side) || source.volatiles["commanded"]) {
				this.add("-fail", source)
				return this.NOT_FAIL
			}
			if (source.volatiles["substitute"]) {
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
		selfSwitch: "shedtail",
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: { effect: "clearnegativeboost" }
	},
	"ぜったいれいど": {
		num: 329,
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
		type: "Ice",
		zMove: { basePower: 180 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful"
	},
	"シェルアームズ": {
		num: 801,
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
		type: "Poison"
	},
	"からをやぶる": {
		num: 504,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"たてこもる": {
		num: 842,
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
		type: "Steel"
	},
	"ギアチェンジ": {
		num: 508,
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
		type: "Steel",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"でんげきは": {
		num: 351,
		accuracy: true,
		basePower: 60,
		category: "特殊",
		name: "でんげきは",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool"
	},
	"すなあつめ": {
		num: 659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "すなあつめ",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onHit(pokemon) {
			let factor = 0.5
			if (this.field.isWeather("sandstorm")) {
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
		type: "Ground",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"スレッドトラップ": {
		num: 852,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "スレッドトラップ",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: "silktrap",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("stall")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "Protect")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["protect"] || move.category === "Status") {
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
						this.dex.getActiveMove("Silk Trap")
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
						this.dex.getActiveMove("Silk Trap")
					)
				}
			}
		},
		target: "self",
		type: "Bug"
	},
	"シンプルビーム": {
		num: 493,
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
				target.ability === "simple" ||
				target.ability === "truant"
			) {
				return false
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility("simple")
			if (oldAbility) {
				this.add("-ability", pokemon, "Simple", "[from] move: Simple Beam")
				return
			}
			return oldAbility
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"うたう": {
		num: 47,
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
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"スキルスワップ": {
		num: 285,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "スキルスワップ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1 },
		onTryHit(target, source) {
			const additionalBannedAbilities = [
				"hungerswitch",
				"illusion",
				"neutralizinggas",
				"wonderguard"
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"はいよるいちげき": {
		num: 806,
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
		type: "Bug"
	},
	"ゴッドバード": {
		num: 143,
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
		type: "Flying",
		contestType: "Cool"
	},
	"なまける": {
		num: 303,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"たたきつける": {
		num: 21,
		accuracy: 75,
		basePower: 80,
		category: "物理",
		name: "たたきつける",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"きりさく": {
		num: 163,
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
		type: "Normal",
		contestType: "Cool"
	},
	"ねむりごな": {
		num: 79,
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
		type: "Grass",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ねごと": {
		num: 214,
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
			return source.status === "slp" || source.hasAbility("comatose")
		},
		onHit(pokemon) {
			const moves = []
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id
				if (!moveid) continue
				const move = this.dex.moves.get(moveid)
				if (
					move.flags["nosleeptalk"] ||
					move.flags["charge"] ||
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
		type: "Normal",
		zMove: { effect: "crit2" },
		contestType: "Cute"
	},
	"ヘドロこうげき": {
		num: 124,
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
		type: "Poison",
		contestType: "Tough"
	},
	"ヘドロばくだん": {
		num: 188,
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
		type: "Poison",
		contestType: "Tough"
	},
	"ヘドロウェーブ": {
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
			status: "psn"
		},
		target: "allAdjacent",
		type: "Poison",
		contestType: "Tough"
	},
	"うちおとす": {
		num: 479,
		accuracy: 100,
		basePower: 50,
		category: "物理",
		name: "うちおとす",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		volatileStatus: "smackdown",
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false
				if (pokemon.hasType("Flying") || pokemon.hasAbility("levitate"))
					applies = true
				if (
					pokemon.hasItem("ironball") ||
					pokemon.volatiles["ingrain"] ||
					this.field.getPseudoWeather("gravity")
				)
					applies = false
				if (pokemon.removeVolatile("fly") || pokemon.removeVolatile("bounce")) {
					applies = true
					this.queue.cancelMove(pokemon)
					pokemon.removeVolatile("twoturnmove")
				}
				if (pokemon.volatiles["magnetrise"]) {
					applies = true
					delete pokemon.volatiles["magnetrise"]
				}
				if (pokemon.volatiles["telekinesis"]) {
					applies = true
					delete pokemon.volatiles["telekinesis"]
				}
				if (!applies) return false
				this.add("-start", pokemon, "Smack Down")
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile("fly") || pokemon.removeVolatile("bounce")) {
					this.queue.cancelMove(pokemon)
					pokemon.removeVolatile("twoturnmove")
					this.add("-start", pokemon, "Smack Down")
				}
			}
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough"
	},
	"スマートホーン": {
		num: 684,
		accuracy: true,
		basePower: 70,
		category: "物理",
		name: "スマートホーン",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool"
	},
	"スモッグ": {
		num: 123,
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
		type: "Poison",
		contestType: "Tough"
	},
	"えんまく": {
		num: 108,
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
		type: "Normal",
		zMove: { boost: { evasion: 1 } },
		contestType: "Clever"
	},
	"バークアウト": {
		num: 555,
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
		type: "Dark",
		contestType: "Tough"
	},
	"ねらいうち": {
		num: 745,
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
		type: "Water"
	},
	"いびき": {
		num: 173,
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "いびき",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		sleepUsable: true,
		onTry(source) {
			return source.status === "slp" || source.hasAbility("comatose")
		},
		secondary: {
			chance: 30,
			volatileStatus: "flinch"
		},
		target: "normal",
		type: "Normal",
		contestType: "Cute"
	},
	"ゆきげしき": {
		num: 883,
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
		type: "Ice"
	},
	"みずびたし": {
		num: 487,
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
		type: "Water",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"タマゴうみ": {
		num: 135,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ソーラービーム": {
		num: 76,
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
			if (["sunnyday", "desolateland"].includes(attacker.effectiveWeather())) {
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
				"raindance",
				"primordialsea",
				"sandstorm",
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
		type: "Grass",
		contestType: "Cool"
	},
	"ソーラーブレード": {
		num: 669,
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
			if (["sunnyday", "desolateland"].includes(attacker.effectiveWeather())) {
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
				"raindance",
				"primordialsea",
				"sandstorm",
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
		type: "Grass",
		contestType: "Cool"
	},
	"あくうせつだん": {
		num: 460,
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
		type: "Dragon",
		contestType: "Beautiful"
	},
	"スパーク": {
		num: 209,
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
		type: "Electric",
		contestType: "Cool"
	},
	"スピードスワップ": {
		num: 683,
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
		type: "Psychic",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"ハバネロエキス": {
		num: 858,
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
		type: "Grass"
	},
	"まきびし": {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "まきびし",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, nonsky: 1, mustpressure: 1 },
		sideCondition: "spikes",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add("-sidestart", side, "Spikes")
				this.effectState.layers = 1
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false
				this.add("-sidestart", side, "Spikes")
				this.effectState.layers++
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots")) return
				const damageAmounts = [0, 3, 4, 6] // 1/8, 1/6, 1/4
				this.damage(
					(damageAmounts[this.effectState.layers] * pokemon.maxhp) / 24
				)
			}
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"ニードルガード": {
		num: 596,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ニードルガード",
		pp: 10,
		priority: 4,
		flags: { noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: "spikyshield",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent("StallMove", pokemon)
		},
		onHit(pokemon) {
			pokemon.addVolatile("stall")
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add("-singleturn", target, "move: Protect")
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags["protect"]) {
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
		type: "Grass",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"ホイールスピン": {
		num: 859,
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
		type: "Steel"
	},
	"ソウルクラッシュ": {
		num: 789,
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
		type: "Fairy"
	},
	"かげぬい": {
		num: 662,
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
		type: "Ghost",
		contestType: "Tough"
	},
	"はきだす": {
		num: 255,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon) {
			if (!pokemon.volatiles["stockpile"]?.layers) return false
			return pokemon.volatiles["stockpile"].layers * 100
		},
		category: "特殊",
		name: "はきだす",
		pp: 10,
		priority: 0,
		flags: { protect: 1 },
		onTry(source) {
			return !!source.volatiles["stockpile"]
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile("stockpile")
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"うらみ": {
		num: 180,
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
		type: "Ghost",
		zMove: { effect: "heal" },
		contestType: "Tough"
	},
	"はねる": {
		num: 150,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "はねる",
		pp: 40,
		priority: 0,
		flags: { gravity: 1 },
		onTry(source, target, move) {
			// Additional Gravity check for Z-move variant
			if (this.field.getPseudoWeather("Gravity")) {
				this.add("cant", source, "move: Gravity", move)
				return null
			}
		},
		onTryHit(target, source) {
			this.add("-nothing")
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: { boost: { atk: 3 } },
		contestType: "Cute"
	},
	"キノコのほうし": {
		num: 147,
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
		type: "Grass",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"はるのあらし": {
		num: 831,
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
		type: "Fairy"
	},
	"ステルスロック": {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ステルスロック",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, mustpressure: 1 },
		sideCondition: "stealthrock",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add("-sidestart", side, "move: Stealth Rock")
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem("heavydutyboots")) return
				const typeMod = this.clampIntRange(
					pokemon.runEffectiveness(this.dex.getActiveMove("stealthrock")),
					-6,
					6
				)
				this.damage((pokemon.maxhp * Math.pow(2, typeMod)) / 8)
			}
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: { boost: { def: 1 } },
		contestType: "Cool"
	},
	"スチームバースト": {
		num: 592,
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
		type: "Water",
		contestType: "Beautiful"
	},
	"てっていこうせん": {
		num: 796,
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
					this.dex.conditions.get("Steel Beam"),
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
		type: "Steel"
	},
	"アイアンローラー": {
		num: 798,
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
		type: "Steel"
	},
	"はがねのつばさ": {
		num: 211,
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
		type: "Steel",
		contestType: "Cool"
	},
	"ねばねばネット": {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねばねばネット",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1 },
		sideCondition: "stickyweb",
		condition: {
			onSideStart(side) {
				this.add("-sidestart", side, "move: Sticky Web")
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots")) return
				this.add("-activate", pokemon, "move: Sticky Web")
				this.boost(
					{ spe: -1 },
					pokemon,
					this.effectState.source,
					this.dex.getActiveMove("stickyweb")
				)
			}
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"たくわえる": {
		num: 254,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "たくわえる",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		onTry(source) {
			if (
				source.volatiles["stockpile"] &&
				source.volatiles["stockpile"].layers >= 3
			)
				return false
		},
		volatileStatus: "stockpile",
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectState.layers = 1
				this.effectState.def = 0
				this.effectState.spd = 0
				this.add("-start", target, "stockpile" + this.effectState.layers)
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd]
				this.boost({ def: 1, spd: 1 }, target, target)
				if (curDef !== target.boosts.def) this.effectState.def--
				if (curSpD !== target.boosts.spd) this.effectState.spd--
			},
			onRestart(target) {
				if (this.effectState.layers >= 3) return false
				this.effectState.layers++
				this.add("-start", target, "stockpile" + this.effectState.layers)
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
				this.add("-end", target, "Stockpile")
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
		type: "Normal",
		zMove: { effect: "heal" },
		contestType: "Tough"
	},
	"ふみつけ": {
		num: 23,
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
		type: "Normal",
		contestType: "Tough"
	},
	"じだんだ": {
		num: 707,
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
		type: "Ground",
		contestType: "Tough"
	},
	"がんせきアックス": {
		num: 830,
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
					side.addSideCondition("stealthrock")
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition("stealthrock")
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Rock"
	},
	"ストーンエッジ": {
		num: 444,
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
		type: "Rock",
		contestType: "Tough"
	},
	"アシストパワー": {
		num: 500,
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
		type: "Psychic",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Clever"
	},
	"ワンダースチーム": {
		num: 790,
		accuracy: 95,
		basePower: 90,
		category: "特殊",
		name: "ワンダースチーム",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "confusion"
		},
		target: "normal",
		type: "Fairy"
	},
	"かいりき": {
		num: 70,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "かいりき",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"ちからをすいとる": {
		num: 668,
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
		type: "Grass",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"いとをはく": {
		num: 81,
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
		type: "Bug",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"わるあがき": {
		num: 165,
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
		type: "Normal",
		contestType: "Tough"
	},
	"むしのていこう": {
		num: 522,
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
		type: "Bug",
		contestType: "Cute"
	},
	"ほおばる": {
		num: 747,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ほおばる",
		pp: 10,
		priority: 0,
		flags: { snatch: 1 },
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isBerry) pokemon.disableMove("stuffcheeks")
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
		type: "Normal"
	},
	"しびれごな": {
		num: 78,
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
		type: "Grass",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"みがわり": {
		num: 164,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "みがわり",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, nonsky: 1 },
		volatileStatus: "substitute",
		onTryHit(source) {
			if (source.volatiles["substitute"]) {
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
				if (effect?.id === "shedtail") {
					this.add("-start", target, "Substitute", "[from] move: Shed Tail")
				} else {
					this.add("-start", target, "Substitute")
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
				if (damage > target.volatiles["substitute"].hp) {
					damage = target.volatiles["substitute"].hp
				}
				target.volatiles["substitute"].hp -= damage
				source.lastDamage = damage
				if (target.volatiles["substitute"].hp <= 0) {
					if (move.ohko) this.add("-ohko")
					target.removeVolatile("substitute")
				} else {
					this.add("-activate", target, "move: Substitute", "[damage]")
				}
				if (move.recoil || move.id === "chloroblast") {
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
				this.add("-end", target, "Substitute")
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"ふいうち": {
		num: 389,
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
		type: "Dark",
		contestType: "Clever"
	},
	"にほんばれ": {
		num: 241,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "にほんばれ",
		pp: 5,
		priority: 0,
		flags: {},
		weather: "sunnyday",
		secondary: null,
		target: "all",
		type: "Fire",
		zMove: { boost: { spe: 1 } },
		contestType: "Beautiful"
	},
	"いかりのまえば": {
		num: 162,
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
		type: "Normal",
		contestType: "Tough"
	},
	"ばかぢから": {
		num: 276,
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
		type: "Fighting",
		contestType: "Tough"
	},
	"ちょうおんぱ": {
		num: 48,
		accuracy: 55,
		basePower: 0,
		category: "Status",
		name: "ちょうおんぱ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
		volatileStatus: "confusion",
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"なみのり": {
		num: 57,
		accuracy: 100,
		basePower: 90,
		category: "特殊",
		name: "なみのり",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1 },
		secondary: null,
		target: "allAdjacent",
		type: "Water",
		contestType: "Beautiful"
	},
	"すいりゅうれんだ": {
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
		target: "normal",
		type: "Water",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 }
	},
	"いばる": {
		num: 207,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "いばる",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
		volatileStatus: "confusion",
		boosts: {
			atk: 2
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Cute"
	},
	"のみこむ": {
		num: 256,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "のみこむ",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		onTry(source) {
			return !!source.volatiles["stockpile"]
		},
		onHit(pokemon) {
			const healAmount = [0.25, 0.5, 1]
			const success = !!this.heal(
				this.modify(
					pokemon.maxhp,
					healAmount[pokemon.volatiles["stockpile"].layers - 1]
				)
			)
			if (!success) this.add("-fail", pokemon, "heal")
			pokemon.removeVolatile("stockpile")
			return success || this.NOT_FAIL
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Tough"
	},
	"てんしのキッス": {
		num: 186,
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "てんしのキッス",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "confusion",
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"あまいかおり": {
		num: 230,
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
		type: "Normal",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Cute"
	},
	"スピードスター": {
		num: 129,
		accuracy: true,
		basePower: 60,
		category: "特殊",
		name: "スピードスター",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Cool"
	},
	"すりかえ": {
		num: 415,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "すりかえ",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
		onTryImmunity(target) {
			return !target.hasAbility("stickyhold")
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
		type: "Dark",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"つるぎのまい": {
		num: 14,
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
		type: "Normal",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"こうごうせい": {
		num: 235,
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
				case "sunnyday":
				case "desolateland":
					factor = 0.667
					break
				case "raindance":
				case "primordialsea":
				case "sandstorm":
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
		type: "Grass",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Clever"
	},
	"みずあめボム": {
		num: 903,
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
				this.add("-start", pokemon, "Syrup Bomb")
			},
			onResidualOrder: 14,
			onResidual() {
				this.boost({ spe: -1 })
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "Syrup Bomb", "[silent]")
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: "syrupbomb"
		},
		target: "normal",
		type: "Grass"
	},
	"たいあたり": {
		num: 33,
		accuracy: 100,
		basePower: 40,
		category: "物理",
		name: "たいあたり",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"ほたるび": {
		num: 294,
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
		type: "Bug",
		zMove: { effect: "clearnegativeboost" },
		contestType: "Beautiful"
	},
	"スイープビンタ": {
		num: 541,
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
		type: "Normal",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		contestType: "Cute"
	},
	"しっぽをふる": {
		num: 39,
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
		type: "Normal",
		zMove: { boost: { atk: 1 } },
		contestType: "Cute"
	},
	"おいかぜ": {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "おいかぜ",
		pp: 15,
		priority: 0,
		flags: { snatch: 1, wind: 1 },
		sideCondition: "tailwind",
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
		type: "Flying",
		zMove: { effect: "crit2" },
		contestType: "Cool"
	},
	"とっしん": {
		num: 36,
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
		type: "Normal",
		contestType: "Tough"
	},
	"ブレイブチャージ": {
		num: 850,
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
		type: "Psychic"
	},
	"タールショット": {
		num: 749,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "タールショット",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "tarshot",
		condition: {
			onStart(pokemon) {
				if (pokemon.terastallized) return false
				this.add("-start", pokemon, "Tar Shot")
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
		type: "Rock"
	},
	"ちょうはつ": {
		num: 269,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "ちょうはつ",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "taunt",
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
		type: "Dark",
		zMove: { boost: { atk: 1 } },
		contestType: "Clever"
	},
	"なみだめ": {
		num: 715,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"おちゃかい": {
		num: 752,
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
		type: "Normal"
	},
	"フラフラダンス": {
		num: 298,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "フラフラダンス",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, dance: 1 },
		volatileStatus: "confusion",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		zMove: { boost: { spa: 1 } },
		contestType: "Cute"
	},
	"テレポート": {
		num: 100,
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
		type: "Psychic",
		zMove: { effect: "heal" },
		contestType: "Cool"
	},
	"テラバースト": {
		num: 851,
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
		type: "Normal"
	},
	"だいちのはどう": {
		num: 805,
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
				case "electricterrain":
					move.type = "Electric"
					break
				case "grassyterrain":
					move.type = "Grass"
					break
				case "mistyterrain":
					move.type = "Fairy"
					break
				case "psychicterrain":
					move.type = "Psychic"
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
		type: "Normal",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 }
	},
	"どろぼう": {
		num: 168,
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
		type: "Dark",
		contestType: "Tough"
	},
	"あばれる": {
		num: 37,
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
		type: "Normal",
		contestType: "Tough"
	},
	"じごくづき": {
		num: 675,
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
				this.add("-start", target, "Throat Chop", "[silent]")
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
				this.add("-end", target, "Throat Chop", "[silent]")
			}
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile("throatchop")
			}
		},
		target: "normal",
		type: "Dark",
		contestType: "Clever"
	},
	"かみなり": {
		num: 87,
		accuracy: 70,
		basePower: 110,
		category: "特殊",
		name: "かみなり",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
				case "raindance":
				case "primordialsea":
					move.accuracy = true
					break
				case "sunnyday":
				case "desolateland":
					move.accuracy = 50
					break
			}
		},
		secondary: {
			chance: 30,
			status: "par"
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool"
	},
	"10まんボルト": {
		num: 85,
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
		type: "Electric",
		contestType: "Cool"
	},
	"サンダープリズン": {
		num: 819,
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
		type: "Electric"
	},
	"かみなりのキバ": {
		num: 422,
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
		type: "Electric",
		contestType: "Cool"
	},
	"らいめいげり": {
		num: 823,
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
		type: "Fighting"
	},
	"かみなりパンチ": {
		num: 9,
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
		type: "Electric",
		contestType: "Cool"
	},
	"でんきショック": {
		num: 84,
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
		type: "Electric",
		contestType: "Cool"
	},
	"でんじは": {
		num: 86,
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
		type: "Electric",
		zMove: { boost: { spd: 1 } },
		contestType: "Cool"
	},
	"くすぐる": {
		num: 321,
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
		type: "Normal",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"おかたづけ": {
		num: 882,
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
				if (active.removeVolatile("substitute")) success = true
			}
			const removeAll = [
				"spikes",
				"toxicspikes",
				"stealthrock",
				"stickyweb",
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
		type: "Normal"
	},
	"フレアソング": {
		num: 871,
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
		type: "Fire",
		contestType: "Beautiful"
	},
	"いちゃもん": {
		num: 259,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "いちゃもん",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
		volatileStatus: "torment",
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (pokemon.volatiles["dynamax"]) {
					delete pokemon.volatiles["torment"]
					return false
				}
				if (effect?.id === "gmaxmeltdown") this.effectState.duration = 3
				this.add("-start", pokemon, "Torment")
			},
			onEnd(pokemon) {
				this.add("-end", pokemon, "Torment")
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== "struggle")
					pokemon.disableMove(pokemon.lastMove.id)
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"どくどく": {
		num: 92,
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
		type: "Poison",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくびし": {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "どくびし",
		pp: 20,
		priority: 0,
		flags: { reflectable: 1, nonsky: 1, mustpressure: 1 },
		sideCondition: "toxicspikes",
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
					pokemon.side.removeSideCondition("toxicspikes")
				} else if (
					pokemon.hasType("Steel") ||
					pokemon.hasItem("heavydutyboots")
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
		type: "Poison",
		zMove: { boost: { def: 1 } },
		contestType: "Clever"
	},
	"どくのいと": {
		num: 672,
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
		type: "Poison",
		zMove: { boost: { spe: 1 } },
		contestType: "Tough"
	},
	"くさわけ": {
		num: 885,
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
		type: "Grass",
		contestType: "Cool"
	},
	"へんしん": {
		num: 144,
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
		type: "Normal",
		zMove: { effect: "heal" },
		contestType: "Clever"
	},
	"トライアタック": {
		num: 161,
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
		type: "Normal",
		contestType: "Beautiful"
	},
	"トリック": {
		num: 271,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "トリック",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
		onTryImmunity(target) {
			return !target.hasAbility("stickyhold")
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
		type: "Psychic",
		zMove: { boost: { spe: 2 } },
		contestType: "Clever"
	},
	"トリックルーム": {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "トリックルーム",
		pp: 5,
		priority: -7,
		flags: { mirror: 1 },
		pseudoWeather: "trickroom",
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
				this.field.removePseudoWeather("trickroom")
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
		type: "Psychic",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Clever"
	},
	"3ぼんのや": {
		num: 843,
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
		type: "Fighting"
	},
	"トリプルアクセル": {
		num: 813,
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
		type: "Ice",
		zMove: { basePower: 120 },
		maxMove: { basePower: 140 }
	},
	"トリプルダイブ": {
		num: 865,
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
		type: "Water"
	},
	"トロピカルキック": {
		num: 688,
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
		type: "Grass",
		contestType: "Cute"
	},
	"ツインビーム": {
		num: 888,
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
		type: "Psychic",
		contestType: "Cool"
	},
	"たつまき": {
		num: 239,
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
		type: "Dragon",
		contestType: "Cool"
	},
	"とんぼがえり": {
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
		target: "normal",
		type: "Bug",
		contestType: "Cute"
	},
	"さわぐ": {
		num: 253,
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
			volatileStatus: "uproar"
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
				this.add("-start", target, "Uproar")
			},
			onResidual(target) {
				if (target.volatiles["throatchop"]) {
					target.removeVolatile("uproar")
					return
				}
				if (target.lastMove && target.lastMove.id === "struggle") {
					// don't lock
					delete target.volatiles["uproar"]
				}
				this.add("-start", target, "Uproar", "[upkeep]")
			},
			onResidualOrder: 28,
			onResidualSubOrder: 1,
			onEnd(target) {
				this.add("-end", target, "Uproar")
			},
			onLockMove: "uproar",
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
		type: "Normal",
		contestType: "Cute"
	},
	"しんくうは": {
		num: 410,
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "しんくうは",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool"
	},
	"Vジェネレート": {
		num: 557,
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
		type: "Fire",
		zMove: { basePower: 220 },
		contestType: "Cool"
	},
	"ベノムショック": {
		num: 474,
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
		type: "Poison",
		contestType: "Beautiful"
	},
	"しょうりのまい": {
		num: 837,
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
		type: "Fighting"
	},
	"つるのムチ": {
		num: 22,
		accuracy: 100,
		basePower: 45,
		category: "物理",
		name: "つるのムチ",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool"
	},
	"はさむ": {
		num: 11,
		accuracy: 100,
		basePower: 55,
		category: "物理",
		name: "はさむ",
		pp: 30,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough"
	},
	"ボルトチェンジ": {
		num: 521,
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
		type: "Electric",
		contestType: "Cool"
	},
	"ボルテッカー": {
		num: 344,
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
		type: "Electric",
		contestType: "Cool"
	},
	"たきのぼり": {
		num: 127,
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
		type: "Water",
		contestType: "Tough"
	},
	"みずでっぽう": {
		num: 55,
		accuracy: 100,
		basePower: 40,
		category: "特殊",
		name: "みずでっぽう",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cute"
	},
	"みずのちかい": {
		num: 518,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (["firepledge", "grasspledge"].includes(move.sourceEffect)) {
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
					["firepledge", "grasspledge"].includes(otherMove.id)
				) {
					this.queue.prioritizeAction(action, move)
					this.add("-waiting", source, otherMoveUser)
					return null
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === "grasspledge") {
				move.type = "Grass"
				move.forceSTAB = true
				move.sideCondition = "grasspledge"
			}
			if (move.sourceEffect === "firepledge") {
				move.type = "Water"
				move.forceSTAB = true
				move.self = { sideCondition: "waterpledge" }
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add("-sidestart", targetSide, "Water Pledge")
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 7,
			onSideEnd(targetSide) {
				this.add("-sideend", targetSide, "Water Pledge")
			},
			onModifyMove(move, pokemon) {
				if (move.secondaries && move.id !== "secretpower") {
					this.debug("doubling secondary chance")
					for (const secondary of move.secondaries) {
						if (
							pokemon.hasAbility("serenegrace") &&
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
		type: "Water",
		contestType: "Beautiful"
	},
	"みずのはどう": {
		num: 352,
		accuracy: 100,
		basePower: 60,
		category: "特殊",
		name: "みずのはどう",
		pp: 20,
		priority: 0,
		flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
		secondary: {
			chance: 20,
			volatileStatus: "confusion"
		},
		target: "any",
		type: "Water",
		contestType: "Beautiful"
	},
	"みずしゅりけん": {
		num: 594,
		accuracy: 100,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			if (
				pokemon.species.name === "Greninja-Ash" &&
				pokemon.hasAbility("battlebond") &&
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
		type: "Water",
		contestType: "Cool"
	},
	"しおふき": {
		num: 323,
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
		type: "Water",
		contestType: "Beautiful"
	},
	"ウェーブタックル": {
		num: 834,
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
		type: "Water"
	},
	"ウェザーボール": {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "特殊",
		name: "ウェザーボール",
		pp: 10,
		priority: 0,
		flags: { bullet: 1, protect: 1, mirror: 1 },
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
				case "sunnyday":
				case "desolateland":
					move.type = "Fire"
					break
				case "raindance":
				case "primordialsea":
					move.type = "Water"
					break
				case "sandstorm":
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
				case "sunnyday":
				case "desolateland":
					move.basePower *= 2
					break
				case "raindance":
				case "primordialsea":
					move.basePower *= 2
					break
				case "sandstorm":
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
		type: "Normal",
		zMove: { basePower: 160 },
		maxMove: { basePower: 130 },
		contestType: "Beautiful"
	},
	"うずしお": {
		num: 250,
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
		type: "Water",
		contestType: "Beautiful"
	},
	"ふきとばし": {
		num: 18,
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
		type: "Normal",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"あんこくきょうだ": {
		num: 817,
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
		type: "Dark"
	},
	"ワイドガード": {
		num: 469,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ワイドガード",
		pp: 10,
		priority: 3,
		flags: { snatch: 1 },
		sideCondition: "wideguard",
		onTry() {
			return !!this.queue.willAct()
		},
		onHitSide(side, source) {
			source.addVolatile("stall")
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add("-singleturn", source, "Wide Guard")
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
		type: "Rock",
		zMove: { boost: { def: 1 } },
		contestType: "Tough"
	},
	"かみなりあらし": {
		num: 847,
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
				["raindance", "primordialsea"].includes(target.effectiveWeather())
			) {
				move.accuracy = true
			}
		},
		secondary: {
			chance: 20,
			status: "par"
		},
		target: "allAdjacentFoes",
		type: "Electric"
	},
	"ワイルドボルト": {
		num: 528,
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
		type: "Electric",
		contestType: "Tough"
	},
	"おにび": {
		num: 261,
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
		type: "Fire",
		zMove: { boost: { atk: 1 } },
		contestType: "Beautiful"
	},
	"つばさでうつ": {
		num: 17,
		accuracy: 100,
		basePower: 60,
		category: "物理",
		name: "つばさでうつ",
		pp: 35,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool"
	},
	"ねがいごと": {
		num: 273,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ねがいごと",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		slotCondition: "Wish",
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
		type: "Normal",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute"
	},
	"からにこもる": {
		num: 110,
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
		type: "Water",
		zMove: { boost: { def: 1 } },
		contestType: "Cute"
	},
	"ワンダールーム": {
		num: 472,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "ワンダールーム",
		pp: 10,
		priority: 0,
		flags: { mirror: 1 },
		pseudoWeather: "wonderroom",
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
				this.field.removePseudoWeather("wonderroom")
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
		type: "Psychic",
		zMove: { boost: { spd: 1 } },
		contestType: "Clever"
	},
	"ウッドハンマー": {
		num: 452,
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
		type: "Grass",
		contestType: "Tough"
	},
	"ふるいたてる": {
		num: 526,
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
		type: "Normal",
		zMove: { boost: { atk: 1 } },
		contestType: "Tough"
	},
	"なやみのタネ": {
		num: 388,
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
			if (target.ability === "truant" || target.ability === "insomnia") {
				return false
			}
		},
		onTryHit(target) {
			if (target.getAbility().isPermanent) {
				return false
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility("insomnia")
			if (oldAbility) {
				this.add("-ability", pokemon, "Insomnia", "[from] move: Worry Seed")
				if (pokemon.status === "slp") {
					pokemon.cureStatus()
				}
				return
			}
			return oldAbility
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: { boost: { spe: 1 } },
		contestType: "Clever"
	},
	"まきつく": {
		num: 35,
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
		type: "Normal",
		contestType: "Tough"
	},
	"シザークロス": {
		num: 404,
		accuracy: 100,
		basePower: 80,
		category: "物理",
		name: "シザークロス",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool"
	},
	"あくび": {
		num: 281,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "あくび",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1 },
		volatileStatus: "yawn",
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
		type: "Normal",
		zMove: { boost: { spe: 1 } },
		contestType: "Cute"
	},
	"でんじほう": {
		num: 192,
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
		type: "Electric",
		contestType: "Cool"
	},
	"しねんのずつき": {
		num: 428,
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
		type: "Psychic",
		contestType: "Clever"
	},
	"びりびりちくちく": {
		num: 716,
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
		type: "Electric",
		contestType: "Cool"
	},
}