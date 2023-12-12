// import { Pokemon } from "types/Pokemon";
import { Moves } from "data/Movedex";
import { pokemonMap, Pokemon } from "./data/pokemon";
import { addOutput } from "./gui";

//HPなどの管理
let u_pokes: { [key: string]: Pokemon } = {};
let e_pokes: { [key: string]: Pokemon } = {};
//場に出ているポケモンの名前
let u_name: string;
let e_name: string;
export function getPP(name: string, skill: string, side: string): number {
  if (side == "user") return u_pokes[name].pp[skill]; //todo after:movedex
  else return e_pokes[name].moves;
}
export function setPokemonTeam(user_poke_names: string[], enemy_poke_names: string[]) {
  // 配列をループして、各名前に対応するポケモンを追加
  user_poke_names.forEach((name) => {
    u_pokes[name] = pokemonMap[name];
  });
  enemy_poke_names.forEach((name) => {
    e_pokes[name] = pokemonMap[name];
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
export function runEvent(user_move: string, enemy_move: string, isUserChange: boolean, isEnemyChange: boolean) {
  console.log(user_move, enemy_move, isUserChange, isEnemyChange);
  console.log(u_pokes);
  if (compareSpeed() === "user") {
    !isUserChange && addOutput(`(user)${u_name}の${user_move}`);
    !isEnemyChange && addOutput(`(enemy)${e_name}の${enemy_move}`);
  } else {
    !isEnemyChange && addOutput(`(enemy)${e_name}の${enemy_move}`);
    !isUserChange && addOutput(`(user)${u_name}の${user_move}`);
  }

  function calcDamage() {

  }
  return [u_pokes[u_name].hp, e_pokes[e_name].hp];
}
