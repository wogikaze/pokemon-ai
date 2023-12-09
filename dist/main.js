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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/pokemon */ \"./src/data/pokemon.ts\");\n\nvar getElement = function (id) { return document.getElementById(id); };\nvar isDevelop = true; //TODO: 外す\nif (isDevelop) {\n    window.run = getElement(\"run\");\n    window.fix_select = getElement(\"selectpokemon\");\n    window.u_skill = getElement(\"user_skill\");\n    window.e_skill = getElement(\"enemy_skill\");\n    window.u_select = getElement(\"user_select\");\n    window.e_select = getElement(\"enemy_select\");\n    window.u_switch = getElement(\"user_switch\");\n    window.e_switch = getElement(\"enemy_switch\");\n    window.u_change = getElement(\"user_change\");\n    window.e_change = getElement(\"enemy_change\");\n    window.output = getElement(\"output\");\n    window.settings = getElement(\"settings\");\n    window.buttle = getElement(\"buttle\");\n    window.pagetitle = getElement(\"pagetitle\");\n}\nvar run = getElement(\"run\");\nvar fix_select = getElement(\"selectpokemon\");\nvar u_skill = getElement(\"user_skill\");\nvar e_skill = getElement(\"enemy_skill\");\nvar u_select = getElement(\"user_select\");\nvar e_select = getElement(\"enemy_select\");\nvar u_switch = getElement(\"user_switch\");\nvar e_switch = getElement(\"enemy_switch\");\nvar u_change = getElement(\"user_change\");\nvar e_change = getElement(\"enemy_change\");\nvar output = getElement(\"output\");\nvar settings = getElement(\"settings\");\nvar buttle = getElement(\"buttle\");\nvar pagetitle = getElement(\"pagetitle\");\n/* 4体選択の作成 */\nu_select.innerHTML = make_select_box(Object.keys(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap));\ne_select.innerHTML = make_select_box(Object.keys(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap));\n/* 場に出すポケモンの選択更新 */\nvar update_poke_slects = function (select) {\n    var pokemon = getElement(\"user_select\").querySelectorAll(\"input\");\n    var selects = getElement(\"\".concat(select, \"_switch\"));\n    selects.innerHTML = \"\";\n    pokemon.forEach(function (inputElement) {\n        var _a, _b, _c, _d;\n        if (inputElement.checked) {\n            var option = document.createElement(\"option\");\n            option.value = ((_b = (_a = inputElement.labels) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.textContent) || \"\";\n            option.textContent = ((_d = (_c = inputElement.labels) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.textContent) || \"\";\n            selects.appendChild(option);\n        }\n    });\n};\nupdate_poke_slects(\"user\");\nupdate_poke_slects(\"enemy\");\nu_select.addEventListener(\"change\", function () { return update_poke_slects(\"user\"); });\ne_select.addEventListener(\"change\", function () { return update_poke_slects(\"enemy\"); });\nfunction make_select_box(names) {\n    // create html array of options as `<label><input type=\"checkbox\">カイリュー</label><br>`\n    var html = \"\";\n    for (var i = 0; i < names.length; i++) {\n        html += \"<label><input type=\\\"checkbox\\\">\".concat(names[i], \"</label><br>\");\n        if (isDevelop && i == 2) {\n            html = html.replace(/checkbox/g, 'checkbox\" checked=\"true\"');\n        }\n    }\n    return html;\n}\nfix_select.addEventListener(\"click\", function () {\n    if (u_select.querySelectorAll(\"input:checked\").length !== 3) {\n        alert(\"3体選べ\");\n    }\n    else if (e_select.querySelectorAll(\"input:checked\").length !== 3) {\n        alert(\"3体選べ\");\n    }\n    else {\n        settings.style.display = \"none\";\n        // ポケモンの名前表示\n        set_pokemon_name(u_switch.value, \"user\");\n        set_pokemon_name(e_switch.value, \"enemy\");\n        // 技選択表示\n        set_skill_select(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[u_switch.value].moves, \"user\");\n        set_skill_select(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[e_switch.value].moves, \"enemy\");\n        // ステータス表示\n        set_hp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[u_switch.value].hp, \"user\");\n        set_hp(_data_pokemon__WEBPACK_IMPORTED_MODULE_0__.pokemonMap[e_switch.value].hp, \"enemy\");\n    }\n});\nfunction set_pokemon_name(name, side) {\n    var name_div = getElement(\"\".concat(side, \"_name\"));\n    name_div.textContent = name;\n}\nfunction set_skill_select(skills, side) {\n    var update_user = function () {\n        u_skill.innerHTML = \"\";\n        skills.forEach(function (skill) {\n            var option = document.createElement(\"option\");\n            option.value = skill;\n            option.textContent = skill;\n            u_skill.appendChild(option);\n        });\n    };\n    var update_enemy = function () {\n        e_skill.innerHTML = \"\";\n        skills.forEach(function (skill) {\n            var option = document.createElement(\"option\");\n            option.value = skill;\n            option.textContent = skill;\n            e_skill.appendChild(option);\n        });\n    };\n    switch (side) {\n        case \"both\":\n            update_user();\n            update_enemy();\n            break;\n        case \"user\":\n            update_user();\n            break;\n        case \"enemy\":\n            update_enemy();\n            break;\n        default:\n            console.error(\"Error occurred\");\n            break;\n    }\n}\nfunction set_hp(hp, side) {\n    var u_hp = getElement(\"user_hp\");\n    var e_hp = getElement(\"enemy_hp\");\n    if (side == \"user\") {\n        u_hp.textContent = hp.toString();\n    }\n    else {\n        e_hp.textContent = hp.toString();\n    }\n}\n// 交代ボタンの動作\nu_change.addEventListener(\"click\", function () {\n    if (u_change.checked) {\n        // set_skill_select(pokemonMap[u_name].moves, \"user\");\n    }\n    else {\n        // set_skill_select(pokemonMap[u_name].moves, \"user\");\n    }\n});\ne_change.addEventListener(\"click\", function () { });\n\n\n//# sourceURL=webpack://pokemon-ai-fork/./src/main.ts?");

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