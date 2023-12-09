import { pokemonMap } from "data/pokemon";

const getElement = (id: string) => document.getElementById(id) as HTMLElement;

const run = getElement("run");
const fix_select = getElement("selectpokemon");
const u_switch = getElement("user_switch");
const e_switch = getElement("enemy_switch");
const u_skill = getElement("user_skill");
const e_skill = getElement("enemy_skill");
const u_select = getElement("user_select");
const e_select = getElement("enemy_select");
const u_change = getElement("user_change");
const e_change = getElement("enemy_change");
const u_hp = getElement("user_hp");
const e_hp = getElement("enemy_hp");
const output = getElement("output");
const settings = getElement("settings");
const buttle = getElement("buttle");
const pagetitle = getElement("pagetitle");

function setup(isDevelop: boolean) {
    if (isDevelop) { }
    // u_select.innerHTML = make_select_box(pokemonMap.map(p => p.name))
    console.log(pokemonMap)
    e_select.innerHTML = make_select_box(["aaaaaaaaaa", "bbb"])
}
setup(true)
function make_select_box(names: string[]) {
    // create html array of options as `<label><input type="checkbox">カイリュー</label><br>`
    let html = "";
    for (let i = 0; i < names.length; i++) {
        html += `<label><input type="checkbox">${names[i]}</label><br>`;
    }
    return html;
}