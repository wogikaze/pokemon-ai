const Items = {
	とくせいガード: {
		name: "とくせいガード",
		spritenum: 746,
		fling: {
			basePower: 30
		},
		ignoreKlutz: true,
		// Neutralizing Gas protection implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
		// and in Neutralizing Gas itself within data/abilities.ts
		onSetAbility(ability, target, source, effect) {
			if (
				effect &&
				effect.effectType === "Ability" &&
				effect.name !== "Trace"
			) {
				this.add("-ability", source, effect)
			}
			this.add("-block", target, "item: とくせいガード")
			return null
		},
		// Mold Breaker protection implemented in Battle.suppressingAbility() within sim/battle.ts
		num: 1881,
		gen: 9
	},
	きゅうこん: {
		name: "きゅうこん",
		spritenum: 2,
		fling: {
			basePower: 30
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === "Water") {
				target.useItem()
			}
		},
		boosts: {
			spa: 1
		},
		num: 545,
		gen: 5
	},
	だいこんごうだま: {
		name: "だいこんごうだま",
		spritenum: 741,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				user.baseSpecies.num === 483 &&
				(move.type === "Steel" || move.type === "Dragon")
			) {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 483 || pokemon.baseSpecies.num === 483) {
				return false
			}
			return true
		},
		forcedForme: "Dialga-Origin",
		itemUser: ["Dialga-Origin"],
		num: 1777,
		gen: 8
	},
	こんごうだま: {
		name: "こんごうだま",
		spritenum: 4,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				user.baseSpecies.num === 483 &&
				(move.type === "Steel" || move.type === "Dragon")
			) {
				return this.chainModify([4915, 4096])
			}
		},
		itemUser: ["Dialga"],
		num: 135,
		gen: 4
	},
	ビビリだま: {
		name: "ビビリだま",
		spritenum: 660,
		fling: {
			basePower: 30
		},
		onAfterBoost(boost, target, source, effect) {
			// ビビリだま activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
			if (target.boosts["spe"] === 6 || boost.atk === 0) {
				return
			}
			if (effect.name === "Intimidate") {
				target.useItem()
			}
		},
		boosts: {
			spe: 1
		},
		num: 846,
		gen: 7
	},
	バンジのみ: {
		name: "バンジのみ",
		spritenum: 5,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 3
				)
			)
				return false
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3)
			if (pokemon.getNature().minus === "spd") {
				pokemon.addVolatile("confusion")
			}
		},
		num: 162,
		gen: 3
	},
	ふうせん: {
		name: "ふうせん",
		spritenum: 6,
		fling: {
			basePower: 10
		},
		onStart(target) {
			if (!target.ignoringItem() && !this.field.getPseudoWeather("gravity")) {
				this.add("-item", target, "ふうせん")
			}
		},
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		onDamagingHit(damage, target, source, move) {
			this.add("-enditem", target, "ふうせん")
			target.item = ""
			target.itemState = { id: "", target }
			this.runEvent(
				"AfterUseItem",
				target,
				null,
				null,
				this.dex.items.get("ふうせん")
			)
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug("effect: " + effect.id)
			if (effect.effectType === "Move") {
				this.add("-enditem", target, "ふうせん")
				target.item = ""
				target.itemState = { id: "", target }
				this.runEvent(
					"AfterUseItem",
					target,
					null,
					null,
					this.dex.items.get("ふうせん")
				)
			}
		},
		num: 541,
		gen: 5
	},
	ズアのみ: {
		name: "ズアのみ",
		spritenum: 10,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ground"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ spd: 1 })
		},
		num: 205,
		gen: 3
	},
	ナナシのみ: {
		name: "ナナシのみ",
		spritenum: 13,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice"
		},
		onUpdate(pokemon) {
			if (pokemon.status === "frz") {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			if (pokemon.status === "frz") {
				pokemon.cureStatus()
			}
		},
		num: 153,
		gen: 3
	},
	とつげきチョッキ: {
		name: "とつげきチョッキ",
		spritenum: 581,
		fling: {
			basePower: 80
		},
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			return this.chainModify(1.5)
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.move).category === "Status") {
					pokemon.disableMove(moveSlot.id)
				}
			}
		},
		num: 640,
		gen: 6
	},
	リリバのみ: {
		name: "リリバのみ",
		spritenum: 17,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Steel"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Steel" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 199,
		gen: 4
	},
	おおきなねっこ: {
		name: "おおきなねっこ",
		spritenum: 29,
		fling: {
			basePower: 10
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ["drain", "leechseed", "ingrain", "aquaring", "strengthsap"]
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096])
			}
		},
		num: 296,
		gen: 4
	},
	しめつけバンド: {
		name: "しめつけバンド",
		spritenum: 31,
		fling: {
			basePower: 30
		},
		// implemented in statuses
		num: 544,
		gen: 5
	},
	くろおび: {
		name: "くろおび",
		spritenum: 32,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fighting") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 241,
		gen: 2
	},
	くろいメガネ: {
		name: "くろいメガネ",
		spritenum: 35,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Dark") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 240,
		gen: 2
	},
	くろいヘドロ: {
		name: "くろいヘドロ",
		spritenum: 34,
		fling: {
			basePower: 30
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hasType("Poison")) {
				this.heal(pokemon.baseMaxhp / 16)
			} else {
				this.damage(pokemon.baseMaxhp / 8)
			}
		},
		num: 281,
		gen: 4
	},
	からぶりほけん: {
		name: "からぶりほけん",
		spritenum: 716,
		fling: {
			basePower: 80
		},
		// Item activation located in scripts.js
		num: 1121,
		gen: 8
	},
	ブーストエナジー: {
		name: "ブーストエナジー",
		spritenum: 745,
		fling: {
			basePower: 30
		},
		onStart() {
			this.effectState.started = true
		},
		onUpdate(pokemon) {
			if (!this.effectState.started || pokemon.transformed) return
			if (this.queue.peek(true)?.choice === "runSwitch") return

			if (
				pokemon.hasAbility("protosynthesis") &&
				!this.field.isWeather("sunnyday") &&
				pokemon.useItem()
			) {
				pokemon.addVolatile("protosynthesis")
			}
			if (
				pokemon.hasAbility("quarkdrive") &&
				!this.field.isTerrain("electricterrain") &&
				pokemon.useItem()
			) {
				pokemon.addVolatile("quarkdrive")
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false
			return true
		},
		num: 1880,
		gen: 9
	},
	ひかりのこな: {
		name: "ひかりのこな",
		spritenum: 51,
		fling: {
			basePower: 10
		},
		onModifyAccuracyPriority: -2,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== "number") return
			this.debug("ひかりのこな - decreasing accuracy")
			return this.chainModify([3686, 4096])
		},
		num: 213,
		gen: 2
	},
	じゅうでんち: {
		name: "じゅうでんち",
		spritenum: 60,
		fling: {
			basePower: 30
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === "Electric") {
				target.useItem()
			}
		},
		boosts: {
			atk: 1
		},
		num: 546,
		gen: 5
	},
	もくたん: {
		name: "もくたん",
		spritenum: 61,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fire") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 249,
		gen: 2
	},
	ヨロギのみ: {
		name: "ヨロギのみ",
		spritenum: 62,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Rock" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 195,
		gen: 4
	},
	クラボのみ: {
		name: "クラボのみ",
		spritenum: 63,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire"
		},
		onUpdate(pokemon) {
			if (pokemon.status === "par") {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			if (pokemon.status === "par") {
				pokemon.cureStatus()
			}
		},
		num: 149,
		gen: 3
	},
	カゴのみ: {
		name: "カゴのみ",
		spritenum: 65,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water"
		},
		onUpdate(pokemon) {
			if (pokemon.status === "slp") {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			if (pokemon.status === "slp") {
				pokemon.cureStatus()
			}
		},
		num: 150,
		gen: 3
	},
	ホズのみ: {
		name: "ホズのみ",
		spritenum: 66,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Normal"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				move.type === "Normal" &&
				(!target.volatiles["substitute"] ||
					move.flags["bypasssub"] ||
					(move.infiltrates && this.gen >= 6))
			) {
				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 200,
		gen: 4
	},
	こだわりハチマキ: {
		name: "こだわりハチマキ",
		spritenum: 68,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (pokemon.volatiles["choicelock"]) {
				this.debug("removing choicelock: " + pokemon.volatiles["choicelock"])
			}
			pokemon.removeVolatile("choicelock")
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile("choicelock")
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles["dynamax"]) return
			return this.chainModify(1.5)
		},
		isChoice: true,
		num: 220,
		gen: 3
	},
	こだわりスカーフ: {
		name: "こだわりスカーフ",
		spritenum: 69,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (pokemon.volatiles["choicelock"]) {
				this.debug("removing choicelock: " + pokemon.volatiles["choicelock"])
			}
			pokemon.removeVolatile("choicelock")
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile("choicelock")
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.volatiles["dynamax"]) return
			return this.chainModify(1.5)
		},
		isChoice: true,
		num: 287,
		gen: 4
	},
	こだわりメガネ: {
		name: "こだわりメガネ",
		spritenum: 70,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (pokemon.volatiles["choicelock"]) {
				this.debug("removing choicelock: " + pokemon.volatiles["choicelock"])
			}
			pokemon.removeVolatile("choicelock")
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile("choicelock")
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles["dynamax"]) return
			return this.chainModify(1.5)
		},
		isChoice: true,
		num: 297,
		gen: 4
	},
	ヨプのみ: {
		name: "ヨプのみ",
		spritenum: 71,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Fighting" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 189,
		gen: 4
	},
	クリアチャーム: {
		name: "クリアチャーム",
		spritenum: 747,
		fling: {
			basePower: 30
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return
			let showMsg = false
			let i
			for (i in boost) {
				if (boost[i] < 0) {
					delete boost[i]
					showMsg = true
				}
			}
			if (showMsg && !effect.secondaries && effect.id !== "octolock") {
				this.add(
					"-fail",
					target,
					"unboost",
					"[from] item: クリアチャーム",
					"[of] " + target
				)
			}
		},
		num: 1882,
		gen: 9
	},
	バコウのみ: {
		name: "バコウのみ",
		spritenum: 76,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Flying" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 192,
		gen: 4
	},
	ナモのみ: {
		name: "ナモのみ",
		spritenum: 78,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Dark" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 198,
		gen: 4
	},
	いしずえのめん: {
		name: "いしずえのめん",
		spritenum: 758,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith("Ogerpon-Cornerstone")) {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === "Ogerpon") return false
			return true
		},
		forcedForme: "Ogerpon-Cornerstone",
		itemUser: ["Ogerpon-Cornerstone"],
		num: 2406,
		gen: 9
	},
	おんみつマント: {
		name: "おんみつマント",
		spritenum: 750,
		fling: {
			basePower: 30
		},
		onModifySecondaries(secondaries) {
			this.debug("おんみつマント prevent secondary")
			return secondaries.filter(effect => !!(effect.self || effect.dustproof))
		},
		num: 1885,
		gen: 9
	},
	イバンのみ: {
		name: "イバンのみ",
		spritenum: 86,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ghost"
		},
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon) {
			if (
				priority <= 0 &&
				(pokemon.hp <= pokemon.maxhp / 4 ||
					(pokemon.hp <= pokemon.maxhp / 2 &&
						pokemon.hasAbility("gluttony") &&
						pokemon.abilityState.gluttony))
			) {
				if (pokemon.eatItem()) {
					this.add("-activate", pokemon, "item: イバンのみ", "[consumed]")
					return 0.1
				}
			}
		},
		onEat() { },
		num: 210,
		gen: 4
	},
	しめったいわ: {
		name: "しめったいわ",
		spritenum: 88,
		fling: {
			basePower: 60
		},
		num: 285,
		gen: 4
	},
	あかいいと: {
		name: "あかいいと",
		spritenum: 95,
		fling: {
			basePower: 10
		},
		onAttractPriority: -100,
		onAttract(target, source) {
			this.debug("attract intercepted: " + target + " from " + source)
			if (!source || source === target) return
			if (!source.volatiles["attract"]) source.addVolatile("attract", target)
		},
		num: 280,
		gen: 4
	},
	りゅうのプレート: {
		name: "りゅうのプレート",
		spritenum: 105,
		onPlate: "Dragon",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Dragon") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Dragon",
		num: 311,
		gen: 4
	},
	りゅうのキバ: {
		name: "りゅうのキバ",
		spritenum: 106,
		fling: {
			basePower: 70
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Dragon") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 250,
		gen: 2
	},
	こわもてプレート: {
		name: "こわもてプレート",
		spritenum: 110,
		onPlate: "Dark",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Dark") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Dark",
		num: 312,
		gen: 4
	},
	だいちのプレート: {
		name: "だいちのプレート",
		spritenum: 117,
		onPlate: "Ground",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Ground") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Ground",
		num: 305,
		gen: 4
	},
	だっしゅつボタン: {
		name: "だっしゅつボタン",
		spritenum: 118,
		fling: {
			basePower: 30
		},
		onAfterMoveSecondaryPriority: 2,
		onAfterMoveSecondary(target, source, move) {
			if (
				source &&
				source !== target &&
				target.hp &&
				move &&
				move.category !== "Status" &&
				!move.flags["futuremove"]
			) {
				if (
					!this.canSwitch(target.side) ||
					target.forceSwitchFlag ||
					target.beingCalledBack ||
					target.isSkyDropped()
				)
					return
				if (target.volatiles["commanding"] || target.volatiles["commanded"])
					return
				for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return
				}
				target.switchFlag = true
				if (target.useItem()) {
					source.switchFlag = false
				} else {
					target.switchFlag = false
				}
			}
		},
		num: 547,
		gen: 5
	},
	だっしゅつパック: {
		name: "だっしゅつパック",
		spritenum: 714,
		fling: {
			basePower: 50
		},
		onAfterBoost(boost, target, source, effect) {
			if (this.activeMove?.id === "partingshot") return
			let eject = false
			let i
			for (i in boost) {
				if (boost[i] < 0) {
					eject = true
				}
			}
			if (eject) {
				if (target.hp) {
					if (!this.canSwitch(target.side)) return
					if (target.volatiles["commanding"] || target.volatiles["commanded"])
						return
					for (const pokemon of this.getAllActive()) {
						if (pokemon.switchFlag === true) return
					}
					if (target.useItem()) target.switchFlag = true
				}
			}
		},
		num: 1119,
		gen: 8
	},
	エレキシード: {
		name: "エレキシード",
		spritenum: 664,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain("electricterrain")) {
				pokemon.useItem()
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain("electricterrain")) {
				pokemon.useItem()
			}
		},
		boosts: {
			def: 1
		},
		num: 881,
		gen: 7
	},
	ナゾのみ: {
		name: "ナゾのみ",
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Bug"
		},
		onHit(target, source, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				if (target.eatItem()) {
					this.heal(target.baseMaxhp / 4)
				}
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 4
				)
			)
				return false
		},
		onEat() { },
		num: 208,
		gen: 3
	},
	しんかのきせき: {
		name: "しんかのきせき",
		spritenum: 130,
		fling: {
			basePower: 40
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe || pokemon.baseSpecies.id === "dipplin") {
				return this.chainModify(1.5)
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe || pokemon.baseSpecies.id === "dipplin") {
				return this.chainModify(1.5)
			}
		},
		num: 538,
		gen: 5
	},
	たつじんのおび: {
		name: "たつじんのおび",
		spritenum: 132,
		fling: {
			basePower: 10
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([4915, 4096])
			}
		},
		num: 268,
		gen: 4
	},
	ようせいのハネ: {
		name: "ようせいのハネ",
		spritenum: 754,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fairy") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 2401,
		gen: 9
	},
	フィラのみ: {
		name: "フィラのみ",
		spritenum: 140,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 3
				)
			)
				return false
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3)
			if (pokemon.getNature().minus === "atk") {
				pokemon.addVolatile("confusion")
			}
		},
		num: 159,
		gen: 3
	},
	こぶしのプレート: {
		name: "こぶしのプレート",
		spritenum: 143,
		onPlate: "Fighting",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fighting") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Fighting",
		num: 303,
		gen: 4
	},
	かえんだま: {
		name: "かえんだま",
		spritenum: 145,
		fling: {
			basePower: 30,
			status: "brn"
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus("brn", pokemon)
		},
		num: 273,
		gen: 4
	},
	ひのたまプレート: {
		name: "ひのたまプレート",
		spritenum: 146,
		onPlate: "Fire",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fire") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Fire",
		num: 298,
		gen: 4
	},
	かるいし: {
		name: "かるいし",
		spritenum: 147,
		fling: {
			basePower: 30
		},
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2)
		},
		num: 539,
		gen: 5
	},
	きあいのハチマキ: {
		name: "きあいのハチマキ",
		spritenum: 150,
		fling: {
			basePower: 10
		},
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (
				this.randomChance(1, 10) &&
				damage >= target.hp &&
				effect &&
				effect.effectType === "Move"
			) {
				this.add("-activate", target, "item: きあいのハチマキ")
				return target.hp - 1
			}
		},
		num: 230,
		gen: 2
	},
	きあいのタスキ: {
		name: "きあいのタスキ",
		spritenum: 151,
		fling: {
			basePower: 10
		},
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (
				target.hp === target.maxhp &&
				damage >= target.hp &&
				effect &&
				effect.effectType === "Move"
			) {
				if (target.useItem()) {
					return target.hp - 1
				}
			}
		},
		num: 275,
		gen: 4
	},
	リュガのみ: {
		name: "リュガのみ",
		spritenum: 158,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ice"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ def: 1 })
		},
		num: 202,
		gen: 3
	},
	グラスシード: {
		name: "グラスシード",
		spritenum: 667,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain("grassyterrain")) {
				pokemon.useItem()
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain("grassyterrain")) {
				pokemon.useItem()
			}
		},
		boosts: {
			def: 1
		},
		num: 884,
		gen: 7
	},
	ねばりのかぎづめ: {
		name: "ねばりのかぎづめ",
		spritenum: 179,
		fling: {
			basePower: 90
		},
		// implemented in statuses
		num: 286,
		gen: 4
	},
	だいはっきんだま: {
		name: "だいはっきんだま",
		spritenum: 743,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				user.baseSpecies.num === 487 &&
				(move.type === "Ghost" || move.type === "Dragon")
			) {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 487 || pokemon.baseSpecies.num === 487) {
				return false
			}
			return true
		},
		forcedForme: "Giratina-Origin",
		itemUser: ["Giratina-Origin"],
		num: 1779,
		gen: 8
	},
	はっきんだま: {
		name: "はっきんだま",
		spritenum: 180,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				user.baseSpecies.num === 487 &&
				(move.type === "Ghost" || move.type === "Dragon")
			) {
				return this.chainModify([4915, 4096])
			}
		},
		itemUser: ["Giratina"],
		num: 112,
		gen: 4
	},
	ハバンのみ: {
		name: "ハバンのみ",
		spritenum: 185,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Dragon" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 197,
		gen: 4
	},
	かたいいし: {
		name: "かたいいし",
		spritenum: 187,
		fling: {
			basePower: 100
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Rock") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 238,
		gen: 2
	},
	かまどのめん: {
		name: "かまどのめん",
		spritenum: 760,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith("Ogerpon-Hearthflame")) {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === "Ogerpon") return false
			return true
		},
		forcedForme: "Ogerpon-Hearthflame",
		itemUser: ["Ogerpon-Hearthflame"],
		num: 2408,
		gen: 9
	},
	あついいわ: {
		name: "あついいわ",
		spritenum: 193,
		fling: {
			basePower: 60
		},
		num: 284,
		gen: 4
	},
	あつぞこブーツ: {
		name: "あつぞこブーツ",
		spritenum: 715,
		fling: {
			basePower: 80
		},
		num: 1120,
		gen: 8
		// Hazard Immunity implemented in moves.ts
	},
	イアのみ: {
		name: "イアのみ",
		spritenum: 217,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 3
				)
			)
				return false
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3)
			if (pokemon.getNature().minus === "def") {
				pokemon.addVolatile("confusion")
			}
		},
		num: 163,
		gen: 3
	},
	つららのプレート: {
		name: "つららのプレート",
		spritenum: 220,
		onPlate: "Ice",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ice") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Ice",
		num: 302,
		gen: 4
	},
	つめたいいわ: {
		name: "つめたいいわ",
		spritenum: 221,
		fling: {
			basePower: 40
		},
		num: 282,
		gen: 4
	},
	たまむしプレート: {
		name: "たまむしプレート",
		spritenum: 223,
		onPlate: "Bug",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Bug") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Bug",
		num: 308,
		gen: 4
	},
	くろいてっきゅう: {
		name: "くろいてっきゅう",
		spritenum: 224,
		fling: {
			basePower: 130
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return
			if (
				target.volatiles["ingrain"] ||
				target.volatiles["smackdown"] ||
				this.field.getPseudoWeather("gravity")
			)
				return
			if (move.type === "Ground" && target.hasType("Flying")) return 0
		},
		// airborneness negation implemented in sim/pokemon.js:Pokemon#isGrounded
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 278,
		gen: 4
	},
	こうてつプレート: {
		name: "こうてつプレート",
		spritenum: 225,
		onPlate: "Steel",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Steel") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Steel",
		num: 313,
		gen: 4
	},
	ジャポのみ: {
		name: "ジャポのみ",
		spritenum: 230,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dragon"
		},
		onDamagingHit(damage, target, source, move) {
			if (
				move.category === "Physical" &&
				source.hp &&
				source.isActive &&
				!source.hasAbility("magicguard")
			) {
				if (target.eatItem()) {
					this.damage(
						source.baseMaxhp / (target.hasAbility("ripen") ? 4 : 8),
						source,
						target
					)
				}
			}
		},
		onEat() { },
		num: 211,
		gen: 4
	},
	カシブのみ: {
		name: "カシブのみ",
		spritenum: 233,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Ghost" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 196,
		gen: 4
	},
	ビアーのみ: {
		name: "ビアーのみ",
		spritenum: 234,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Poison" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 190,
		gen: 4
	},
	アッキのみ: {
		name: "アッキのみ",
		spritenum: 593,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fairy"
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.category === "Physical") {
				if (move.id === "present" && move.heal) return
				target.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ def: 1 })
		},
		num: 687,
		gen: 6
	},
	おうじゃのしるし: {
		name: "おうじゃのしるし",
		spritenum: 236,
		fling: {
			basePower: 30,
			volatileStatus: "flinch"
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = []
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === "flinch") return
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: "flinch"
				})
			}
		},
		num: 221,
		gen: 2
	},
	こうこうのしっぽ: {
		name: "こうこうのしっぽ",
		spritenum: 237,
		fling: {
			basePower: 10
		},
		onFractionalPriority: -0.1,
		num: 279,
		gen: 4
	},
	サンのみ: {
		name: "サンのみ",
		spritenum: 238,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Flying"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile("focusenergy")
		},
		num: 206,
		gen: 3
	},
	たべのこし: {
		name: "たべのこし",
		spritenum: 242,
		fling: {
			basePower: 10
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16)
		},
		num: 234,
		gen: 2
	},
	ヒメリのみ: {
		name: "ヒメリのみ",
		spritenum: 244,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting"
		},
		onUpdate(pokemon) {
			if (!pokemon.hp) return
			if (pokemon.moveSlots.some(move => move.pp === 0)) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			const moveSlot =
				pokemon.moveSlots.find(move => move.pp === 0) ||
				pokemon.moveSlots.find(move => move.pp < move.maxpp)
			if (!moveSlot) return
			moveSlot.pp += 10
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp
			this.add(
				"-activate",
				pokemon,
				"item: ヒメリのみ",
				moveSlot.move,
				"[consumed]"
			)
		},
		num: 154,
		gen: 3
	},
	チイラのみ: {
		name: "チイラのみ",
		spritenum: 248,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Grass"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ atk: 1 })
		},
		num: 201,
		gen: 3
	},
	いのちのたま: {
		name: "いのちのたま",
		spritenum: 249,
		fling: {
			basePower: 30
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096])
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (
				source &&
				source !== target &&
				move &&
				move.category !== "Status" &&
				!source.forceSwitchFlag
			) {
				this.damage(
					source.baseMaxhp / 10,
					source,
					source,
					this.dex.items.get("いのちのたま")
				)
			}
		},
		num: 270,
		gen: 4
	},
	でんきだま: {
		name: "でんきだま",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: "par"
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === "Pikachu") {
				return this.chainModify(2)
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === "Pikachu") {
				return this.chainModify(2)
			}
		},
		itemUser: [
			"Pikachu",
			"Pikachu-Cosplay",
			"Pikachu-Rock-Star",
			"Pikachu-Belle",
			"Pikachu-Pop-Star",
			"Pikachu-PhD",
			"Pikachu-Libre",
			"Pikachu-Original",
			"Pikachu-Hoenn",
			"Pikachu-Sinnoh",
			"Pikachu-Unova",
			"Pikachu-Kalos",
			"Pikachu-Alola",
			"Pikachu-Partner",
			"Pikachu-Starter",
			"Pikachu-World"
		],
		num: 236,
		gen: 2
	},
	ひかりのねんど: {
		name: "ひかりのねんど",
		spritenum: 252,
		fling: {
			basePower: 30
		},
		// implemented in the corresponding thing
		num: 269,
		gen: 4
	},
	いかさまダイス: {
		name: "いかさまダイス",
		spritenum: 751,
		fling: {
			basePower: 30
		},
		// partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
		onModifyMove(move) {
			if (move.multiaccuracy) {
				delete move.multiaccuracy
			}
		},
		num: 1886,
		gen: 9
	},
	ラムのみ: {
		name: "ラムのみ",
		spritenum: 262,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying"
		},
		onAfterSetStatusPriority: -1,
		onAfterSetStatus(status, pokemon) {
			pokemon.eatItem()
		},
		onUpdate(pokemon) {
			if (pokemon.status || pokemon.volatiles["confusion"]) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus()
			pokemon.removeVolatile("confusion")
		},
		num: 157,
		gen: 3
	},
	ひかりごけ: {
		name: "ひかりごけ",
		spritenum: 595,
		fling: {
			basePower: 30
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === "Water") {
				target.useItem()
			}
		},
		boosts: {
			spd: 1
		},
		num: 648,
		gen: 6
	},
	だいしらたま: {
		name: "だいしらたま",
		spritenum: 742,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				user.baseSpecies.num === 484 &&
				(move.type === "Water" || move.type === "Dragon")
			) {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source?.baseSpecies.num === 484 || pokemon.baseSpecies.num === 484) {
				return false
			}
			return true
		},
		forcedForme: "Palkia-Origin",
		itemUser: ["Palkia-Origin"],
		num: 1778,
		gen: 8
	},
	しらたま: {
		name: "しらたま",
		spritenum: 265,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (
				user.baseSpecies.num === 484 &&
				(move.type === "Water" || move.type === "Dragon")
			) {
				return this.chainModify([4915, 4096])
			}
		},
		itemUser: ["Palkia"],
		num: 136,
		gen: 4
	},
	じしゃく: {
		name: "じしゃく",
		spritenum: 273,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Electric") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 242,
		gen: 2
	},
	マゴのみ: {
		name: "マゴのみ",
		spritenum: 274,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 3
				)
			)
				return false
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3)
			if (pokemon.getNature().minus === "spe") {
				pokemon.addVolatile("confusion")
			}
		},
		num: 161,
		gen: 3
	},
	タラプのみ: {
		name: "タラプのみ",
		spritenum: 597,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark"
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.category === "Special") {
				target.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ spd: 1 })
		},
		num: 688,
		gen: 6
	},
	みどりのプレート: {
		name: "みどりのプレート",
		spritenum: 282,
		onPlate: "Grass",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Grass") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Grass",
		num: 301,
		gen: 4
	},
	メンタルハーブ: {
		name: "メンタルハーブ",
		spritenum: 285,
		fling: {
			basePower: 10,
			effect(pokemon) {
				const conditions = [
					"attract",
					"taunt",
					"encore",
					"torment",
					"disable",
					"healblock"
				]
				for (const firstCondition of conditions) {
					if (pokemon.volatiles[firstCondition]) {
						for (const secondCondition of conditions) {
							pokemon.removeVolatile(secondCondition)
							if (
								firstCondition === "attract" &&
								secondCondition === "attract"
							) {
								this.add(
									"-end",
									pokemon,
									"move: Attract",
									"[from] item: メンタルハーブ"
								)
							}
						}
						return
					}
				}
			}
		},
		onUpdate(pokemon) {
			const conditions = [
				"attract",
				"taunt",
				"encore",
				"torment",
				"disable",
				"healblock"
			]
			for (const firstCondition of conditions) {
				if (pokemon.volatiles[firstCondition]) {
					if (!pokemon.useItem()) return
					for (const secondCondition of conditions) {
						pokemon.removeVolatile(secondCondition)
						if (firstCondition === "attract" && secondCondition === "attract") {
							this.add(
								"-end",
								pokemon,
								"move: Attract",
								"[from] item: メンタルハーブ"
							)
						}
					}
					return
				}
			}
		},
		num: 219,
		gen: 3
	},
	メタルコート: {
		name: "メタルコート",
		spritenum: 286,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Steel") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 233,
		gen: 2
	},
	メタルパウダー: {
		name: "メタルパウダー",
		fling: {
			basePower: 10
		},
		spritenum: 287,
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.species.name === "Ditto" && !pokemon.transformed) {
				return this.chainModify(2)
			}
		},
		itemUser: ["Ditto"],
		num: 257,
		gen: 2,
		isNonstandard: "Past"
	},
	メトロノーム: {
		name: "メトロノーム",
		spritenum: 289,
		fling: {
			basePower: 30
		},
		onStart(pokemon) {
			pokemon.addVolatile("メトロノーム")
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = ""
				this.effectState.numConsecutive = 0
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem("メトロノーム")) {
					pokemon.removeVolatile("メトロノーム")
					return
				}
				if (
					this.effectState.lastMove === move.id &&
					pokemon.moveLastTurnResult
				) {
					this.effectState.numConsecutive++
				} else if (pokemon.volatiles["twoturnmove"]) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1
					} else {
						this.effectState.numConsecutive++
					}
				} else {
					this.effectState.numConsecutive = 0
				}
				this.effectState.lastMove = move.id
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192]
				const numConsecutive =
					this.effectState.numConsecutive > 5
						? 5
						: this.effectState.numConsecutive
				this.debug(`Current メトロノーム boost: ${dmgMod[numConsecutive]}/4096`)
				return this.chainModify([dmgMod[numConsecutive], 4096])
			}
		},
		num: 277,
		gen: 4
	},
	ミクルのみ: {
		name: "ミクルのみ",
		spritenum: 290,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Rock"
		},
		onResidual(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile("ミクルのみ")
		},
		condition: {
			duration: 2,
			onSourceAccuracy(accuracy, target, source, move) {
				if (!move.ohko) {
					this.add("-enditem", source, "ミクルのみ")
					source.removeVolatile("ミクルのみ")
					if (typeof accuracy === "number") {
						return this.chainModify([4915, 4096])
					}
				}
			}
		},
		num: 209,
		gen: 4
	},
	ふしぎのプレート: {
		name: "ふしぎのプレート",
		spritenum: 291,
		onPlate: "Psychic",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Psychic") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Psychic",
		num: 307,
		gen: 4
	},
	きせきのタネ: {
		name: "きせきのタネ",
		fling: {
			basePower: 30
		},
		spritenum: 292,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Grass") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 239,
		gen: 2
	},
	ものまねハーブ: {
		name: "ものまねハーブ",
		spritenum: 748,
		fling: {
			basePower: 30
		},
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === "Opportunist" || effect?.name === "ものまねハーブ")
				return
			const boostPlus = {}
			let statsRaised = false
			let i
			for (i in boost) {
				if (boost[i] > 0) {
					boostPlus[i] = boost[i]
					statsRaised = true
				}
			}
			if (!statsRaised) return
			const pokemon = this.effectState.target
			pokemon.useItem()
			this.boost(boostPlus, pokemon)
		},
		num: 1883,
		gen: 9
	},
	ミストシード: {
		name: "ミストシード",
		spritenum: 666,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain("mistyterrain")) {
				pokemon.useItem()
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain("mistyterrain")) {
				pokemon.useItem()
			}
		},
		boosts: {
			spd: 1
		},
		num: 883,
		gen: 7
	},
	ちからのハチマキ: {
		name: "ちからのハチマキ",
		spritenum: 297,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === "Physical") {
				return this.chainModify([4505, 4096])
			}
		},
		num: 266,
		gen: 4
	},
	しんぴのしずく: {
		name: "しんぴのしずく",
		spritenum: 300,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Water") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 243,
		gen: 2
	},
	とけないこおり: {
		name: "とけないこおり",
		spritenum: 305,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ice") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 246,
		gen: 2
	},
	ノーマルジュエル: {
		name: "ノーマルジュエル",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (
				target === source ||
				move.category === "Status" ||
				move.flags["pledgecombo"]
			)
				return
			if (move.type === "Normal" && source.useItem()) {
				source.addVolatile("gem")
			}
		},
		num: 564,
		gen: 5
	},
	オッカのみ: {
		name: "オッカのみ",
		spritenum: 311,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Fire" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 184,
		gen: 4
	},
	オレンのみ: {
		name: "オレンのみ",
		spritenum: 319,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison"
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent("TryHeal", pokemon, null, this.effect, 10))
				return false
		},
		onEat(pokemon) {
			this.heal(10)
		},
		num: 155,
		gen: 3
	},
	イトケのみ: {
		name: "イトケのみ",
		spritenum: 329,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Water" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 185,
		gen: 4
	},
	ウタンのみ: {
		name: "ウタンのみ",
		spritenum: 330,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Psychic" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 193,
		gen: 4
	},
	モモンのみ: {
		name: "モモンのみ",
		spritenum: 333,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric"
		},
		onUpdate(pokemon) {
			if (pokemon.status === "psn" || pokemon.status === "tox") {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			if (pokemon.status === "psn" || pokemon.status === "tox") {
				pokemon.cureStatus()
			}
		},
		num: 151,
		gen: 3
	},
	キーのみ: {
		name: "キーのみ",
		spritenum: 334,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground"
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles["confusion"]) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile("confusion")
		},
		num: 156,
		gen: 3
	},
	ヤタピのみ: {
		name: "ヤタピのみ",
		spritenum: 335,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Poison"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ spa: 1 })
		},
		num: 204,
		gen: 3
	},
	せいれいプレート: {
		name: "せいれいプレート",
		spritenum: 610,
		onPlate: "Fairy",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fairy") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Fairy",
		num: 644,
		gen: 6
	},
	どくバリ: {
		name: "どくバリ",
		spritenum: 343,
		fling: {
			basePower: 70,
			status: "psn"
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Poison") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 245,
		gen: 2
	},
	パワーアンクル: {
		name: "パワーアンクル",
		spritenum: 354,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 293,
		gen: 4
	},
	パワーバンド: {
		name: "パワーバンド",
		spritenum: 355,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 292,
		gen: 4
	},
	パワーベルト: {
		name: "パワーベルト",
		spritenum: 356,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 290,
		gen: 4
	},
	パワーリスト: {
		name: "パワーリスト",
		spritenum: 357,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 289,
		gen: 4
	},
	パワフルハーブ: {
		onChargeMove(pokemon, target, move) {
			if (pokemon.useItem()) {
				this.debug("power herb - remove charge turn for " + move.id)
				this.attrLastMove("[still]")
				this.addMove("-anim", pokemon, move.name, target)
				return false // skip charge turn
			}
		},
		name: "パワフルハーブ",
		spritenum: 358,
		fling: {
			basePower: 10
		},
		num: 271,
		gen: 4
	},
	パワーレンズ: {
		name: "パワーレンズ",
		spritenum: 359,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 291,
		gen: 4
	},
	パワーウエイト: {
		name: "パワーウエイト",
		spritenum: 360,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
		num: 294,
		gen: 4
	},
	サイコシード: {
		name: "サイコシード",
		spritenum: 665,
		fling: {
			basePower: 10
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain("psychicterrain")) {
				pokemon.useItem()
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain("psychicterrain")) {
				pokemon.useItem()
			}
		},
		boosts: {
			spd: 1
		},
		num: 882,
		gen: 7
	},
	パンチグローブ: {
		name: "パンチグローブ",
		spritenum: 749,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags["punch"]) {
				this.debug("パンチグローブ boost")
				return this.chainModify([4506, 4096])
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags["punch"]) delete move.flags["contact"]
		},
		num: 1884,
		gen: 9
	},
	せんせいのツメ: {
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === "Status" && pokemon.hasAbility("myceliummight"))
				return
			if (priority <= 0 && this.randomChance(1, 5)) {
				this.add("-activate", pokemon, "item: せんせいのツメ")
				return 0.1
			}
		},
		name: "せんせいのツメ",
		spritenum: 373,
		fling: {
			basePower: 80
		},
		num: 217,
		gen: 2
	},
	スピードパウダー: {
		name: "スピードパウダー",
		spritenum: 374,
		fling: {
			basePower: 10
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.name === "Ditto" && !pokemon.transformed) {
				return this.chainModify(2)
			}
		},
		itemUser: ["Ditto"],
		num: 274,
		gen: 4,
		isNonstandard: "Past"
	},
	チーゴのみ: {
		name: "チーゴのみ",
		spritenum: 381,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass"
		},
		onUpdate(pokemon) {
			if (pokemon.status === "brn") {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			if (pokemon.status === "brn") {
				pokemon.cureStatus()
			}
		},
		num: 152,
		gen: 3
	},
	するどいツメ: {
		name: "するどいツメ",
		spritenum: 382,
		fling: {
			basePower: 80
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1
		},
		num: 326,
		gen: 4
	},
	するどいキバ: {
		name: "するどいキバ",
		spritenum: 383,
		fling: {
			basePower: 30,
			volatileStatus: "flinch"
		},
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = []
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === "flinch") return
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: "flinch"
				})
			}
		},
		num: 327,
		gen: 4
	},
	レッドカード: {
		name: "レッドカード",
		spritenum: 387,
		fling: {
			basePower: 10
		},
		onAfterMoveSecondary(target, source, move) {
			if (
				source &&
				source !== target &&
				source.hp &&
				target.hp &&
				move &&
				move.category !== "Status"
			) {
				if (
					!source.isActive ||
					!this.canSwitch(source.side) ||
					source.forceSwitchFlag ||
					target.forceSwitchFlag
				) {
					return
				}
				// The item is used up even against a pokemon with Ingrain or that otherwise can't be forced out
				if (target.useItem(source)) {
					if (this.runEvent("DragOut", source, target, move)) {
						source.forceSwitchFlag = true
					}
				}
			}
		},
		num: 542,
		gen: 5
	},
	リンドのみ: {
		name: "リンドのみ",
		spritenum: 409,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Grass" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 187,
		gen: 4
	},
	ねらいのまと: {
		name: "ねらいのまと",
		spritenum: 410,
		fling: {
			basePower: 10
		},
		onNegateImmunity: false,
		num: 543,
		gen: 5
	},
	ゴツゴツメット: {
		name: "ゴツゴツメット",
		spritenum: 417,
		fling: {
			basePower: 60
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 6, source, target)
			}
		},
		num: 540,
		gen: 5
	},
	ルームサービス: {
		name: "ルームサービス",
		spritenum: 717,
		fling: {
			basePower: 100
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.getPseudoWeather("trickroom")) {
				pokemon.useItem()
			}
		},
		onAnyPseudoWeatherChange() {
			const pokemon = this.effectState.target
			if (this.field.getPseudoWeather("trickroom")) {
				pokemon.useItem(pokemon)
			}
		},
		boosts: {
			spe: -1
		},
		num: 1122,
		gen: 8
	},
	ロゼルのみ: {
		name: "ロゼルのみ",
		spritenum: 603,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fairy"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Fairy" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 686,
		gen: 6
	},
	レンブのみ: {
		name: "レンブのみ",
		spritenum: 420,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark"
		},
		onDamagingHit(damage, target, source, move) {
			if (
				move.category === "Special" &&
				source.hp &&
				source.isActive &&
				!source.hasAbility("magicguard")
			) {
				if (target.eatItem()) {
					this.damage(
						source.baseMaxhp / (target.hasAbility("ripen") ? 4 : 8),
						source,
						target
					)
				}
			}
		},
		onEat() { },
		num: 212,
		gen: 4
	},
	くちたたて: {
		name: "くちたたて",
		spritenum: 699,
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 889) ||
				pokemon.baseSpecies.num === 889
			) {
				return false
			}
			return true
		},
		itemUser: ["Zamazenta-Crowned"],
		num: 1104,
		gen: 8
	},
	くちたけん: {
		name: "くちたけん",
		spritenum: 698,
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 888) ||
				pokemon.baseSpecies.num === 888
			) {
				return false
			}
			return true
		},
		itemUser: ["Zacian-Crowned"],
		num: 1103,
		gen: 8
	},
	ぼうじんゴーグル: {
		name: "ぼうじんゴーグル",
		spritenum: 604,
		fling: {
			basePower: 80
		},
		onImmunity(type, pokemon) {
			if (type === "sandstorm" || type === "hail" || type === "powder")
				return false
		},
		onTryHit(pokemon, source, move) {
			if (
				move.flags["powder"] &&
				pokemon !== source &&
				this.dex.getImmunity("powder", pokemon)
			) {
				this.add("-activate", pokemon, "item: ぼうじんゴーグル", move.name)
				return null
			}
		},
		num: 650,
		gen: 6
	},
	カムラのみ: {
		name: "カムラのみ",
		spritenum: 426,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fighting"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			this.boost({ spe: 1 })
		},
		num: 203,
		gen: 3
	},
	ピントレンズ: {
		name: "ピントレンズ",
		spritenum: 429,
		fling: {
			basePower: 30
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1
		},
		num: 232,
		gen: 2
	},
	するどいくちばし: {
		name: "するどいくちばし",
		spritenum: 436,
		fling: {
			basePower: 50
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Flying") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 244,
		gen: 2
	},
	きれいなぬけがら: {
		name: "きれいなぬけがら",
		spritenum: 437,
		fling: {
			basePower: 10
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false
		},
		num: 295,
		gen: 4
	},
	かいがらのすず: {
		name: "かいがらのすず",
		spritenum: 438,
		fling: {
			basePower: 30
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 8, pokemon)
			}
		},
		num: 253,
		gen: 3
	},
	シュカのみ: {
		name: "シュカのみ",
		spritenum: 443,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Ground" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 191,
		gen: 4
	},
	シルクのスカーフ: {
		name: "シルクのスカーフ",
		spritenum: 444,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Normal") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 251,
		gen: 3
	},
	ぎんのこな: {
		name: "ぎんのこな",
		spritenum: 447,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Bug") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 222,
		gen: 2
	},
	オボンのみ: {
		name: "オボンのみ",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic"
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 4
				)
			)
				return false
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4)
		},
		num: 158,
		gen: 3
	},
	あおぞらプレート: {
		name: "あおぞらプレート",
		spritenum: 450,
		onPlate: "Flying",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Flying") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Flying",
		num: 306,
		gen: 4
	},
	さらさらいわ: {
		name: "さらさらいわ",
		spritenum: 453,
		fling: {
			basePower: 10
		},
		num: 283,
		gen: 4
	},
	ゆきだま: {
		name: "ゆきだま",
		spritenum: 606,
		fling: {
			basePower: 30
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === "Ice") {
				target.useItem()
			}
		},
		boosts: {
			atk: 1
		},
		num: 649,
		gen: 6
	},
	やわらかいすな: {
		name: "やわらかいすな",
		spritenum: 456,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ground") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 237,
		gen: 2
	},
	のろいのおふだ: {
		name: "のろいのおふだ",
		spritenum: 461,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ghost") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 247,
		gen: 2
	},
	しずくプレート: {
		name: "しずくプレート",
		spritenum: 463,
		onPlate: "Water",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Water") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Water",
		num: 299,
		gen: 4
	},
	もののけプレート: {
		name: "もののけプレート",
		spritenum: 464,
		onPlate: "Ghost",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ghost") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Ghost",
		num: 310,
		gen: 4
	},
	スターのみ: {
		name: "スターのみ",
		spritenum: 472,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Psychic"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onEat(pokemon) {
			const stats = []
			let stat
			for (stat in pokemon.boosts) {
				if (
					stat !== "accuracy" &&
					stat !== "evasion" &&
					pokemon.boosts[stat] < 6
				) {
					stats.push(stat)
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats)
				const boost = {}
				boost[randomStat] = 2
				this.boost(boost)
			}
		},
		num: 207,
		gen: 3
	},
	くっつきバリ: {
		name: "くっつきバリ",
		spritenum: 476,
		fling: {
			basePower: 80
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8)
		},
		onHit(target, source, move) {
			if (
				source &&
				source !== target &&
				!source.item &&
				move &&
				this.checkMoveMakesContact(move, source, target)
			) {
				const barb = target.takeItem()
				if (!barb) return // Gen 4 Multitype
				source.setItem(barb)
				// no message for くっつきバリ changing hands
			}
		},
		num: 288,
		gen: 4
	},
	がんせきプレート: {
		name: "がんせきプレート",
		spritenum: 477,
		onPlate: "Rock",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Rock") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Rock",
		num: 309,
		gen: 4
	},
	タンガのみ: {
		name: "タンガのみ",
		spritenum: 487,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Bug" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 194,
		gen: 4
	},
	グランドコート: {
		name: "グランドコート",
		spritenum: 662,
		fling: {
			basePower: 60
		},
		num: 879,
		gen: 7
	},
	のどスプレー: {
		name: "のどスプレー",
		spritenum: 713,
		fling: {
			basePower: 30
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.flags["sound"]) {
				target.useItem()
			}
		},
		boosts: {
			spa: 1
		},
		num: 1118,
		gen: 8
	},
	どくどくだま: {
		name: "どくどくだま",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: "tox"
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus("tox", pokemon)
		},
		num: 272,
		gen: 4
	},
	もうどくプレート: {
		name: "もうどくプレート",
		spritenum: 516,
		onPlate: "Poison",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Poison") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Poison",
		num: 304,
		gen: 4
	},
	まがったスプーン: {
		name: "まがったスプーン",
		spritenum: 520,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Psychic") {
				return this.chainModify([4915, 4096])
			}
		},
		num: 248,
		gen: 2
	},
	ばんのうがさ: {
		name: "ばんのうがさ",
		spritenum: 718,
		fling: {
			basePower: 60
		},
		// Partially implemented in Pokemon.effectiveWeather() in sim/pokemon.ts
		onStart(pokemon) {
			if (!pokemon.ignoringItem()) return
			if (
				["sunnyday", "raindance", "desolateland", "primordialsea"].includes(
					this.field.effectiveWeather()
				)
			) {
				this.runEvent("WeatherChange", pokemon, pokemon, this.effect)
			}
		},
		onUpdate(pokemon) {
			if (!this.effectState.inactive) return
			this.effectState.inactive = false
			if (
				["sunnyday", "raindance", "desolateland", "primordialsea"].includes(
					this.field.effectiveWeather()
				)
			) {
				this.runEvent("WeatherChange", pokemon, pokemon, this.effect)
			}
		},
		onEnd(pokemon) {
			if (
				["sunnyday", "raindance", "desolateland", "primordialsea"].includes(
					this.field.effectiveWeather()
				)
			) {
				this.runEvent("WeatherChange", pokemon, pokemon, this.effect)
			}
			this.effectState.inactive = true
		},
		num: 1123,
		gen: 8
	},
	ソクノのみ: {
		name: "ソクノのみ",
		spritenum: 526,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Electric" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return
				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 186,
		gen: 4
	},
	じゃくてんほけん: {
		name: "じゃくてんほけん",
		spritenum: 609,
		fling: {
			basePower: 80
		},
		onDamagingHit(damage, target, source, move) {
			if (
				!move.damage &&
				!move.damageCallback &&
				target.getMoveHitData(move).typeMod > 0
			) {
				target.useItem()
			}
		},
		boosts: {
			atk: 2,
			spa: 2
		},
		num: 639,
		gen: 6
	},
	いどのめん: {
		name: "いどのめん",
		spritenum: 759,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith("Ogerpon-Wellspring")) {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === "Ogerpon") return false
			return true
		},
		forcedForme: "Ogerpon-Wellspring",
		itemUser: ["Ogerpon-Wellspring"],
		num: 2407,
		gen: 9
	},
	しろいハーブ: {
		name: "しろいハーブ",
		spritenum: 535,
		fling: {
			basePower: 10,
			effect(pokemon) {
				let activate = false
				const boosts = {}
				let i
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						activate = true
						boosts[i] = 0
					}
				}
				if (activate) {
					pokemon.setBoost(boosts)
					this.add("-clearnegativeboost", pokemon, "[silent]")
				}
			}
		},
		onUpdate(pokemon) {
			let activate = false
			const boosts = {}
			let i
			for (i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true
					boosts[i] = 0
				}
			}
			if (activate && pokemon.useItem()) {
				pokemon.setBoost(boosts)
				this.add("-clearnegativeboost", pokemon, "[silent]")
			}
		},
		num: 214,
		gen: 3
	},
	こうかくレンズ: {
		name: "こうかくレンズ",
		spritenum: 537,
		fling: {
			basePower: 10
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === "number") {
				return this.chainModify([4505, 4096])
			}
		},
		num: 265,
		gen: 4
	},
	ウイのみ: {
		name: "ウイのみ",
		spritenum: 538,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock"
		},
		onUpdate(pokemon) {
			if (
				pokemon.hp <= pokemon.maxhp / 4 ||
				(pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility("gluttony") &&
					pokemon.abilityState.gluttony)
			) {
				pokemon.eatItem()
			}
		},
		onTryEatItem(item, pokemon) {
			if (
				!this.runEvent(
					"TryHeal",
					pokemon,
					null,
					this.effect,
					pokemon.baseMaxhp / 3
				)
			)
				return false
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 3)
			if (pokemon.getNature().minus === "spa") {
				pokemon.addVolatile("confusion")
			}
		},
		num: 160,
		gen: 3
	},
	ものしりメガネ: {
		name: "ものしりメガネ",
		spritenum: 539,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === "Special") {
				return this.chainModify([4505, 4096])
			}
		},
		num: 267,
		gen: 4
	},
	ヤチェのみ: {
		name: "ヤチェのみ",
		spritenum: 567,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice"
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === "Ice" && target.getMoveHitData(move).typeMod > 0) {
				const hitSub =
					target.volatiles["substitute"] &&
					!move.flags["bypasssub"] &&
					!(move.infiltrates && this.gen >= 6)
				if (hitSub) return

				if (target.eatItem()) {
					this.debug("-50% reduction")
					this.add("-enditem", target, this.effect, "[weaken]")
					return this.chainModify(0.5)
				}
			}
		},
		onEat() { },
		num: 188,
		gen: 4
	},
	いかずちプレート: {
		name: "いかずちプレート",
		spritenum: 572,
		onPlate: "Electric",
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Electric") {
				return this.chainModify([4915, 4096])
			}
		},
		onTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 493) ||
				pokemon.baseSpecies.num === 493
			) {
				return false
			}
			return true
		},
		forcedForme: "Arceus-Electric",
		num: 300,
		gen: 4
	},
	フォーカスレンズ: {
		name: "フォーカスレンズ",
		spritenum: 574,
		fling: {
			basePower: 10
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === "number" && !this.queue.willMove(target)) {
				this.debug("フォーカスレンズ boosting accuracy")
				return this.chainModify([4915, 4096])
			}
		},
		num: 276,
		gen: 4
	},
}
