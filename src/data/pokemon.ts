import { Moves } from "./Movedex";
import { Pokedex } from "./Pokedex";
interface IEVs {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

interface IRank {
  [key: string]: number;
}

export class Pokemon {
  name: string;
  species: string;
  gender: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  nature: string;
  item: string;
  ability: string;
  moves: string[];
  pp: { [key: string]: number };
  rank: IRank;
  baseMaxhp: number;
  constructor(
    name: string,
    species: string,
    gender: string,
    item: string,
    ability: string,
    evs: IEVs,
    nature: string,
    moves: string[]
  ) {
    this.name = name;
    this.species = species;
    this.gender = gender;
    // this.type = Pokedex[species].types; // Assuming Pokedex is a predefined object
    this.type = Pokedex[species].types;
    this.hp = evs.hp;
    this.attack = evs.atk;
    this.defense = evs.def;
    this.specialAttack = evs.spa;
    this.specialDefense = evs.spd;
    this.speed = evs.spe;
    this.nature = nature;
    this.item = item;
    this.ability = ability;
    this.moves = moves;
    this.pp = {};
    this.rank = init_rank;
    this.baseMaxhp = evs.hp;
  }
}

const init_rank: IRank = {
  こうげき: 0,
  ぼうぎょ: 0,
  とくこう: 0,
  とくぼう: 0,
  すばやさ: 0,
  めいちゅう: 0,
  かいひ: 0,
  きゅうしょ: 0,
};

export const pokemonMap: {
  [key: string]: Pokemon;
} = {
  カイリュー: new Pokemon(
    "",
    "カイリュー",
    "",
    "ラムのみ",
    "",
    { hp: 195, atk: 204, def: 115, spa: 108, spd: 120, spe: 104 },
    "マルチスケイル",
    ["しんそく", "じしん", "りゅうのまい", "アンコール"]
  ),
  ハバタクカミ: new Pokemon(
    "",
    "ハバタクカミ",
    "",
    "こだわりメガネ",
    "",
    { hp: 131, atk: 67, def: 75, spa: 187, spd: 155, spe: 205 },
    "こだいかっせい",
    ["ムーンフォース", "シャドーボール", "パワージェム", "マジカルフレイム"]
  ),
  "オーガポン(かまど)": new Pokemon(
    "",
    "オーガポン(かまど)",
    "",
    "かまどのめん",
    "",
    { hp: 187, atk: 141, def: 105, spa: 93, spd: 188, spe: 151 },
    "かたやぶり",
    ["ツタこんぼう", "ウッドホーン", "アンコール", "こうごうせい"]
  ),
  "ガチグマ(あかつき)": new Pokemon(
    "",
    "ガチグマ(あかつき)",
    "",
    "シルクのスカーフ",
    "",
    { hp: 215, atk: 67, def: 141, spa: 198, spd: 86, spe: 84 },
    "しんがん",
    ["ブラッドムーン", "だいちのちから", "ハイパーボイス", "あくび"]
  ),
  パオジアン: new Pokemon(
    "",
    "パオジアン",
    "",
    "きあいのタスキ",
    "",
    { hp: 155, atk: 172, def: 101, spa: 110, spd: 85, spe: 205 },
    "わざわいのつるぎ",
    ["つららおとし", "かみくだく", "こおりのつぶて", "せいなるつるぎ"]
  ),
  サーフゴー: new Pokemon(
    "",
    "サーフゴー",
    "",
    "おんみつマント",
    "",
    { hp: 191, atk: 58, def: 140, spa: 153, spd: 111, spe: 115 },
    "おうごんのからだ",
    ["ゴールドラッシュ", "でんじは", "たたりめ", "じこさいせい"]
  ),
  "ウーラオス(れんげき)": new Pokemon(
    "",
    "ウーラオス(れんげき)",
    "",
    "パンチグローブ",
    "",
    { hp: 175, atk: 182, def: 121, spa: 83, spd: 80, spe: 163 },
    "ふかしのこぶし",
    ["すいりゅうれんだ", "インファイト", "アクアジェット", "れいとうパンチ"]
  ),
  ハッサム: new Pokemon(
    "",
    "ハッサム",
    "",
    "とつげきチョッキ",
    "",
    { hp: 177, atk: 200, def: 121, spa: 75, spd: 100, spe: 85 },
    "テクニシャン",
    ["バレットパンチ", "とんぼがえり", "はたきおとす", "インファイト"]
  ),
  イーユイ: new Pokemon(
    "",
    "イーユイ",
    "",
    "こだわりスカーフ",
    "",
    { hp: 131, atk: 90, def: 100, spa: 205, spd: 140, spe: 152 },
    "わざわいのたま",
    ["かえんほうしゃ", "あくのはどう", "テラバースト", "オーバーヒート"]
  ),
  キョジオーン: new Pokemon(
    "",
    "キョジオーン",
    "",
    "イアのみ",
    "",
    { hp: 207, atk: 120, def: 200, spa: 58, spd: 110, spe: 56 },
    "きよめのしお",
    ["しおづけ", "ボディプレス", "じこさいせい", "てっぺき"]
  ),
  テツノツツミ: new Pokemon(
    "",
    "テツノツツミ",
    "",
    "ブーストエナジー",
    "",
    { hp: 131, atk: 90, def: 135, spa: 176, spd: 80, spe: 206 },
    "クォークチャージ",
    ["ハイドロポンプ", "フリーズドライ", "クイックターン", "アンコール"]
  ),
  ディンルー: new Pokemon(
    "",
    "ディンルー",
    "",
    "たべのこし",
    "",
    { hp: 261, atk: 130, def: 176, spa: 67, spd: 119, spe: 65 },
    "わざわいのうつわ",
    ["じしん", "カタストロフィ", "ふきとばし", "ステルスロック"]
  ),
  "ランドロス(れいじゅう)": new Pokemon(
    "",
    "ランドロス(れいじゅう)",
    "",
    "オボンのみ",
    "",
    { hp: 165, atk: 197, def: 110, spa: 112, spd: 100, spe: 157 },
    "いかく",
    ["じしん", "とんぼがえり", "がんせきふうじ", "ステルスロック"]
  ),
  トドロクツキ: new Pokemon(
    "",
    "トドロクツキ",
    "",
    "こだわりハチマキ",
    "",
    { hp: 181, atk: 191, def: 91, spa: 67, spd: 121, spe: 188 },
    "こだいかっせい",
    ["げきりん", "はたきおとす", "アイアンヘッド", "とんぼがえり"]
  ),
  ヘイラッシャ: new Pokemon(
    "",
    "ヘイラッシャ",
    "",
    "カゴのみ",
    "",
    { hp: 257, atk: 120, def: 183, spa: 76, spd: 85, spe: 56 },
    "てんねん",
    ["アクアブレイク", "あくび", "ねむる", "じわれ"]
  ),
  キラフロル: new Pokemon(
    "",
    "キラフロル",
    "",
    "レッドカード",
    "",
    { hp: 190, atk: 67, def: 156, spa: 150, spd: 101, spe: 107 },
    "どくげしょう",
    ["こらえる", "エナジーボール", "キラースピン", "ステルスロック"]
  ),
  ガブリアス: new Pokemon(
    "",
    "ガブリアス",
    "",
    "いかさまダイス",
    "",
    { hp: 183, atk: 182, def: 116, spa: 90, spd: 105, spe: 169 },
    "さめはだ",
    ["じしん", "スケイルショット", "つるぎのまい", "アイアンヘッド"]
  ),
  "キュウコン(アローラ)": new Pokemon(
    "",
    "キュウコン(アローラ)",
    "",
    "ひかりのねんど",
    "",
    { hp: 175, atk: 78, def: 107, spa: 101, spd: 120, spe: 170 },
    "ゆきふらし",
    ["ムーンフォース", "ふぶき", "オーロラベール", "フリーズドライ"]
  ),
  コノヨザル: new Pokemon(
    "",
    "コノヨザル",
    "",
    "でんきだま",
    "",
    { hp: 217, atk: 135, def: 100, spa: 63, spd: 111, spe: 156 },
    "せいしんりょく",
    ["なげつける", "ステルスロック", "ふんどのこぶし", "いのちがけ"]
  ),
  アーマーガア: new Pokemon(
    "",
    "アーマーガア",
    "",
    "バンジのみ",
    "",
    { hp: 205, atk: 107, def: 135, spa: 73, spd: 140, spe: 64 },
    "ミラーアーマー",
    ["はねやすめ", "アイアンヘッド", "とんぼがえり", "ドリルくちばし"]
  ),
  テツノドクガ: new Pokemon(
    "",
    "テツノドクガ",
    "",
    "ふうせん",
    "",
    { hp: 155, atk: 81, def: 80, spa: 192, spd: 130, spe: 178 },
    "クォークチャージ",
    ["ほのおのまい", "ヘドロウェーブ", "エナジーボール", "とんぼがえり"]
  ),
  ドヒドイデ: new Pokemon(
    "",
    "ドヒドイデ",
    "",
    "くろいヘドロ",
    "",
    { hp: 157, atk: 83, def: 224, spa: 73, spd: 163, spe: 55 },
    "さいせいりょく",
    ["じこさいせい", "どくどく", "トーチカ", "くろいきり"]
  ),
  ミミッキュ: new Pokemon(
    "",
    "ミミッキュ",
    "",
    "ひかりのこな",
    "",
    { hp: 131, atk: 142, def: 100, spa: 63, spd: 125, spe: 162 },
    "ばけのかわ",
    ["じゃれつく", "でんじは", "みがわり", "のろい"]
  ),
};

Object.keys(pokemonMap).map((pokemon) => {
  return pokemonMap[pokemon].moves.forEach((move) => {
    pokemonMap[pokemon].pp[move] = Moves[move].pp;
  });
});
