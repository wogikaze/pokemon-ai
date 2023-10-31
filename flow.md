# 処理のフロー

### 戦闘開始

- どのポケモンを出すか選択
- 確定

### ターン開始

- わざの選択
- 交代の選択

### 行動順

- 優先度

### 急所か外したか

- 命中判定
- とくせい、持ち物の設定

### ダメージ計算

- とくせい、持ち物の設定

### ランクの保持

### ステータスの管理

- ランク done
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
|          |          |          |          |          |            |        |            |

## skills

| 0    | 1        | 2     | 3   | 4   | 5    | 6     | 7      | 8           |
| ---- | -------- | ----- | --- | --- | ---- | ----- | ------ | ----------- |
| type | category | power | hit | PP  | 接触 | guard | target | description |

## items, character, skill_effects

# 場の状態

### てんき
- にほんばれ、あめ、すなあらし、ゆき、おおひでり、らんきりゅう、おおあめ
- 残りターン
### 味方の場に発生

```json
"name":{"when":"code"}
```

when

- damage:ダメージを与える前の効果
- afterturn:行動を終えた後
- out:ポケモンを出したとき
- in:ポケモンを戻したとき
- isdamage:命中判定
- calchp:HP 計算時
- afterdamage:ダメージ計算後

# 交代処理

```mermaida
graph TD;
Aのターン-->Bにダメージ-->BのHP判定;
BのHP判定-->Aのeffects;
Aのeffects-->B死に出し;
Aのeffects-->AのHP判定-->A死に出し;
```

# 処理

```mermaida
graph TD;
開始-->ポケモン出す-->2出現時発動特性-->a出現時発動わざ-->b障害物;
b障害物-->c出現時発動の特性-->dふうせん,きのみ,きのみジュース-->3,8-->行動選択-->1,5-->優先度-->素早さ/優先度で攻撃-->ターン終了;

```
2出現時発動特性  
・1`かがくへんかガス`  
・2`きんちょうかん`,`じんばいったい`

a出現時発動わざ  
・`いやしのねがい`,`みかづきのまい`

b障害物  
・`まきびし`,`どくびし`,`ステルスロック`,`ねばねばネット`

c出現時発動特性
```
あめふらし,いかく,エアロック,エレキメイカー,オーラブレイク,おみとおし
かたやぶり,かわりもの,きけんよち,きみょうなくすり,グラスメイカー,サイコメイカー
すなおこし,スロースタート[1],ダークオーラ,ターボブレイズ,ダウンロード,テラボルテージ
トレース,ノーてんき,バリアフリー,ひでり,フェアリーオーラ,ふくつのたて
ふとうのけん,プレッシャー,ミストメイカー,ゆきふらし,よちむ
```

dふうせん,きのみ,きのみジュース  
4ぎょぐん  
5ルームサービス  
6フラワーギフト
7しろいハーブ  
8だっしゅつパック  
・交代

2行動選択  
    1「せんせいのツメ」「イバンのみ」、「クイックドロウ」が発動したらここでアナウンス  
    ※ 複数体で発動した場合はすばやさ・優先度・技や特性の効果による行動順に処理される  
    2降参  
    3ポケモンを交換  
    4ダイマックス  
    5技準備  
    ・「きあいパンチ」「トラップシェル」「くちばしキャノン」 

3攻撃
