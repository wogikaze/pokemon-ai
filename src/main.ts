import { addOutput, setPokemoName } from "./gui";
addOutput("");

export function runEvent(user_move: string, enemy_move: string, isUserChange: boolean, isEnemyChange: boolean) {
  console.log(user_move, enemy_move, isUserChange, isEnemyChange);
  addOutput(`(user)${user_move}`);
  addOutput(`(enemy)${enemy_move}`);
}
