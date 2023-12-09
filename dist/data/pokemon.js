import { Pokedex } from "./Pokedex";
var Pokemon = /** @class */ (function () {
    function Pokemon(name, species, gender, item, ability, _a, nature, moves) {
        var hp = _a.hp, atk = _a.atk, def = _a.def, spa = _a.spa, spd = _a.spd, spe = _a.spe;
        this.name = name;
        this.species = species;
        this.type = Pokedex[species].types;
        this.hp = hp;
        this.attack = atk;
        this.defense = def;
        this.tokukou = spa;
        this.tokubou = spd;
        this.speed = spe;
        this.tokusei = nature;
        this.item = item;
        this.skills = [moves[0], moves[1], moves[2], moves[3]];
        this.rank = init_rank;
    }
    Pokemon.prototype.get = function (poke_name) {
        var pokemon = pokemonMap[poke_name];
        return JSON.parse(JSON.stringify(pokemon));
    };
    return Pokemon;
}());
var init_rank = {
    "こうげき": 0,
    "ぼうぎょ": 0,
    "とくこう": 0,
    "とくぼう": 0,
    "すばやさ": 0,
    "めいちゅう": 0,
    "かいひ": 0,
    "きゅうしょ": 0,
};
export var pokemonMap = {
    "カイリュー": {
        name: "",
        species: "カイリュー",
        gender: "",
        item: "ラムのみ",
        ability: "",
        evs: { "hp": 195, "atk": 204, "def": 115, "spa": 108, "spd": 120, "spe": 104 },
        nature: "マルチスケイル",
        moves: ["しんそく", "じしん", "りゅうのまい", "アンコール"]
    },
    "ハバタクカミ": {
        name: "",
        species: "ハバタクカミ",
        gender: "",
        item: "こだわりメガネ",
        ability: "",
        evs: { "hp": 131, "atk": 67, "def": 75, "spa": 187, "spd": 155, "spe": 205 },
        nature: "こだいかっせい",
        moves: ["ムーンフォース", "シャドーボール", "パワージェム", "マジカルフレイム"]
    },
    "オーガポン(かまど)": {
        name: "",
        species: "オーガポン(かまど)",
        gender: "",
        item: "かまどのめん",
        ability: "",
        evs: { "hp": 187, "atk": 141, "def": 105, "spa": 93, "spd": 188, "spe": 151 },
        nature: "かたやぶり",
        moves: ["ツタこんぼう", "ウッドホーン", "アンコール", "こうごうせい"]
    },
    "ガチグマ(あかつき)": {
        name: "",
        species: "ガチグマ(あかつき)",
        gender: "",
        item: "シルクのスカーフ",
        ability: "",
        evs: { "hp": 215, "atk": 67, "def": 141, "spa": 198, "spd": 86, "spe": 84 },
        nature: "しんがん",
        moves: ["ブラッドムーン", "だいちのちから", "ハイパーボイス", "あくび"]
    },
    "パオジアン": {
        name: "",
        species: "パオジアン",
        gender: "",
        item: "きあいのタスキ",
        ability: "",
        evs: { "hp": 155, "atk": 172, "def": 101, "spa": 110, "spd": 85, "spe": 205 },
        nature: "わざわいのつるぎ",
        moves: ["つららおとし", "かみくだく", "こおりのつぶて", "せいなるつるぎ"]
    },
    "サーフゴー": {
        name: "",
        species: "サーフゴー",
        gender: "",
        item: "おんみつマント",
        ability: "",
        evs: { "hp": 191, "atk": 58, "def": 140, "spa": 153, "spd": 111, "spe": 115 },
        nature: "おうごんのからだ",
        moves: ["ゴールドラッシュ", "でんじは", "たたりめ", "じこさいせい"]
    },
    "ウーラオス(れんげき)": {
        name: "",
        species: "ウーラオス(れんげき)",
        gender: "",
        item: "パンチグローブ",
        ability: "",
        evs: { "hp": 175, "atk": 182, "def": 121, "spa": 83, "spd": 80, "spe": 163 },
        nature: "ふかしのこぶし",
        moves: ["すいりゅうれんだ", "インファイト", "アクアジェット", "れいとうパンチ"]
    },
    "ハッサム": {
        name: "",
        species: "ハッサム",
        gender: "",
        item: "とつげきチョッキ",
        ability: "",
        evs: { "hp": 177, "atk": 200, "def": 121, "spa": 75, "spd": 100, "spe": 85 },
        nature: "テクニシャン",
        moves: ["バレットパンチ", "とんぼがえり", "はたきおとす", "インファイト"]
    },
    "イーユイ": {
        name: "",
        species: "イーユイ",
        gender: "",
        item: "こだわりスカーフ",
        ability: "",
        evs: { "hp": 131, "atk": 90, "def": 100, "spa": 205, "spd": 140, "spe": 152 },
        nature: "わざわいのたま",
        moves: ["かえんほうしゃ", "あくのはどう", "テラバースト", "オーバーヒート"]
    },
    "キョジオーン": {
        name: "",
        species: "キョジオーン",
        gender: "",
        item: "イアのみ",
        ability: "",
        evs: { "hp": 207, "atk": 120, "def": 200, "spa": 58, "spd": 110, "spe": 56 },
        nature: "きよめのしお",
        moves: ["しおづけ", "ボディプレス", "じこさいせい", "てっぺき"]
    },
    "テツノツツミ": {
        name: "",
        species: "テツノツツミ",
        gender: "",
        item: "ブーストエナジー",
        ability: "",
        evs: { "hp": 131, "atk": 90, "def": 135, "spa": 176, "spd": 80, "spe": 206 },
        nature: "クォークチャージ",
        moves: ["ハイドロポンプ", "フリーズドライ", "クイックターン", "アンコール"]
    },
    "ディンルー": {
        name: "",
        species: "ディンルー",
        gender: "",
        item: "たべのこし",
        ability: "",
        evs: { "hp": 261, "atk": 130, "def": 176, "spa": 67, "spd": 119, "spe": 65 },
        nature: "わざわいのうつわ",
        moves: ["じしん", "カタストロフィ", "ふきとばし", "ステルスロック"]
    },
    "ランドロス(れいじゅう)": {
        name: "",
        species: "ランドロス(れいじゅう)",
        gender: "",
        item: "オボンのみ",
        ability: "",
        evs: { "hp": 165, "atk": 197, "def": 110, "spa": 112, "spd": 100, "spe": 157 },
        nature: "いかく",
        moves: ["じしん", "とんぼがえり", "がんせきふうじ", "ステルスロック"]
    },
    "トドロクツキ": {
        name: "",
        species: "トドロクツキ",
        gender: "",
        item: "こだわりハチマキ",
        ability: "",
        evs: { "hp": 181, "atk": 191, "def": 91, "spa": 67, "spd": 121, "spe": 188 },
        nature: "こだいかっせい",
        moves: ["げきりん", "はたきおとす", "アイアンヘッド", "とんぼがえり"]
    },
    "ヘイラッシャ": {
        name: "",
        species: "ヘイラッシャ",
        gender: "",
        item: "カゴのみ",
        ability: "",
        evs: { "hp": 257, "atk": 120, "def": 183, "spa": 76, "spd": 85, "spe": 56 },
        nature: "てんねん",
        moves: ["アクアブレイク", "あくび", "ねむる", "じわれ"]
    },
    "キラフロル": {
        name: "",
        species: "キラフロル",
        gender: "",
        item: "レッドカード",
        ability: "",
        evs: { "hp": 190, "atk": 67, "def": 156, "spa": 150, "spd": 101, "spe": 107 },
        nature: "どくげしょう",
        moves: ["こらえる", "エナジーボール", "キラースピン", "ステルスロック"]
    },
    "ガブリアス": {
        name: "",
        species: "ガブリアス",
        gender: "",
        item: "イカサマダイス",
        ability: "",
        evs: { "hp": 183, "atk": 182, "def": 116, "spa": 90, "spd": 105, "spe": 169 },
        nature: "さめはだ",
        moves: ["じしん", "スケイルショット", "つるぎのまい", "アイアンヘッド"]
    },
    "キュウコン(アローラ)": {
        name: "",
        species: "キュウコン(アローラ)",
        gender: "",
        item: "ひかりのねんど",
        ability: "",
        evs: { "hp": 175, "atk": 78, "def": 107, "spa": 101, "spd": 120, "spe": 170 },
        nature: "ゆきふらし",
        moves: ["ムーンフォース", "ふぶき", "オーロラベール", "フリーズドライ"]
    },
    "コノヨザル": {
        name: "",
        species: "コノヨザル",
        gender: "",
        item: "でんきだま",
        ability: "",
        evs: { "hp": 217, "atk": 135, "def": 100, "spa": 63, "spd": 111, "spe": 156 },
        nature: "せいしんりょく",
        moves: ["なげつける", "ステルスロック", "ふんどのこぶし", "いのちがけ"]
    },
    "アーマーガア": {
        name: "",
        species: "アーマーガア",
        gender: "",
        item: "バンジのみ",
        ability: "",
        evs: { "hp": 205, "atk": 107, "def": 135, "spa": 73, "spd": 140, "spe": 64 },
        nature: "ミラーアーマー",
        moves: ["はねやすめ", "アイアンヘッド", "とんぼがえり", "ドリルくちばし"]
    },
    "テツノドクガ": {
        name: "",
        species: "テツノドクガ",
        gender: "",
        item: "ふうせん",
        ability: "",
        evs: { "hp": 155, "atk": 81, "def": 80, "spa": 192, "spd": 130, "spe": 178 },
        nature: "クォークチャージ",
        moves: ["ほのおのまい", "ヘドロウェーブ", "エナジーボール", "とんぼがえり"]
    },
    "ドヒドイデ": {
        name: "",
        species: "ドヒドイデ",
        gender: "",
        item: "くろいヘドロ",
        ability: "",
        evs: { "hp": 157, "atk": 83, "def": 224, "spa": 73, "spd": 163, "spe": 55 },
        nature: "さいせいりょく",
        moves: ["じこさいせい", "どくどく", "トーチカ", "くろいきり"]
    },
    "ミミッキュ": {
        name: "",
        species: "ミミッキュ",
        gender: "",
        item: "ひかりのこな",
        ability: "",
        evs: { "hp": 131, "atk": 142, "def": 100, "spa": 63, "spd": 125, "spe": 162 },
        nature: "ばけのかわ",
        moves: ["じゃれつく", "でんじは", "みがわり", "のろい"]
    },
};
//# sourceMappingURL=pokemon.js.map