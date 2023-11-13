class Pokemon {
    constructor(name, type, hp, attack, defense, tokukou, tokubou, speed, tokusei, item, skill1, skill2, skill3, skill4) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.tokukou = tokukou;
        this.tokubou = tokubou;
        this.speed = speed;
        this.tokusei = tokusei;
        this.item = item;
        this.skills = [skill1, skill2, skill3, skill4];
        this.rank = init_rank
    }
    get(poke_name) {
        const pokemon = pokemonMap[poke_name];
        return JSON.parse(JSON.stringify(pokemon));
    }
}
const init_rank = {
    "こうげき": 0,
    "ぼうぎょ": 0,
    "とくこう": 0,
    "とくぼう": 0,
    "すばやさ": 0,
    "めいちゅう": 0,
    "かいひ": 0,
    "きゅうしょ": 0,
}

const pokemonMap = {
    "ヘイラッシャ": new Pokemon("ヘイラッシャ", "みず", 225, 167, 135, 76, 117, 55, "てんねん", "たべのこし", "ウェーブタックル", "じしん", "ゆきなだれ", "ボディプレス"),
    "ハバタクカミ": new Pokemon("ハバタクカミ", "ゴースト・フェアリー", 130, 67, 75, 187, 155, 205, "こだいかっせい", "ブーストエナジー", "ムーンフォース", "シャドーボール", "サイコショック", "マジカルフレイム"),
    "ロトム(ウォッシュ)": new Pokemon("ロトム(ウォッシュ)", "みず・でんき", 157, 76, 127, 172, 127, 106, "ふゆう", "こだわりメガネ", "ハイドロポンプ", "10まんボルト", "シャドーボール", "イカサマ"),
    "オーガポン(かまど)": new Pokemon("オーガポン(かまど)", "くさ・ほのお", 155, 172, 104, 72, 116, 178, "かたやぶり", "かまどのめん", "ツタこんぼう", "じゃれつく", "ウッドホーン", "じごくづき"),
    "イーユイ": new Pokemon("イーユイ", "ほのお・あく", 130, 90, 100, 187, 140, 167, "わざわいのたま", "こだわりスカーフ", "オーバーヒート", "かえんほうしゃ", "あくのはどう", "サイコキネシス"),
    "テツノカイナ": new Pokemon("テツノカイナ", "でんき・かくとう", 229, 211, 128, 63, 120, 70, "クォークチャージ", "パンチグローブ", "ドレインパンチ", "かみなりパンチ", "れいとうパンチ", "じしん"),
    "ガブリアス": new Pokemon("ガブリアス", "じめん・ドラゴン", 183, 182, 115, 90, 105, 169, "さめはだ", "こだわりハチマキ", "ドラゴンクロー", "じしん", "いわなだれ", "アイアンヘッド"),
    "ヌメルゴン(ヒスイ)": new Pokemon("ヌメルゴン(ヒスイ)", "はがね・ドラゴン", 187, 120, 120, 178, 170, 72, "シェルアーマー", "とつげきチョッキ", "れいとうビーム", "10まんボルト", "ラスターカノン", "じしん"),
    "ランドロス(けしん)": new Pokemon("ランドロス(けしん)", "じめん・ひこう", 164, 130, 110, 167, 100, 168, "ちからずく", "いのちのたま", "だいちのちから", "ヘドロばくだん", "きあいだま", "くさむすび"),
    "イイネイヌ": new Pokemon("イイネイヌ", "どく・かくとう", 195, 198, 135, 70, 106, 100, "どくのくさり", "ゴツゴツメット", "ドレインパンチ", "どくづき", "かみくだく", "れいとうパンチ"),
};

const getPokemon = (poke_name) => {
    const poke = pokemonMap[poke_name]
    return poke.get(poke_name)
}