# 処理のフロー

### 戦闘開始

- どのポケモンを出すか選択
- 確定

### ターン開始

- わざの選択
- 交代の選択

### 急所か外したか

- とくせい、持ち物の設定

### ダメージ計算

- とくせい、持ち物の設定

### ランクの保持

### ステータスの管理

- ランク
- HP
- など

### グローバル変数

```js
const run = document.getElementById("run");
const fix_select = document.getElementById("selectpokemon");
const u_switch = document.getElementById("user_switch");
const e_switch = document.getElementById("enemy_switch");
const u_skill = document.getElementById("user_skill");
const e_skill = document.getElementById("enemy_skill");
const u_select = document.getElementById("user_select").querySelectorAll("input");
const e_select = document.getElementById("enemy_select").querySelectorAll("input");
const u_change = document.getElementById("user_change");
const e_change = document.getElementById("enemy_change");
const output = document.getElementById("output");
let u_pokes = {}; //チームのポケモン(struct)
let e_pokes = {};
let u_poke = ""; //現在出ているポケモン(name)
let e_poke = "";
var u_names; //チームのポケモン([name])
var e_names;
const character = {};
const skill_effects = {};
const items = {};
```

## pokemon{}

| 0    | 1   | 2    | 3    | 4    | 5    | 6      | 7    | 8      | 9      | 10     | 11     | 12     | 13       |
| ---- | --- | ---- | ---- | ---- | ---- | ------ | ---- | ------ | ------ | ------ | ------ | ------ | -------- |
| type | HP  | 攻撃 | 防御 | 特攻 | 特防 | 素早さ | 特性 | 持ち物 | わざ 1 | わざ 2 | わざ 3 | わざ 4 | {"rank"} |

## damage_rank

| index | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rate  | 2/8 | 2/7 | 2/6 | 2/5 | 2/4 | 2/3 | 2/2 | 3/2 | 4/2 | 5/2 | 6/2 | 7/2 | 8/2 |
| rank  | -6  | -5  | -4  | -3  | -2  | -1  | 0   | 1   | 2   | 3   | 4   | 5   | 6   |

## rank

| こうげき | ぼうぎょ | とくこう | とくぼう | すばやさ | めいちゅう | かいひ | きゅうしょ |
| -------- | -------- | -------- | -------- | -------- | ---------- | ------ | ---------- |


## skills

| 0    | 1        | 2     | 3   | 4   | 5    | 6     | 7      | 8           |
| ---- | -------- | ----- | --- | --- | ---- | ----- | ------ | ----------- |
| type | category | power | hit | PP  | 接触 | guard | target | description |

## items, character, skill_effects

```json
"name":{"when":"code"}
```