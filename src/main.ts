// import { Pokemon } from "types/Pokemon";
import { pokemonMap, Pokemon } from "./data/pokemon";
import { addOutput } from "./gui";

let u_pokes: { [key: string]: Pokemon } = {};
let e_pokes: { [key: string]: Pokemon } = {};
let u_name: string;
let e_name: string;
export function getPP(name: string, side: string) {
  if (side == "user") return u_pokes[name].moves; //todo after:movedex
  else return e_pokes[name].moves;
}
export function setPokemonTeam(user_poke_names: string[], enemy_poke_names: string[]) {
  // 配列をループして、各名前に対応するポケモンをselectedPokemonに追加
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
export function runEvent(user_move: string, enemy_move: string, isUserChange: boolean, isEnemyChange: boolean) {
  console.log(user_move, enemy_move, isUserChange, isEnemyChange);
  console.log(u_pokes);

  !isUserChange && addOutput(`(user)${u_name}の${user_move}`);
  !isEnemyChange && addOutput(`(enemy)${e_name}の${enemy_move}`);

  return [u_pokes[u_name].hp, e_pokes[e_name].hp];
  function compareSpeed() {
    //todo:トリックルーム
    //todo:場の状態:道具:特性
    //todo:まひ状態
    //todo:優先度:下位優先度
    // if (u_poke.speed > e_poke.speed) {
    //   return true;
    // } else if (u_poke.speed === e_poke.speed) {
    //   return Math.random() < 0.5 ? 0 : 1;
    // } else {
    //   return false;
    // }
  }
}
