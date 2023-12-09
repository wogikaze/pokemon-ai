import { Pokedex } from "data/Pokedex";
import { pokemonMap } from "./data/pokemon";

const getElement = (id: string) => document.getElementById(id) as HTMLElement;
declare global {
  interface Window {
    run: HTMLElement | null;
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
if (isDevelop) {
  window.run = getElement("run");
  window.fix_select = getElement("selectpokemon");
  window.u_skill = getElement("user_skill");
  window.e_skill = getElement("enemy_skill");
  window.u_select = getElement("user_select");
  window.e_select = getElement("enemy_select");
  window.u_switch = getElement(`user_switch`) as HTMLSelectElement;
  window.e_switch = getElement(`enemy_switch`) as HTMLSelectElement;
  window.u_change = getElement("user_change") as HTMLInputElement;
  window.e_change = getElement("enemy_change") as HTMLInputElement;
  window.output = getElement("output");
  window.settings = getElement("settings");
  window.buttle = getElement("buttle");
  window.pagetitle = getElement("pagetitle");
}
const run = getElement("run");
const fix_select = getElement("selectpokemon");
const u_skill = getElement("user_skill");
const e_skill = getElement("enemy_skill");
const u_select = getElement("user_select");
const e_select = getElement("enemy_select");
const u_switch = getElement(`user_switch`) as HTMLSelectElement;
const e_switch = getElement(`enemy_switch`) as HTMLSelectElement;
const u_change = getElement("user_change") as HTMLInputElement;
const e_change = getElement("enemy_change") as HTMLInputElement;
const output = getElement("output");
const settings = getElement("settings");
const buttle = getElement("buttle");
const pagetitle = getElement("pagetitle");

/* 4体選択の作成 */
u_select.innerHTML = make_select_box(Object.keys(pokemonMap));
e_select.innerHTML = make_select_box(Object.keys(pokemonMap));

/* 場に出すポケモンの選択更新 */
const update_poke_slects = (select: string) => {
  const pokemon = getElement("user_select").querySelectorAll("input");
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
};
update_poke_slects("user");
update_poke_slects("enemy");

u_select.addEventListener("change", () => update_poke_slects("user"));
e_select.addEventListener("change", () => update_poke_slects("enemy"));

function make_select_box(names: string[]) {
  // create html array of options as `<label><input type="checkbox">カイリュー</label><br>`
  let html = "";
  for (let i = 0; i < names.length; i++) {
    html += `<label><input type="checkbox">${names[i]}</label><br>`;
    if (isDevelop && i == 2) {
      html = html.replace(/checkbox/g, 'checkbox" checked="true"');
    }
  }
  return html;
}

fix_select.addEventListener("click", () => {
  if (u_select.querySelectorAll("input:checked").length !== 3) {
    alert("3体選べ");
  } else if (e_select.querySelectorAll("input:checked").length !== 3) {
    alert("3体選べ");
  } else {
    settings.style.display = "none";
    // ポケモンの名前表示
    set_pokemon_name(u_switch.value, "user");
    set_pokemon_name(e_switch.value, "enemy");
    // 技選択表示
    set_skill_select(pokemonMap[u_switch.value].moves, "user");
    set_skill_select(pokemonMap[e_switch.value].moves, "enemy");
    // ステータス表示
    set_hp(pokemonMap[u_switch.value].hp, "user");
    set_hp(pokemonMap[e_switch.value].hp, "enemy");
  }
});

function set_pokemon_name(name: string, side: string) {
  const name_div = getElement(`${side}_name`);
  name_div.textContent = name;
}
function set_skill_select(skills: string[], side: string) {
  const update_user = () => {
    u_skill.innerHTML = "";
    skills.forEach(function (skill) {
      var option = document.createElement("option");
      option.value = skill;
      option.textContent = skill;
      u_skill.appendChild(option);
    });
  };
  const update_enemy = () => {
    e_skill.innerHTML = "";
    skills.forEach(function (skill) {
      var option = document.createElement("option");
      option.value = skill;
      option.textContent = skill;
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
function set_hp(hp: number, side: string) {
  const u_hp = getElement("user_hp");
  const e_hp = getElement("enemy_hp");
  if (side == "user") {
    u_hp.textContent = hp.toString();
  } else {
    e_hp.textContent = hp.toString();
  }
}
// 交代ボタンの動作
u_change.addEventListener("click", () => {
  if (u_change.checked) {
    // set_skill_select(pokemonMap[u_name].moves, "user");
  } else {
    // set_skill_select(pokemonMap[u_name].moves, "user");
  }
});
e_change.addEventListener("click", () => {});
