/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data/pokemon.ts":
/*!*****************************!*\
  !*** ./src/data/pokemon.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pokemonMap: () => (/* binding */ pokemonMap)\n/* harmony export */ });\nvar Pokemon = /** @class */ (function () {\n    function Pokemon(name, species, gender, item, ability, evs, nature, moves) {\n        this.name = name;\n        this.species = species;\n        this.gender = gender;\n        // this.type = Pokedex[species].types; // Assuming Pokedex is a predefined object\n        this.type = []; //todo\n        this.hp = evs.hp;\n        this.attack = evs.atk;\n        this.defense = evs.def;\n        this.specialAttack = evs.spa;\n        this.specialDefense = evs.spd;\n        this.speed = evs.spe;\n        this.nature = nature;\n        this.item = item;\n        this.ability = ability;\n        this.moves = moves;\n        this.rank = init_rank;\n    }\n    Pokemon.prototype.get = function (poke_name) {\n        var pokemon = pokemonMap[poke_name];\n        return JSON.parse(JSON.stringify(pokemon));\n    };\n    return Pokemon;\n}());\nvar init_rank = {\n    \"こうげき\": 0,\n    \"ぼうぎょ\": 0,\n    \"とくこう\": 0,\n    \"とくぼう\": 0,\n    \"すばやさ\": 0,\n    \"めいちゅう\": 0,\n    \"かいひ\": 0,\n    \"きゅうしょ\": 0,\n};\nvar pokemonMap = {\n    \"カイリュー\": new Pokemon(\"\", \"カイリュー\", \"\", \"ラムのみ\", \"\", { \"hp\": 195, \"atk\": 204, \"def\": 115, \"spa\": 108, \"spd\": 120, \"spe\": 104 }, \"マルチスケイル\", [\"しんそく\", \"じしん\", \"りゅうのまい\", \"アンコール\"]),\n    \"ハバタクカミ\": new Pokemon(\"\", \"ハバタクカミ\", \"\", \"こだわりメガネ\", \"\", { \"hp\": 131, \"atk\": 67, \"def\": 75, \"spa\": 187, \"spd\": 155, \"spe\": 205 }, \"こだいかっせい\", [\"ムーンフォース\", \"シャドーボール\", \"パワージェム\", \"マジカルフレイム\"]),\n    \"オーガポン(かまど)\": new Pokemon(\"\", \"オーガポン(かまど)\", \"\", \"かまどのめん\", \"\", { \"hp\": 187, \"atk\": 141, \"def\": 105, \"spa\": 93, \"spd\": 188, \"spe\": 151 }, \"かたやぶり\", [\"ツタこんぼう\", \"ウッドホーン\", \"アンコール\", \"こうごうせい\"]),\n    \"ガチグマ(あかつき)\": new Pokemon(\"\", \"ガチグマ(あかつき)\", \"\", \"シルクのスカーフ\", \"\", { \"hp\": 215, \"atk\": 67, \"def\": 141, \"spa\": 198, \"spd\": 86, \"spe\": 84 }, \"しんがん\", [\"ブラッドムーン\", \"だいちのちから\", \"ハイパーボイス\", \"あくび\"]),\n    \"パオジアン\": new Pokemon(\"\", \"パオジアン\", \"\", \"きあいのタスキ\", \"\", { \"hp\": 155, \"atk\": 172, \"def\": 101, \"spa\": 110, \"spd\": 85, \"spe\": 205 }, \"わざわいのつるぎ\", [\"つららおとし\", \"かみくだく\", \"こおりのつぶて\", \"せいなるつるぎ\"]),\n    \"サーフゴー\": new Pokemon(\"\", \"サーフゴー\", \"\", \"おんみつマント\", \"\", { \"hp\": 191, \"atk\": 58, \"def\": 140, \"spa\": 153, \"spd\": 111, \"spe\": 115 }, \"おうごんのからだ\", [\"ゴールドラッシュ\", \"でんじは\", \"たたりめ\", \"じこさいせい\"]),\n    \"ウーラオス(れんげき)\": new Pokemon(\"\", \"ウーラオス(れんげき)\", \"\", \"パンチグローブ\", \"\", { \"hp\": 175, \"atk\": 182, \"def\": 121, \"spa\": 83, \"spd\": 80, \"spe\": 163 }, \"ふかしのこぶし\", [\"すいりゅうれんだ\", \"インファイト\", \"アクアジェット\", \"れいとうパンチ\"]),\n    \"ハッサム\": new Pokemon(\"\", \"ハッサム\", \"\", \"とつげきチョッキ\", \"\", { \"hp\": 177, \"atk\": 200, \"def\": 121, \"spa\": 75, \"spd\": 100, \"spe\": 85 }, \"テクニシャン\", [\"バレットパンチ\", \"とんぼがえり\", \"はたきおとす\", \"インファイト\"]),\n    \"イーユイ\": new Pokemon(\"\", \"イーユイ\", \"\", \"こだわりスカーフ\", \"\", { \"hp\": 131, \"atk\": 90, \"def\": 100, \"spa\": 205, \"spd\": 140, \"spe\": 152 }, \"わざわいのたま\", [\"かえんほうしゃ\", \"あくのはどう\", \"テラバースト\", \"オーバーヒート\"]),\n    \"キョジオーン\": new Pokemon(\"\", \"キョジオーン\", \"\", \"イアのみ\", \"\", { \"hp\": 207, \"atk\": 120, \"def\": 200, \"spa\": 58, \"spd\": 110, \"spe\": 56 }, \"きよめのしお\", [\"しおづけ\", \"ボディプレス\", \"じこさいせい\", \"てっぺき\"]),\n    \"テツノツツミ\": new Pokemon(\"\", \"テツノツツミ\", \"\", \"ブーストエナジー\", \"\", { \"hp\": 131, \"atk\": 90, \"def\": 135, \"spa\": 176, \"spd\": 80, \"spe\": 206 }, \"クォークチャージ\", [\"ハイドロポンプ\", \"フリーズドライ\", \"クイックターン\", \"アンコール\"]),\n    \"ディンルー\": new Pokemon(\"\", \"ディンルー\", \"\", \"たべのこし\", \"\", { \"hp\": 261, \"atk\": 130, \"def\": 176, \"spa\": 67, \"spd\": 119, \"spe\": 65 }, \"わざわいのうつわ\", [\"じしん\", \"カタストロフィ\", \"ふきとばし\", \"ステルスロック\"]),\n    \"ランドロス(れいじゅう)\": new Pokemon(\"\", \"ランドロス(れいじゅう)\", \"\", \"オボンのみ\", \"\", { \"hp\": 165, \"atk\": 197, \"def\": 110, \"spa\": 112, \"spd\": 100, \"spe\": 157 }, \"いかく\", [\"じしん\", \"とんぼがえり\", \"がんせきふうじ\", \"ステルスロック\"]),\n    \"トドロクツキ\": new Pokemon(\"\", \"トドロクツキ\", \"\", \"こだわりハチマキ\", \"\", { \"hp\": 181, \"atk\": 191, \"def\": 91, \"spa\": 67, \"spd\": 121, \"spe\": 188 }, \"こだいかっせい\", [\"げきりん\", \"はたきおとす\", \"アイアンヘッド\", \"とんぼがえり\"]),\n    \"ヘイラッシャ\": new Pokemon(\"\", \"ヘイラッシャ\", \"\", \"カゴのみ\", \"\", { \"hp\": 257, \"atk\": 120, \"def\": 183, \"spa\": 76, \"spd\": 85, \"spe\": 56 }, \"てんねん\", [\"アクアブレイク\", \"あくび\", \"ねむる\", \"じわれ\"]),\n    \"キラフロル\": new Pokemon(\"\", \"キラフロル\", \"\", \"レッドカード\", \"\", { \"hp\": 190, \"atk\": 67, \"def\": 156, \"spa\": 150, \"spd\": 101, \"spe\": 107 }, \"どくげしょう\", [\"こらえる\", \"エナジーボール\", \"キラースピン\", \"ステルスロック\"]),\n    \"ガブリアス\": new Pokemon(\"\", \"ガブリアス\", \"\", \"イカサマダイス\", \"\", { \"hp\": 183, \"atk\": 182, \"def\": 116, \"spa\": 90, \"spd\": 105, \"spe\": 169 }, \"さめはだ\", [\"じしん\", \"スケイルショット\", \"つるぎのまい\", \"アイアンヘッド\"]),\n    \"キュウコン(アローラ)\": new Pokemon(\"\", \"キュウコン(アローラ)\", \"\", \"ひかりのねんど\", \"\", { \"hp\": 175, \"atk\": 78, \"def\": 107, \"spa\": 101, \"spd\": 120, \"spe\": 170 }, \"ゆきふらし\", [\"ムーンフォース\", \"ふぶき\", \"オーロラベール\", \"フリーズドライ\"]),\n    \"コノヨザル\": new Pokemon(\"\", \"コノヨザル\", \"\", \"でんきだま\", \"\", { \"hp\": 217, \"atk\": 135, \"def\": 100, \"spa\": 63, \"spd\": 111, \"spe\": 156 }, \"せいしんりょく\", [\"なげつける\", \"ステルスロック\", \"ふんどのこぶし\", \"いのちがけ\"]),\n    \"アーマーガア\": new Pokemon(\"\", \"アーマーガア\", \"\", \"バンジのみ\", \"\", { \"hp\": 205, \"atk\": 107, \"def\": 135, \"spa\": 73, \"spd\": 140, \"spe\": 64 }, \"ミラーアーマー\", [\"はねやすめ\", \"アイアンヘッド\", \"とんぼがえり\", \"ドリルくちばし\"]),\n    \"テツノドクガ\": new Pokemon(\"\", \"テツノドクガ\", \"\", \"ふうせん\", \"\", { \"hp\": 155, \"atk\": 81, \"def\": 80, \"spa\": 192, \"spd\": 130, \"spe\": 178 }, \"クォークチャージ\", [\"ほのおのまい\", \"ヘドロウェーブ\", \"エナジーボール\", \"とんぼがえり\"]),\n    \"ドヒドイデ\": new Pokemon(\"\", \"ドヒドイデ\", \"\", \"くろいヘドロ\", \"\", { \"hp\": 157, \"atk\": 83, \"def\": 224, \"spa\": 73, \"spd\": 163, \"spe\": 55 }, \"さいせいりょく\", [\"じこさいせい\", \"どくどく\", \"トーチカ\", \"くろいきり\"]),\n    \"ミミッキュ\": new Pokemon(\"\", \"ミミッキュ\", \"\", \"ひかりのこな\", \"\", { \"hp\": 131, \"atk\": 142, \"def\": 100, \"spa\": 63, \"spd\": 125, \"spe\": 162 }, \"ばけのかわ\", [\"じゃれつく\", \"でんじは\", \"みがわり\", \"のろい\"]),\n};\n\n\n//# sourceURL=webpack://pokemon-ai-fork/./src/data/pokemon.ts?");

/***/ }),

/***/ "./src/gui.ts":
/*!********************!*\
  !*** ./src/gui.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   add_output: () => (/* binding */ add_output),\n/* harmony export */   change_pokemon: () => (/* binding */ change_pokemon),\n/* harmony export */   set_pokemon_name: () => (/* binding */ set_pokemon_name)\n/* harmony export */ });\n/* harmony import */ var _data_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/pokemon */ \"./src/data/pokemon.ts\");\n\nvar getElement = function (id) { return document.getElementById(id); };\nvar getInput = function (id) { return document.getElementById(id); };\nvar isDevelop = true; //TODO: 外す\nvar run_turn = getElement(\"run_turn\");\nvar fix_select = getElement(\"selectpokemon\");\nvar u_skill = getElement(\"user_skill\");\nvar e_skill = getElement(\"enemy_skill\");\nvar u_select = getElement(\"user_select\");\nvar e_select = getElement(\"enemy_select\");\nvar u_switch = getElement(\"user_switch\");\nvar e_switch = getElement(\"enemy_switch\");\nvar u_change = getInput(\"user_change\");\nvar e_change = getInput(\"enemy_change\");\nvar output_ele = getElement(\"output\");\nvar settings = getElement(\"settings\");\nvar buttle = getElement(\"buttle\");\nvar pagetitle = getElement(\"pagetitle\");\n// 開発用グローバル変数\nif (isDevelop) {\n    window.run_turn = run_turn;\n    window.fix_select = fix_select;\n    window.u_skill = u_skill;\n    window.e_skill = e_skill;\n    window.u_select = u_select;\n    window.e_select = e_select;\n    window.u_switch = u_switch;\n    window.e_switch = e_switch;\n    window.u_change = u_change;\n    window.e_change = e_change;\n    window.output = output_ele;\n    window.settings = settings;\n    window.buttle = buttle;\n    window.pagetitle = pagetitle;\n}\nvar turn_num = 1;\n// 3体選択の作成\nu_select.innerHTML = make_select_box(Object.keys(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap), [0, 1, 2]);\ne_select.innerHTML = make_select_box(Object.keys(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap), [3, 4, 5]);\nfunction make_select_box(names, index) {\n    // create html array of options as `<label><input type=\"checkbox\">カイリュー</label><br>`\n    var html = \"\";\n    var _loop_1 = function (i) {\n        if (isDevelop && index.some(function (e) { return e == i; }))\n            html += \"<label><input type=\\\"checkbox\\\" name=\".concat(names[i], \" checked>\").concat(names[i], \"</label><br>\");\n        else\n            html += \"<label><input type=\\\"checkbox\\\" name=\".concat(names[i], \">\").concat(names[i], \"</label><br>\");\n    };\n    for (var i = 0; i < names.length; i++) {\n        _loop_1(i);\n    }\n    return html;\n}\n/* 場に出すポケモンの選択更新 */\nfunction update_poke_slects(select) {\n    var pokemon = getElement(\"\".concat(select, \"_select\")).querySelectorAll(\"input\");\n    var selects = getElement(\"\".concat(select, \"_switch\"));\n    selects.innerHTML = \"\";\n    pokemon.forEach(function (inputElement) {\n        var _a, _b, _c, _d;\n        if (inputElement.checked) {\n            var option = document.createElement(\"option\");\n            option.value = ((_b = (_a = inputElement.labels) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.textContent) || \"\";\n            option.textContent = ((_d = (_c = inputElement.labels) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.textContent) || \"\";\n            selects.appendChild(option);\n        }\n    });\n}\nupdate_poke_slects(\"user\");\nupdate_poke_slects(\"enemy\");\n// 選ばれたポケモンが変更されたとき\nu_select.addEventListener(\"change\", function () { return update_poke_slects(\"user\"); });\ne_select.addEventListener(\"change\", function () { return update_poke_slects(\"enemy\"); });\n// パーティーを固定\nfix_select.addEventListener(\"click\", function () {\n    if (u_select.querySelectorAll(\"input:checked\").length !== 3) {\n        alert(\"3体選べ\");\n    }\n    else if (e_select.querySelectorAll(\"input:checked\").length !== 3) {\n        alert(\"3体選べ\");\n    }\n    else {\n        if (!isDevelop)\n            settings.style.display = \"none\";\n        // ポケモンの名前表示\n        set_pokemon_name(u_switch.value, \"user\");\n        set_pokemon_name(e_switch.value, \"enemy\");\n        // 技選択表示\n        set_skill_select(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[u_switch.value].moves, \"user\");\n        set_skill_select(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[e_switch.value].moves, \"enemy\");\n        // ステータス表示\n        set_hp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[u_switch.value].hp, \"user\");\n        set_hp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[e_switch.value].hp, \"enemy\");\n        set_maxhp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[u_switch.value].hp, \"user\");\n        set_maxhp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[e_switch.value].hp, \"enemy\");\n        // ターンを進めるボタンの有効化\n        run_turn.disabled = false;\n        // 交代ボタンの有効化\n        u_change.disabled = false;\n        e_change.disabled = false;\n        fix_select.disabled = true;\n    }\n});\nfunction set_pokemon_name(name, side) {\n    var name_div = getElement(\"\".concat(side, \"_name\"));\n    name_div.textContent = name;\n}\nfunction set_skill_select(skills, side) {\n    var update_user = function () {\n        u_skill.innerHTML = \"\";\n        skills.forEach(function (skill) {\n            var option = document.createElement(\"option\");\n            option.value = skill;\n            option.textContent = skill;\n            u_skill.appendChild(option);\n        });\n    };\n    var update_enemy = function () {\n        e_skill.innerHTML = \"\";\n        skills.forEach(function (skill) {\n            var option = document.createElement(\"option\");\n            option.value = skill;\n            option.textContent = skill;\n            e_skill.appendChild(option);\n        });\n    };\n    switch (side) {\n        case \"both\":\n            update_user();\n            update_enemy();\n            break;\n        case \"user\":\n            update_user();\n            break;\n        case \"enemy\":\n            update_enemy();\n            break;\n        default:\n            console.error(\"Error occurred\");\n            break;\n    }\n}\nfunction set_hp(hp, side) {\n    var u_hp = getElement(\"user_hp\");\n    var e_hp = getElement(\"enemy_hp\");\n    if (side == \"user\") {\n        u_hp.textContent = hp.toString();\n    }\n    else {\n        e_hp.textContent = hp.toString();\n    }\n}\nfunction set_maxhp(hp, side) {\n    var u_maxhp = getElement(\"user_maxhp\");\n    var e_maxhp = getElement(\"enemy_maxhp\");\n    if (side == \"user\") {\n        u_maxhp.textContent = hp.toString();\n    }\n    else {\n        e_maxhp.textContent = hp.toString();\n    }\n}\n// 交代ボタンの動作\nfunction update_move_select(side) {\n    var name = getElement(\"\".concat(side, \"_name\")).textContent;\n    if (getInput(\"\".concat(side, \"_change\")).checked) {\n        var poke_names = Array.from(getElement(\"\".concat(side, \"_select\")).querySelectorAll(\"input:checked\"))\n            .map(function (element) { return element; })\n            .map(function (e) { return (e.labels[0].textContent ? e.labels[0].textContent : \"\"); })\n            .filter(function (e) { return e !== name; });\n        set_skill_select(poke_names, side);\n    }\n    else {\n        set_skill_select(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[name].moves, side);\n    }\n}\nu_change.addEventListener(\"click\", function () { return update_move_select(\"user\"); });\ne_change.addEventListener(\"click\", function () { return update_move_select(\"enemy\"); });\n// ターンを進めるボタンの動作\nrun_turn.addEventListener(\"click\", function () {\n    add_output(\"\", turn_num++); // ターンの表示\n    // 交代の処理\n    var is_u_change = u_change.checked;\n    var is_e_change = e_change.checked;\n    is_u_change && change_pokemon(u_skill.value, \"user\");\n    is_e_change && change_pokemon(e_skill.value, \"enemy\");\n});\n// 交代の処理\nfunction change_pokemon(name, side) {\n    var oldpokemon_name = getElement(\"\".concat(side, \"_name\"));\n    add_output(\"(\".concat(side, \")\").concat(oldpokemon_name.textContent, \"\\u304C\").concat(name, \"\\u306B\\u4EA4\\u4EE3\\u3057\\u305F\")); // 出力の表示\n    oldpokemon_name.textContent = name; // 名前の表示更新\n    set_skill_select(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[name].moves, side);\n    getInput(\"\".concat(side, \"_change\")).checked = false;\n    set_maxhp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[name].hp, side);\n}\n// アウトプットの表示\nfunction add_output(output, turn) {\n    if (turn && turn > 0)\n        output_ele.innerHTML += \"<div class=\\\"turn\\\">\\u30BF\\u30FC\\u30F3:\".concat(turn, \"</div>\");\n    output !== \"\" ? (output_ele.innerHTML += \"<div>\".concat(output, \"</div>\")) : \"\";\n}\n\n\n//# sourceURL=webpack://pokemon-ai-fork/./src/gui.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   run_turn: () => (/* binding */ run_turn)\n/* harmony export */ });\n/* harmony import */ var _gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gui */ \"./src/gui.ts\");\n\n(0,_gui__WEBPACK_IMPORTED_MODULE_0__.add_output)(\"\");\nfunction run_turn() {\n}\n\n\n//# sourceURL=webpack://pokemon-ai-fork/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;