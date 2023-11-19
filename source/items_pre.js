const Items = {
	とくせいガード: {
		name: "とくせいガード",
		spritefling: {
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
	},
	きゅうこん: {
		name: "きゅうこん",
		spritefling: {
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
	},
	だいこんごうだま: {
		name: "だいこんごうだま",
		spriteonBasePowerPriority: 15,
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
	},
	こんごうだま: {
		name: "こんごうだま",
		spritefling: {
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
	},
	ビビリだま: {
		name: "ビビリだま",
		spritefling: {
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
	},
	バンジのみ: {
		name: "バンジのみ",
		spriteisBerry: true,
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
	},
	ふうせん: {
		name: "ふうせん",
		spritefling: {
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
	},
	ズアのみ: {
		name: "ズアのみ",
		spriteisBerry: true,
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
	},
	ナナシのみ: {
		name: "ナナシのみ",
		spriteisBerry: true,
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
	},
	とつげきチョッキ: {
		name: "とつげきチョッキ",
		spritefling: {
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
	},
	リリバのみ: {
		name: "リリバのみ",
		spriteisBerry: true,
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
	},
	おおきなねっこ: {
		name: "おおきなねっこ",
		spritefling: {
			basePower: 10
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ["drain", "leechseed", "ingrain", "aquaring", "strengthsap"]
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096])
			}
		},
	},
	しめつけバンド: {
		name: "しめつけバンド",
		spritefling: {
			basePower: 30
		},
		// implemented in statuses
	},
	くろおび: {
		name: "くろおび",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fighting") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	くろいメガネ: {
		name: "くろいメガネ",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Dark") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	くろいヘドロ: {
		name: "くろいヘドロ",
		spritefling: {
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
	},
	からぶりほけん: {
		name: "からぶりほけん",
		spritefling: {
			basePower: 80
		},
		// Item activation located in scripts.js
	},
	ブーストエナジー: {
		name: "ブーストエナジー",
		spritefling: {
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
	},
	ひかりのこな: {
		name: "ひかりのこな",
		spritefling: {
			basePower: 10
		},
		onModifyAccuracyPriority: -2,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== "number") return
			this.debug("ひかりのこな - decreasing accuracy")
			return this.chainModify([3686, 4096])
		},
	},
	じゅうでんち: {
		name: "じゅうでんち",
		spritefling: {
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
	},
	もくたん: {
		name: "もくたん",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fire") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	ヨロギのみ: {
		name: "ヨロギのみ",
		spriteisBerry: true,
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
	},
	クラボのみ: {
		name: "クラボのみ",
		spriteisBerry: true,
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
	},
	カゴのみ: {
		name: "カゴのみ",
		spriteisBerry: true,
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
	},
	ホズのみ: {
		name: "ホズのみ",
		spriteisBerry: true,
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
	},
	こだわりハチマキ: {
		name: "こだわりハチマキ",
		spritefling: {
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
	},
	こだわりスカーフ: {
		name: "こだわりスカーフ",
		spritefling: {
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
	},
	こだわりメガネ: {
		name: "こだわりメガネ",
		spritefling: {
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
	},
	ヨプのみ: {
		name: "ヨプのみ",
		spriteisBerry: true,
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
	},
	クリアチャーム: {
		name: "クリアチャーム",
		spritefling: {
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
	},
	バコウのみ: {
		name: "バコウのみ",
		spriteisBerry: true,
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
	},
	ナモのみ: {
		name: "ナモのみ",
		spriteisBerry: true,
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
	},
	いしずえのめん: {
		name: "いしずえのめん",
		spritefling: {
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
	},
	おんみつマント: {
		name: "おんみつマント",
		spritefling: {
			basePower: 30
		},
		onModifySecondaries(secondaries) {
			this.debug("おんみつマント prevent secondary")
			return secondaries.filter(effect => !!(effect.self || effect.dustproof))
		},
	},
	イバンのみ: {
		name: "イバンのみ",
		spriteisBerry: true,
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
	},
	しめったいわ: {
		name: "しめったいわ",
		spritefling: {
			basePower: 60
		},
	},
	あかいいと: {
		name: "あかいいと",
		spritefling: {
			basePower: 10
		},
		onAttractPriority: -100,
		onAttract(target, source) {
			this.debug("attract intercepted: " + target + " from " + source)
			if (!source || source === target) return
			if (!source.volatiles["attract"]) source.addVolatile("attract", target)
		},
	},
	りゅうのプレート: {
		name: "りゅうのプレート",
		spriteonPlate: "Dragon",
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
	},
	りゅうのキバ: {
		name: "りゅうのキバ",
		spritefling: {
			basePower: 70
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Dragon") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	こわもてプレート: {
		name: "こわもてプレート",
		spriteonPlate: "Dark",
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
	},
	だいちのプレート: {
		name: "だいちのプレート",
		spriteonPlate: "Ground",
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
	},
	だっしゅつボタン: {
		name: "だっしゅつボタン",
		spritefling: {
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
	},
	だっしゅつパック: {
		name: "だっしゅつパック",
		spritefling: {
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
	},
	エレキシード: {
		name: "エレキシード",
		spritefling: {
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
	},
	ナゾのみ: {
		name: "ナゾのみ",
		spriteisBerry: true,
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
	},
	しんかのきせき: {
		name: "しんかのきせき",
		spritefling: {
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
	},
	たつじんのおび: {
		name: "たつじんのおび",
		spritefling: {
			basePower: 10
		},
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([4915, 4096])
			}
		},
	},
	ようせいのハネ: {
		name: "ようせいのハネ",
		spritefling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Fairy") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	フィラのみ: {
		name: "フィラのみ",
		spriteisBerry: true,
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
	},
	こぶしのプレート: {
		name: "こぶしのプレート",
		spriteonPlate: "Fighting",
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
	},
	かえんだま: {
		name: "かえんだま",
		spritefling: {
			basePower: 30,
			status: "brn"
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus("brn", pokemon)
		},
	},
	ひのたまプレート: {
		name: "ひのたまプレート",
		spriteonPlate: "Fire",
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
	},
	かるいし: {
		name: "かるいし",
		spritefling: {
			basePower: 30
		},
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2)
		},
	},
	きあいのハチマキ: {
		name: "きあいのハチマキ",
		spritefling: {
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
	},
	きあいのタスキ: {
		name: "きあいのタスキ",
		spritefling: {
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
	},
	リュガのみ: {
		name: "リュガのみ",
		spriteisBerry: true,
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
	},
	グラスシード: {
		name: "グラスシード",
		spritefling: {
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
	},
	ねばりのかぎづめ: {
		name: "ねばりのかぎづめ",
		spritefling: {
			basePower: 90
		},
		// implemented in statuses
	},
	だいはっきんだま: {
		name: "だいはっきんだま",
		spriteonBasePowerPriority: 15,
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
	},
	はっきんだま: {
		name: "はっきんだま",
		spritefling: {
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
	},
	ハバンのみ: {
		name: "ハバンのみ",
		spriteisBerry: true,
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
	},
	かたいいし: {
		name: "かたいいし",
		spritefling: {
			basePower: 100
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Rock") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	かまどのめん: {
		name: "かまどのめん",
		spritefling: {
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
	},
	あついいわ: {
		name: "あついいわ",
		spritefling: {
			basePower: 60
		},
	},
	あつぞこブーツ: {
		name: "あつぞこブーツ",
		spritefling: {
			basePower: 80
		},
		// Hazard Immunity implemented in moves.ts
	},
	イアのみ: {
		name: "イアのみ",
		spriteisBerry: true,
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
	},
	つららのプレート: {
		name: "つららのプレート",
		spriteonPlate: "Ice",
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
	},
	つめたいいわ: {
		name: "つめたいいわ",
		spritefling: {
			basePower: 40
		},
	},
	たまむしプレート: {
		name: "たまむしプレート",
		spriteonPlate: "Bug",
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
	},
	くろいてっきゅう: {
		name: "くろいてっきゅう",
		spritefling: {
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
	},
	こうてつプレート: {
		name: "こうてつプレート",
		spriteonPlate: "Steel",
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
	},
	ジャポのみ: {
		name: "ジャポのみ",
		spriteisBerry: true,
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
	},
	カシブのみ: {
		name: "カシブのみ",
		spriteisBerry: true,
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
	},
	ビアーのみ: {
		name: "ビアーのみ",
		spriteisBerry: true,
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
	},
	アッキのみ: {
		name: "アッキのみ",
		spriteisBerry: true,
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
	},
	おうじゃのしるし: {
		name: "おうじゃのしるし",
		spritefling: {
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
	},
	こうこうのしっぽ: {
		name: "こうこうのしっぽ",
		spritefling: {
			basePower: 10
		},
		onFractionalPriority: -0.1,
	},
	サンのみ: {
		name: "サンのみ",
		spriteisBerry: true,
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
	},
	たべのこし: {
		name: "たべのこし",
		spritefling: {
			basePower: 10
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16)
		},
	},
	ヒメリのみ: {
		name: "ヒメリのみ",
		spriteisBerry: true,
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
	},
	チイラのみ: {
		name: "チイラのみ",
		spriteisBerry: true,
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
	},
	いのちのたま: {
		name: "いのちのたま",
		spritefling: {
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
	},
	でんきだま: {
		name: "でんきだま",
		spritefling: {
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
	},
	ひかりのねんど: {
		name: "ひかりのねんど",
		spritefling: {
			basePower: 30
		},
		// implemented in the corresponding thing
	},
	いかさまダイス: {
		name: "いかさまダイス",
		spritefling: {
			basePower: 30
		},
		// partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
		onModifyMove(move) {
			if (move.multiaccuracy) {
				delete move.multiaccuracy
			}
		},
	},
	ラムのみ: {
		name: "ラムのみ",
		spriteisBerry: true,
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
	},
	ひかりごけ: {
		name: "ひかりごけ",
		spritefling: {
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
	},
	だいしらたま: {
		name: "だいしらたま",
		spriteonBasePowerPriority: 15,
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
	},
	しらたま: {
		name: "しらたま",
		spritefling: {
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
	},
	じしゃく: {
		name: "じしゃく",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Electric") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	マゴのみ: {
		name: "マゴのみ",
		spriteisBerry: true,
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
	},
	タラプのみ: {
		name: "タラプのみ",
		spriteisBerry: true,
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
	},
	みどりのプレート: {
		name: "みどりのプレート",
		spriteonPlate: "Grass",
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
	},
	メンタルハーブ: {
		name: "メンタルハーブ",
		spritefling: {
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
	},
	メタルコート: {
		name: "メタルコート",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Steel") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	メタルパウダー: {
		name: "メタルパウダー",
		fling: {
			basePower: 10
		},
		spriteonModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.species.name === "Ditto" && !pokemon.transformed) {
				return this.chainModify(2)
			}
		},
		itemUser: ["Ditto"],
		isNonstandard: "Past"
	},
	メトロノーム: {
		name: "メトロノーム",
		spritefling: {
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
	},
	ミクルのみ: {
		name: "ミクルのみ",
		spriteisBerry: true,
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
	},
	ふしぎのプレート: {
		name: "ふしぎのプレート",
		spriteonPlate: "Psychic",
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
	},
	きせきのタネ: {
		name: "きせきのタネ",
		fling: {
			basePower: 30
		},
		spriteonBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Grass") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	ものまねハーブ: {
		name: "ものまねハーブ",
		spritefling: {
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
	},
	ミストシード: {
		name: "ミストシード",
		spritefling: {
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
	},
	ちからのハチマキ: {
		name: "ちからのハチマキ",
		spritefling: {
			basePower: 10
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === "Physical") {
				return this.chainModify([4505, 4096])
			}
		},
	},
	しんぴのしずく: {
		name: "しんぴのしずく",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Water") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	とけないこおり: {
		name: "とけないこおり",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ice") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	ノーマルジュエル: {
		name: "ノーマルジュエル",
		spriteisGem: true,
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
	},
	オッカのみ: {
		name: "オッカのみ",
		spriteisBerry: true,
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
	},
	オレンのみ: {
		name: "オレンのみ",
		spriteisBerry: true,
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
	},
	イトケのみ: {
		name: "イトケのみ",
		spriteisBerry: true,
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
	},
	ウタンのみ: {
		name: "ウタンのみ",
		spriteisBerry: true,
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
	},
	モモンのみ: {
		name: "モモンのみ",
		spriteisBerry: true,
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
	},
	キーのみ: {
		name: "キーのみ",
		spriteisBerry: true,
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
	},
	ヤタピのみ: {
		name: "ヤタピのみ",
		spriteisBerry: true,
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
	},
	せいれいプレート: {
		name: "せいれいプレート",
		spriteonPlate: "Fairy",
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
	},
	どくバリ: {
		name: "どくバリ",
		spritefling: {
			basePower: 70,
			status: "psn"
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Poison") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	パワーアンクル: {
		name: "パワーアンクル",
		spriteignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
	},
	パワーバンド: {
		name: "パワーバンド",
		spriteignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
	},
	パワーベルト: {
		name: "パワーベルト",
		spriteignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
	},
	パワーリスト: {
		name: "パワーリスト",
		spriteignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
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
		spritefling: {
			basePower: 10
		},
	},
	パワーレンズ: {
		name: "パワーレンズ",
		spriteignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
	},
	パワーウエイト: {
		name: "パワーウエイト",
		spriteignoreKlutz: true,
		fling: {
			basePower: 70
		},
		onModifySpe(spe) {
			return this.chainModify(0.5)
		},
	},
	サイコシード: {
		name: "サイコシード",
		spritefling: {
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
	},
	パンチグローブ: {
		name: "パンチグローブ",
		spritefling: {
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
		spritefling: {
			basePower: 80
		},
	},
	スピードパウダー: {
		name: "スピードパウダー",
		spritefling: {
			basePower: 10
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.name === "Ditto" && !pokemon.transformed) {
				return this.chainModify(2)
			}
		},
		itemUser: ["Ditto"],
		isNonstandard: "Past"
	},
	チーゴのみ: {
		name: "チーゴのみ",
		spriteisBerry: true,
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
	},
	するどいツメ: {
		name: "するどいツメ",
		spritefling: {
			basePower: 80
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1
		},
	},
	するどいキバ: {
		name: "するどいキバ",
		spritefling: {
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
	},
	レッドカード: {
		name: "レッドカード",
		spritefling: {
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
	},
	リンドのみ: {
		name: "リンドのみ",
		spriteisBerry: true,
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
	},
	ねらいのまと: {
		name: "ねらいのまと",
		spritefling: {
			basePower: 10
		},
		onNegateImmunity: false,
	},
	ゴツゴツメット: {
		name: "ゴツゴツメット",
		spritefling: {
			basePower: 60
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 6, source, target)
			}
		},
	},
	ルームサービス: {
		name: "ルームサービス",
		spritefling: {
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
	},
	ロゼルのみ: {
		name: "ロゼルのみ",
		spriteisBerry: true,
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
	},
	レンブのみ: {
		name: "レンブのみ",
		spriteisBerry: true,
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
	},
	くちたたて: {
		name: "くちたたて",
		spriteonTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 889) ||
				pokemon.baseSpecies.num === 889
			) {
				return false
			}
			return true
		},
		itemUser: ["Zamazenta-Crowned"],
	},
	くちたけん: {
		name: "くちたけん",
		spriteonTakeItem(item, pokemon, source) {
			if (
				(source && source.baseSpecies.num === 888) ||
				pokemon.baseSpecies.num === 888
			) {
				return false
			}
			return true
		},
		itemUser: ["Zacian-Crowned"],
	},
	ぼうじんゴーグル: {
		name: "ぼうじんゴーグル",
		spritefling: {
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
	},
	カムラのみ: {
		name: "カムラのみ",
		spriteisBerry: true,
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
	},
	ピントレンズ: {
		name: "ピントレンズ",
		spritefling: {
			basePower: 30
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1
		},
	},
	するどいくちばし: {
		name: "するどいくちばし",
		spritefling: {
			basePower: 50
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === "Flying") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	きれいなぬけがら: {
		name: "きれいなぬけがら",
		spritefling: {
			basePower: 10
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false
		},
	},
	かいがらのすず: {
		name: "かいがらのすず",
		spritefling: {
			basePower: 30
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 8, pokemon)
			}
		},
	},
	シュカのみ: {
		name: "シュカのみ",
		spriteisBerry: true,
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
	},
	シルクのスカーフ: {
		name: "シルクのスカーフ",
		spritefling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Normal") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	ぎんのこな: {
		name: "ぎんのこな",
		spritefling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Bug") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	オボンのみ: {
		name: "オボンのみ",
		spriteisBerry: true,
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
	},
	あおぞらプレート: {
		name: "あおぞらプレート",
		spriteonPlate: "Flying",
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
	},
	さらさらいわ: {
		name: "さらさらいわ",
		spritefling: {
			basePower: 10
		},
	},
	ゆきだま: {
		name: "ゆきだま",
		spritefling: {
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
	},
	やわらかいすな: {
		name: "やわらかいすな",
		spritefling: {
			basePower: 10
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ground") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	のろいのおふだ: {
		name: "のろいのおふだ",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Ghost") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	しずくプレート: {
		name: "しずくプレート",
		spriteonPlate: "Water",
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
	},
	もののけプレート: {
		name: "もののけプレート",
		spriteonPlate: "Ghost",
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
	},
	スターのみ: {
		name: "スターのみ",
		spriteisBerry: true,
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
	},
	くっつきバリ: {
		name: "くっつきバリ",
		spritefling: {
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
	},
	がんせきプレート: {
		name: "がんせきプレート",
		spriteonPlate: "Rock",
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
	},
	タンガのみ: {
		name: "タンガのみ",
		spriteisBerry: true,
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
	},
	グランドコート: {
		name: "グランドコート",
		spritefling: {
			basePower: 60
		},
	},
	のどスプレー: {
		name: "のどスプレー",
		spritefling: {
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
	},
	どくどくだま: {
		name: "どくどくだま",
		spritefling: {
			basePower: 30,
			status: "tox"
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus("tox", pokemon)
		},
	},
	もうどくプレート: {
		name: "もうどくプレート",
		spriteonPlate: "Poison",
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
	},
	まがったスプーン: {
		name: "まがったスプーン",
		spritefling: {
			basePower: 30
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === "Psychic") {
				return this.chainModify([4915, 4096])
			}
		},
	},
	ばんのうがさ: {
		name: "ばんのうがさ",
		spritefling: {
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
	},
	ソクノのみ: {
		name: "ソクノのみ",
		spriteisBerry: true,
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
	},
	じゃくてんほけん: {
		name: "じゃくてんほけん",
		spritefling: {
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
	},
	いどのめん: {
		name: "いどのめん",
		spritefling: {
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
	},
	しろいハーブ: {
		name: "しろいハーブ",
		spritefling: {
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
	},
	こうかくレンズ: {
		name: "こうかくレンズ",
		spritefling: {
			basePower: 10
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === "number") {
				return this.chainModify([4505, 4096])
			}
		},
	},
	ウイのみ: {
		name: "ウイのみ",
		spriteisBerry: true,
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
	},
	ものしりメガネ: {
		name: "ものしりメガネ",
		spritefling: {
			basePower: 10
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (move.category === "Special") {
				return this.chainModify([4505, 4096])
			}
		},
	},
	ヤチェのみ: {
		name: "ヤチェのみ",
		spriteisBerry: true,
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
	},
	いかずちプレート: {
		name: "いかずちプレート",
		spriteonPlate: "Electric",
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
	},
	フォーカスレンズ: {
		name: "フォーカスレンズ",
		spritefling: {
			basePower: 10
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === "number" && !this.queue.willMove(target)) {
				this.debug("フォーカスレンズ boosting accuracy")
				return this.chainModify([4915, 4096])
			}
		},
	},
}
