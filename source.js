class Pokemon {
    constructor(name, type, hp, attack, defense, tokukou, tokubou, speed, tokusei, item, skill1, skill2, skill3, skill4) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.tokukou = tokukou;
        this.tokubou = tokubou;
        this.speed = speed;
        this.tokusei = tokusei;
        this.item = item;
        this.skills = [skill1, skill2, skill3, skill4];
        this.rank = init_rank
    }
    get(poke_name) {
        const pokemon = pokemonMap[poke_name];
        return JSON.parse(JSON.stringify(pokemon));
    }
}
const getPokemon = (poke_name) => {
    const poke = pokemonMap[poke_name]
    return poke.get(poke_name)
}
const skill_effects = {
    "ツタこんぼう": { "damage": "vital_rank += 1" }
}
class Skill {
    constructor(name, type, category, power, hit, pp, direct, guard, target, phazes) {
        this.name = name
        this.type = type
        this.category = category
        this.power = power
        this.hit = hit
        this.pp = pp
        this.direct = direct
        this.guard = guard
        this.target = target
        this.phazes = phazes
    }
    activate(attacker, defender, phaze) {
    }
    get(skill_name) {
        return skillMap[skill_name]
    }
}
const getSkill = (skill_name) => {
    const skill = skillMap[skill_name]
    return skill.get(skill_name)
}
class Tokusei {
    constructor(name, phazes) {
        this.name = name; // 特性の名前
        this.phazes = phazes; // 特性の効果の発動関数のマップ
    }

    // 特性の効果を発動するメソッド
    activate(attacker, defender, phaze) {
        if (this.phazes[phaze]) {
            this.phazes[phaze](attacker, defender);
            console.log(`発動：${defender.name}の${defender.tokusei}`);
        } else {
            console.log(`Unknown phaze: ${phaze}`);
        }
    }
}
const activateTokusei = (attacker, defender, phaze) => {
    const tokusei = tokuseiMap[defender.tokusei]; // 特性のオブジェクトを取得
    if (tokusei) {
        tokusei.activate(attacker, defender, phaze); // 特性を発動
    } else {
        console.log(`Unknown tokusei: ${defender.tokusei}`);
    }
    return [attacker, defender]
}
const hit_rate = [3 / 9, 3 / 8, 3 / 7, 3 / 6, 3 / 5, 3 / 4, 3 / 3, 4 / 3, 5 / 3, 6 / 3, 7 / 3, 8 / 3, 9 / 3]
const damage_rank = [2 / 8, 2 / 7, 2 / 6, 2 / 5, 2 / 4, 2 / 3, 2 / 2, 3 / 2, 4 / 2, 5 / 2, 6 / 2, 7 / 2, 8 / 2]
const init_rank = {
    "こうげき": 0,
    "ぼうぎょ": 0,
    "とくこう": 0,
    "とくぼう": 0,
    "すばやさ": 0,
    "めいちゅう": 0,
    "かいひ": 0,
    "きゅうしょ": 0,
}