// import { Pokemon } from "types/Pokemon";
import { pokemonMap, Pokemon } from "./data/pokemon";
import { addOutput } from "./gui";
import { calcDamage } from "./calcDamage";

//HPなどの管理
let u_pokes: { [key: string]: Pokemon } = {};
let e_pokes: { [key: string]: Pokemon } = {};
//場に出ているポケモンの名前
let u_name: string;
let e_name: string;
export function getHP(name: string, side: string) {
  if (side == "user") return u_pokes[name].hp; //todo after:movedex
  else return e_pokes[name].hp;
}
export function getPP(name: string, skill: string, side: string): number {
  if (side == "user") return u_pokes[name].pp[skill]; //todo after:movedex
  else return e_pokes[name].pp[skill];
}
export function setPokemonTeam(user_poke_names: string[], enemy_poke_names: string[]) {
  // 配列をループして、各名前に対応するポケモンを追加する
  user_poke_names.forEach((name) => {
    u_pokes[name] = { ...pokemonMap[name] };
  });
  enemy_poke_names.forEach((name) => {
    e_pokes[name] = { ...pokemonMap[name] };
  });
}
export function setPokemonName(name: string, side: string) {
  if (side == "user") u_name = name;
  else e_name = name;
}
export function compareSpeed() {
  //todo:トリックルーム
  //todo:場の状態:道具:特性
  //todo:まひ状態
  //todo:優先度:下位優先度
  if (u_pokes[u_name].speed > e_pokes[e_name].speed) {
    return "user";
  } else if (u_pokes[u_name].speed === e_pokes[e_name].speed) {
    return Math.random() < 0.5 ? "user" : "enemy";
  } else {
    return "enemy";
  }
}
// メイン関数. ターンを進める
export function runEvent(user_move: string, enemy_move: string, isUserChange: boolean, isEnemyChange: boolean) {
  console.log(user_move, enemy_move, isUserChange, isEnemyChange);
  if (compareSpeed() === "user") {
    if (!isUserChange) {
      const damage = calcDamage(u_pokes[u_name], e_pokes[e_name], user_move);
      addOutput(`☖${u_name}の${user_move}<br>┗ ${e_name}に${damage}のダメージ`);
      e_pokes[e_name].hp -= damage;
      u_pokes[u_name].pp[user_move] -= 1;
    }
    if (!isEnemyChange && e_pokes[e_name].hp > 0) {
      const damage = calcDamage(u_pokes[u_name], e_pokes[e_name], enemy_move);
      addOutput(`☗${e_name}の${enemy_move}<br>┗${u_name}に${damage}のダメージ`);
      u_pokes[u_name].hp -= damage;
      e_pokes[e_name].pp[enemy_move] -= 1;
    }
  } else {
    if (!isEnemyChange) {
      const damage = calcDamage(u_pokes[u_name], e_pokes[e_name], enemy_move);
      addOutput(`☗${e_name}の${enemy_move}<br>┗${u_name}に${damage}のダメージ`);
      u_pokes[u_name].hp -= damage;
      e_pokes[e_name].pp[enemy_move] -= 1;
    }
    if (!isUserChange && u_pokes[u_name].hp > 0) {
      const damage = calcDamage(u_pokes[u_name], e_pokes[e_name], user_move);
      addOutput(`☖${u_name}の${user_move}<br>┗ ${e_name}に${damage}のダメージ`);
      e_pokes[e_name].hp -= damage;
      u_pokes[u_name].pp[user_move] -= 1;
    }
  }

  return [u_pokes[u_name].hp, e_pokes[e_name].hp];
}
