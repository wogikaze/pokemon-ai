// // ダメージ

import { Moves } from "./data/Movedex";
import { Pokemon } from "./data/pokemon";

export function calcDamage(
  attacker: Pokemon,
  defender: Pokemon,
  skillName: string,
  // --攻撃者のテラスタイプ--
  random?: number // (もしあれば)固定したい乱数
) {
  //初期化
  let kougeki_types = attacker.type;
  let power = attacker.attack;
  let tokukou = attacker.specialAttack;
  let power_rank = attacker.rank?.["こうげき"];
  let tokukou_rank = attacker.rank?.["とくこう"];
  let meityu_rank = attacker.rank?.["めいちゅう"];
  let kougeki_hosei = 4096;

  let defender_types = defender.type;
  let bougyo_first = defender.defense;
  let tokubou = defender.specialDefense;
  let bougyo_rank_first = defender.rank?.["ぼうぎょ"];
  let tokubou_rank_first = defender.rank?.["とくぼう"];
  let kaihi_rank = defender.rank?.["かいひ"];
  let bougyo_hosei = 4096;

  const skill = Moves[skillName];
  let skill_type = skill.type;
  let skill_category = skill.category;
  let skill_power = skill.basePower;
  //   let skill_sessyoku = skill.direct;
  //   let skill_hosei = 4096;

  var phaze = "damage";
  const level = 50; // 攻撃者レベル(50固定)

  // 特性判定(仮)
  //   activateTokusei(attacker, defender, "calc_damage");

  // 下準備
  let isphysic = skill_category == "物理"; 
  let kougeki = isphysic ? power : tokukou;
  let kougeki_rank = isphysic ? power_rank : tokukou_rank;
  let bougyo = isphysic ? bougyo_first : tokubou;
  let bougyo_rank = isphysic ? bougyo_rank_first : tokubou_rank_first;
  let type_rate = () => {
    let skill_type_i = types.indexOf(skill_type);
    let defender_types_i = defender_types.map((type) => types.indexOf(type));
    let rate = 1;
    defender_types_i.forEach((type) => {
      rate *= type_rates[skill_type_i][type];
    });
    return rate;
  };
  let vital_rank = 0;
  if (check_hit(skill.accuracy, meityu_rank, kaihi_rank) === false) {
    // document.getElementById("output").innerText += "命中失敗：";
    return 0;
  }

  // ここまで下準備

  const is_vital = check_vital(vital_rank); // 急所かどうか
  if (is_vital) {
    if (kougeki_rank < 0) kougeki_rank = 0;
    if (bougyo_rank < 0) bougyo_rank = 0;
    // さらに「リフレクター」「ひかりのかべ」「オーロラベール」によるダメージ軽減補正を無視します。
  }

  let damage_1 = Math.floor((level * 2) / 5 + 2);
  let second = () => {
    if (roundHalfUpOrDown((skill_power * kougeki_hosei) / 4096) < 1) return 1;
    return roundHalfUpOrDown((skill_power * kougeki_hosei) / 4096);
    // アクロバット、エラがみ、でんげきくちばし、ダメおしの威力2倍は補正値ではなく、物理技(特殊技)の威力の部分が変わります。
    // テラスタイプと技のタイプが同じで60未満の場合は60にする(一部の技を除く)
  };
  let forth = () => {
    let damage_temp = Math.floor(kougeki * damage_rank[kougeki_rank + 6]);
    // 特性：はりきりx1.5
    damage_temp = roundHalfUpOrDown((damage_temp * kougeki_hosei) / 4096);
    if (damage_temp < 1) damage_temp = 1;
    return damage_temp;
  };
  let sixth = () => {
    let bougyo_temp = Math.floor(bougyo * damage_rank[bougyo_rank + 6]);
    // 場の状態：すなあらし(いわ)/ゆき(こおり)で1.5倍
    bougyo_temp = roundHalfUpOrDown((bougyo_temp * bougyo_hosei) / 4096);
    if (bougyo_temp < 1) bougyo_temp = 1;
    return bougyo_temp;
  };
  let damage_2 = Math.floor((damage_1 * second() * forth()) / sixth());
  let damage_3 = Math.floor(damage_2 / 50 + 2);
  // 複数対象
  // 特性：おやこあい
  // 天気弱化
  // 天気強化
  // きょけんとつげき
  let damage_4 = is_vital ? roundHalfUpOrDown(damage_3 * 1.5) : damage_3; //急所
  let damage_5 = random ? Math.floor(damage_4 * random) : Math.floor(damage_4 * randomnum());
  let damage_6 = kougeki_types.some((type) => type == skill_type) ? roundHalfUpOrDown(damage_5 * 1.5) : damage_5;
  // てきおうりょく,テラスタル
  let damage_7 = Math.floor(damage_6 * type_rate());
  // やけど
  let seventh = () => {
    // とくせいのダメージ補正
    return 4096;
  };
  let damage_8 = roundHalfUpOrDown((damage_7 * seventh()) / 4096);

  let last_damage = damage_8 < 1 && type_rate() != 0 ? 1 : damage_8;

  return last_damage;
}

function roundHalfUpOrDown(number: number) {
  // Math.floor()は切り捨て、Math.ceil()は切り上げを行います
  const decimalPart = number - Math.floor(number);
  if (decimalPart <= 0.5) {
    // 0.5以下なら切り捨て
    return Math.floor(number);
  } else {
    // 0.5より大きいなら切り上げ
    return Math.ceil(number);
  }
}
function randomnum() {
  var random = Math.floor(Math.random() * 16) + 85;
  return random / 100;
}

const types = [
  "ノーマル",
  "ほのお",
  "みず",
  "でんき",
  "くさ",
  "こおり",
  "かくとう",
  "どく",
  "じめん",
  "ひこう",
  "エスパー",
  "むし",
  "いわ",
  "ゴースト",
  "ドラゴン",
  "あく",
  "はがね",
  "フェアリー",
];

const type_rates = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
  [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
];

//急所の判定
const check_vital = (vital_rank: number) => {
  const randomNumber = Math.random();
  if (randomNumber < vital_rate[vital_rank]) {
    return true;
  }
  return false;
};

//定数類
const vital_rate = [1 / 24, 1 / 8, 1 / 2, 1 / 1];
const hit_rate = [3 / 9, 3 / 8, 3 / 7, 3 / 6, 3 / 5, 3 / 4, 3 / 3, 4 / 3, 5 / 3, 6 / 3, 7 / 3, 8 / 3, 9 / 3]; // 命中率
const damage_rank = [2 / 8, 2 / 7, 2 / 6, 2 / 5, 2 / 4, 2 / 3, 2 / 2, 3 / 2, 4 / 2, 5 / 2, 6 / 2, 7 / 2, 8 / 2]; // ダメージランク

const check_hit = (skill_meityu: number | true, meityu_rank: number, kaihi_rank: number) => {
  let skill_accuracy = skill_meityu === true ? 100 : skill_meityu;
  let hit_rank = meityu_rank - kaihi_rank;
  // TODO: 特性・道具・場「じゅうりょく」・一撃必殺技
  // let meityu_hosei = 4096 * ... / 4096
  let meityu_hosei = 4096 / 4096;
  let rate = Math.floor(skill_accuracy * hit_rate[hit_rank + 6]);
  return Math.floor(Math.random() * 99) < rate;
};
