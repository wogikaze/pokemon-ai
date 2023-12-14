import { compareSpeed, getHP, getPP, runEvent, setPokemonName, setPokemonTeam } from "./main";
import { pokemonMap } from "./data/pokemon";
import { Moves } from "./data/Movedex";
import { isIndexSignatureDeclaration } from "typescript";

const getElement = (id: string) => document.getElementById(id) as HTMLElement;
const getInput = (id: string) => document.getElementById(id) as HTMLInputElement;
// 開発用グローバル変数
declare global {
  interface Window {
    run_turn: HTMLElement | null;
    fix_select: HTMLElement | null;
    u_skill: HTMLElement | null;
    e_skill: HTMLElement | null;
    u_select: HTMLElement | null;
    e_select: HTMLElement | null;
    u_switch: HTMLElement | null;
    e_switch: HTMLElement | null;
    u_change: HTMLElement | null;
    e_change: HTMLElement | null;
    output: HTMLElement | null;
    settings: HTMLElement | null;
    buttle: HTMLElement | null;
    pagetitle: HTMLElement | null;
  }
}
const isDevelop = true; //TODO: 外す

const run_turn = getElement("run_turn") as HTMLButtonElement;
const fix_select = getElement("selectpokemon") as HTMLButtonElement;
const u_skill = getElement("user_skill") as HTMLSelectElement;
const e_skill = getElement("enemy_skill") as HTMLSelectElement;
const u_select = getElement("user_select");
const e_select = getElement("enemy_select");
const u_switch = getElement(`user_switch`) as HTMLSelectElement;
const e_switch = getElement(`enemy_switch`) as HTMLSelectElement;
const u_change = getInput("user_change");
const e_change = getInput("enemy_change");
const output_ele = getElement("output");
const settings = getElement("settings");
const buttle = getElement("buttle");
const pagetitle = getElement("pagetitle");
// 開発用グローバル変数
if (isDevelop) {
  window.run_turn = run_turn;
  window.fix_select = fix_select;
  window.u_skill = u_skill;
  window.e_skill = e_skill;
  window.u_select = u_select;
  window.e_select = e_select;
  window.u_switch = u_switch;
  window.e_switch = e_switch;
  window.u_change = u_change;
  window.e_change = e_change;
  window.output = output_ele;
  window.settings = settings;
  window.buttle = buttle;
  window.pagetitle = pagetitle;
}
let turn_num = 1;

// 3体選択の作成
u_select.innerHTML = makeSelectBox(Object.keys(pokemonMap), [0, 1, 2]);
e_select.innerHTML = makeSelectBox(Object.keys(pokemonMap), [3, 4, 5]);
function makeSelectBox(names: string[], index: number[]) {
  // create html array of options as `<label><input type="checkbox">カイリュー</label><br>`
  let html = "";
  for (let i = 0; i < names.length; i++) {
    if (isDevelop && index.some((e) => e == i))
      html += `<label><input type="checkbox" name=${names[i]} checked>${names[i]}</label><br>`;
    else html += `<label><input type="checkbox" name=${names[i]}>${names[i]}</label><br>`;
  }
  return html;
}
/* 場に出すポケモンの選択更新 */
function updatePokeSlects(select: string) {
  const pokemon = getElement(`${select}_select`).querySelectorAll("input");
  const selects = getElement(`${select}_switch`);
  selects.innerHTML = "";
  pokemon.forEach((inputElement) => {
    if (inputElement.checked) {
      var option = document.createElement("option");
      option.value = inputElement.labels?.[0]?.textContent || "";
      option.textContent = inputElement.labels?.[0]?.textContent || "";
      selects.appendChild(option);
    }
  });
}
updatePokeSlects("user");
updatePokeSlects("enemy");
// 選ばれたポケモンが変更されたとき
u_select.addEventListener("change", () => updatePokeSlects("user"));
e_select.addEventListener("change", () => updatePokeSlects("enemy"));
// パーティーを固定
fix_select.addEventListener("click", () => {
  const u_checked = u_select.querySelectorAll("input:checked") as NodeListOf<HTMLInputElement>;
  const e_checked = e_select.querySelectorAll("input:checked") as NodeListOf<HTMLInputElement>;
  if (u_checked.length !== 3) {
    alert("3体選べ");
  } else if (e_checked.length !== 3) {
    alert("3体選べ");
  } else {
    if (!isDevelop) settings.style.display = "none";
    // ポケモンの名前表示
    getElement(`user_name`).textContent = u_switch.value;
    getElement(`enemy_name`).textContent = e_switch.value;

    // main()
    const u_poke_names = Array.from(u_checked).map((e) => e.name);
    const e_poke_names = Array.from(e_checked).map((e) => e.name);
    setPokemonName(u_switch.value, "user");
    setPokemonName(e_switch.value, "enemy");
    setPokemonTeam(u_poke_names, e_poke_names);

    // 技選択表示
    const userPP = pokemonMap[u_switch.value].moves.map((e) => getPP(u_switch.value, e, "user"));
    const enemyPP = pokemonMap[e_switch.value].moves.map((e) => getPP(e_switch.value, e, "enemy"));

    setSkillSelect(pokemonMap[u_switch.value].moves, "user", userPP); //todo after:movedex
    setSkillSelect(pokemonMap[e_switch.value].moves, "enemy", enemyPP);
    // ステータス表示
    setHp(pokemonMap[u_switch.value].hp, "user");
    setHp(pokemonMap[e_switch.value].hp, "enemy");
    setMaxhp(pokemonMap[u_switch.value].hp, "user");
    setMaxhp(pokemonMap[e_switch.value].hp, "enemy");
    // ターンを進めるボタンの有効化
    run_turn.disabled = false;
    // 交代ボタンの有効化
    u_change.disabled = false;
    e_change.disabled = false;
    fix_select.disabled = true;
  }
});

function setSkillSelect(skills: string[], side: string, pp?: number[]) {
  const update_user = () => {
    u_skill.innerHTML = "";
    skills.forEach(function (skill, i) {
      var option = document.createElement("option");
      option.value = skill;
      option.textContent = pp ? `${skill} ${pp?.[i]}/${Moves[skills[i]].pp}` : skill;
      option.disabled = pp?.[i] === 0 || (!pp && getHP(skills[i], "user") <= 0);
      u_skill.appendChild(option);
    });
  };
  const update_enemy = () => {
    e_skill.innerHTML = "";
    skills.forEach(function (skill, i) {
      var option = document.createElement("option");
      option.value = skill;
      option.textContent = pp ? `${skill} ${pp?.[i]}/${Moves[skills[i]].pp}` : skill;
      option.disabled = pp?.[i] === 0 || (!pp && getHP(skills[i], "enemy") <= 0);
      e_skill.appendChild(option);
    });
  };
  switch (side) {
    case "both":
      update_user();
      update_enemy();
      break;
    case "user":
      update_user();
      break;
    case "enemy":
      update_enemy();
      break;
    default:
      console.error("Error occurred");
      break;
  }
}
function setHp(hp: number, side: string) {
  const u_hp = getElement("user_hp");
  const e_hp = getElement("enemy_hp");
  if (side == "user") {
    u_hp.textContent = hp.toString();
    getInput("user_change").disabled = false;
  } else {
    e_hp.textContent = hp.toString();
    getInput("enemy_change").disabled = false;
  }
}
function setMaxhp(hp: number, side: string) {
  const u_maxhp = getElement("user_maxhp");
  const e_maxhp = getElement("enemy_maxhp");
  if (side == "user") {
    u_maxhp.textContent = hp.toString();
  } else {
    e_maxhp.textContent = hp.toString();
  }
}
// 交代ボタンの動作
function updateMoveSelect(side: string) {
  const name = getElement(`${side}_name`).textContent as string;
  if (getInput(`${side}_change`).checked) {
    const poke_names = Array.from(getElement(`${side}_select`).querySelectorAll("input:checked"))
      .map((element) => element as HTMLSelectElement)
      .map((e) => (e.labels[0].textContent ? e.labels[0].textContent : ""))
      .filter((e) => e !== name);
    setSkillSelect(poke_names, side);
  } else {
    const PP = pokemonMap[name].moves.map((e) => getPP(name, e, side));
    setSkillSelect(pokemonMap[name].moves, side, PP);
  }
}
u_change.addEventListener("click", () => updateMoveSelect("user"));
e_change.addEventListener("click", () => updateMoveSelect("enemy"));
// ターンを進めるボタンの動作
run_turn.addEventListener("click", () => {
  addOutput("", turn_num++); // ターンの表示
  // 交代の処理
  const userEvent = u_skill.value;
  const enemyEvent = e_skill.value;
  const isUserChange = u_change.checked;
  const isEnemyChange = e_change.checked;
  const userName = getElement("user_name").textContent as string;
  const enemyName = getElement("enemy_name").textContent as string;
  //PP
  const userPP = isUserChange ? pokemonMap[userEvent].moves.map((e) => getPP(userEvent, e, "user")) : undefined;
  const enemyPP = isEnemyChange ? pokemonMap[enemyEvent].moves.map((e) => getPP(enemyEvent, e, "enemy")) : undefined;
  // 交代の素早さ判定
  if (compareSpeed() === "user") {
    isUserChange && changePokemon(userEvent, pokemonMap[userEvent].moves, "user", userPP);
    isEnemyChange && changePokemon(enemyEvent, pokemonMap[enemyEvent].moves, "enemy", enemyPP);
  } else {
    isEnemyChange && changePokemon(enemyEvent, pokemonMap[enemyEvent].moves, "enemy", enemyPP);
    isUserChange && changePokemon(userEvent, pokemonMap[userEvent].moves, "user", userPP);
  }
  let user_hp: number;
  let enemy_hp: number;
  // 死に出しの条件
  const [isUserDead, isEnemyDead] = [getInput("user_change").disabled, getInput("enemy_change").disabled];
  if (isUserDead) {
    setPokemonName(userEvent, "user");
    setHp(getHP(userEvent, "user"), "user");
  }
  if (isEnemyDead) {
    setPokemonName(enemyEvent, "enemy");
    setHp(getHP(enemyEvent, "enemy"), "enemy");
  }
  if (isUserDead || isEnemyDead) return;

  //行動をする
  [user_hp, enemy_hp] = runEvent(userEvent, enemyEvent, isUserChange, isEnemyChange);
  setHp(user_hp, "user");
  setHp(enemy_hp, "enemy");
  //倒れたかどうかの判定
  if (user_hp <= 0 && enemy_hp <= 0) addOutput("同時に倒れたぞ！！バグるぞ！！"); //todo

  if (user_hp <= 0) {
    addOutput(`${userName}は倒れた`);
    u_change.checked = true;
    u_change.disabled = true;
    updateMoveSelect("user");
    if (!u_skill.value) {
      alert("敵の勝ち");
      endBattle();
    }
  }
  if (enemy_hp <= 0) {
    addOutput(`${enemyName}は倒れた`);
    e_change.checked = true;
    e_change.disabled = true;
    updateMoveSelect("enemy");
    if (!e_skill.value) {
      alert("自分の勝ち");
      endBattle();
    }
  }
  // PPの更新
  !isUserChange &&
    user_hp > 0 &&
    setSkillSelect(
      pokemonMap[userName].moves,
      "user",
      pokemonMap[userName].moves.map((e) => getPP(userName, e, "user"))
    );
  !isEnemyChange &&
    enemy_hp > 0 &&
    setSkillSelect(
      pokemonMap[enemyName].moves,
      "enemy",
      pokemonMap[enemyName].moves.map((e) => getPP(enemyName, e, "enemy"))
    );
});
// 交代の処理
export function changePokemon(name: string, moves: string[], side: string, pp?: number[]) {
  const oldpokemon_name = getElement(`${side}_name`);
  addOutput(`${side == "user" ? "☖" : "☗"}${oldpokemon_name.textContent}が${name}に交代した`); // 出力の表示
  oldpokemon_name.textContent = name; // 名前の表示更新
  pp ? setSkillSelect(moves, side, pp) : setSkillSelect(moves, side);
  getInput(`${side}_change`).checked = false;
  setMaxhp(pokemonMap[name].hp, side);
  setPokemonName(name, side);
}

// アウトプットの表示
export function addOutput(output: string, turn?: number) {
  if (turn && turn > 0) output_ele.innerHTML += `<div class="turn">ターン:${turn}</div>`;

  output !== "" ? (output_ele.innerHTML += `<div>${output}</div>`) : "";
}

//(別にいらないけど)バトルの終了
function endBattle() {
  run_turn.disabled = true;
}
