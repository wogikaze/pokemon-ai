const pokemon = {
    "ヘイラッシャ": ["みず", 225, 167, 135, 76, 117, 55, "てんねん", "とつげきチョッキ", "ウェーブタックル", "じしん", "ゆきなだれ", "ボディプレス"],
    "ハバタクカミ": ["ゴースト・フェアリー", 130, 67, 75, 187, 155, 205, "こだいかっせい", "ブーストエナジー", "ムーンフォース", "シャドーボール", "サイコショック", "マジカルフレイム"],
    "ロトム(ウォッシュ)": ["みず・でんき", 157, 76, 127, 172, 127, 106, "ふゆう", "こだわりメガネ", "ハイドロポンプ", "10まんボルト", "シャドーボール", "イカサマ"],
    "オーガポン(かまど)": ["くさ・ほのお", 155, 172, 104, 72, 116, 178, "かたやぶり", "かまどのめん", "ツタこんぼう", "じゃれつく", "ウッドホーン", "じごくづき"],
    "イーユイ": ["ほのお・あく", 130, 90, 100, 187, 140, 167, "わざわいのたま", "こだわりスカーフ", "オーバーヒート", "かえんほうしゃ", "あくのはどう", "サイコキネシス"],
    "テツノカイナ": ["でんき・かくとう", 229, 211, 128, 63, 120, 70, "クォークチャージ", "パンチグローブ", "ドレインパンチ", "かみなりパンチ", "れいとうパンチ", "じしん"],
    "ガブリアス": ["じめん・ドラゴン", 183, 182, 115, 90, 105, 169, "さめはだ", "こだわりハチマキ", "ドラゴンクロー", "じしん", "いわなだれ", "アイアンヘッド"],
    "ヌメルゴン(ヒスイ)": ["はがね・ドラゴン", 187, 120, 120, 178, 170, 72, "シェルアーマー", "たべのこし", "れいとうビーム", "10まんボルト", "ラスターカノン", "じしん"],
    "ランドロス(けしん)": ["じめん・ひこう", 164, 130, 110, 167, 100, 168, "ちからずく", "いのちのたま", "だいちのちから", "ヘドロばくだん", "きあいだま", "サイコキネシス"],
    "イイネイヌ": ["どく・かくとう", 195, 198, 135, 70, 106, 100, "どくのくさり", "ゴツゴツメット", "ドレインパンチ", "どくづき", "かみくだく", "れいとうパンチ"],
}
const skills = {
    "ウェーブタックル": ["みず", "物理", 120, 100, 10, "直○", "守○", "1体選択", "相手に与えたダメージの33 % を自分も受ける。"],
    "ムーンフォース": ["フェアリー", "特殊", 95, 100, 15, "直×", "守○", "1体選択", "30 % の確率で相手の『とくこう』ランクを1段階下げる。"],
    "ハイドロポンプ": ["みず", "特殊", 110, 80, 5, "直×", "守○", "1体選択", "通常攻撃。"],
    "ツタこんぼう": ["くさ", "物理", 100, 100, 10, "直×", "守○", "1体選択", "『オーガポン』が使う場合、持たせた「おめん」によるフォルムに合わせて、技が『くさ』『ほのお』『みず』『いわ』タイプのいずれかに変化する。また、急所に当たりやすい(急所ランク: +1)。"],
    "オーバーヒート": ["ほのお", "特殊", 130, 90, 5, "直×", "守○", "1体選択", "攻撃後、100 % の確率で自分の『とくこう』ランクが2段階下がる。"],
    "ドレインパンチ": ["かくとう", "物理", 75, 100, 10, "直○", "守○", "1体選択", "相手に与えたダメージの半分だけ自分のHPが回復する。特性『てつのこぶし』の時、威力が1.2倍になる。"],
    "ドラゴンクロー": ["ドラゴン", "物理", 80, 100, 15, "直○", "守○", "1体選択", "通常攻撃。"],
    "れいとうビーム": ["こおり", "特殊", 90, 100, 10, "直×", "守○", "1体選択", "10 % の確率で相手を『こおり』状態にする。"],
    "たきのぼり": ["みず", "物理", 80, 100, 15, "直○", "守○", "1体選択", "20 % の確率で相手をひるませる。"],
    "ムーンフォース": ["フェアリー", "特殊", 95, 100, 15, "直×", "守○", "1体選択", "30 % の確率で相手の『とくこう』ランクを1段階下げる。"],
    "じしん": ["じめん", "物理", 100, 100, 10, "直×", "守○", "自分以外", "相手が技『あなをほる』を使っている時でも命中し、ダメージが2倍になる。"],
    "シャドーボール": ["ゴースト", "特殊", 80, 100, 15, "直×", "守○", "1体選択", "20 % の確率で相手の『とくぼう』ランクを1段階下げる。"],
    "10まんボルト": ["でんき", "特殊", 90, 100, 15, "直×", "守○", "1体選択", "10 % の確率で相手を『まひ』状態にする。"],
    "じゃれつく": ["フェアリー", "物理", 90, 90, 10, "直○", "守○", "1体選択", "10 % の確率で相手の『こうげき』ランクを1段階下げる。"],
    "かえんほうしゃ": ["ほのお", "特殊", 90, 100, 15, "直×", "守○", "1体選択", "10 % の確率で相手を『やけど』状態にする。"],
    "かみなりパンチ": ["でんき", "物理", 75, 100, 15, "直○", "守○", "1体選択", "10 % の確率で相手を『まひ』状態にする。特性『てつのこぶし』の時、威力が1.2倍になる。"],
    "じしん": ["じめん", "物理", 100, 100, 10, "直×", "守○", "自分以外", "相手が技『あなをほる』を使っている時でも命中し、ダメージが2倍になる。"],
    "10まんボルト": ["でんき", "特殊", 90, 100, 15, "直×", "守○", "1体選択", "10 % の確率で相手を『まひ』状態にする。"],
    "じしん": ["じめん", "物理", 100, 100, 10, "直×", "守○", "自分以外", "相手が技『あなをほる』を使っている時でも命中し、ダメージが2倍になる。"],
    "インファイト": ["かくとう", "物理", 120, 100, 5, "直○", "守○", "1体選択", "攻撃後、自分の『ぼうぎょ』『とくぼう』ランクが1段階ずつ下がる。"],
    "ゆきなだれ": ["こおり", "物理", 60, 100, 10, "直○", "守○", "1体選択", "そのターンに相手の技のダメージを受けると威力が2倍になる。必ず後攻になる(優先度: -4)。"],
    "サイコショック": ["エスパー", "特殊", 80, 100, 10, "直×", "守○", "1体選択", "相手の『とくぼう』ではなく、相手の『ぼうぎょ』の能力値でダメージ計算する。"],
    "シャドーボール": ["ゴースト", "特殊", 80, 100, 15, "直×", "守○", "1体選択", "20 % の確率で相手の『とくぼう』ランクを1段階下げる。"],
    "ウッドホーン": ["くさ", "物理", 75, 100, 10, "直○", "守○", "1体選択", "相手に与えたダメージの半分だけ自分のHPが回復する。"],
    "あくのはどう": ["あく", "特殊", 80, 100, 15, "直×", "守○", "1体選択", "20 % の確率で相手をひるませる。"],
    "れいとうパンチ": ["こおり", "物理", 75, 100, 15, "直○", "守○", "1体選択", "10 % の確率で相手を『こおり』状態にする。特性『てつのこぶし』の時、威力が1.2倍になる。"],
    "いわなだれ": ["いわ", "物理", 75, 90, 10, "直×", "守○", "相手全体", "30 % の確率で相手をひるませる。"],
    "ラスターカノン": ["はがね", "特殊", 80, 100, 10, "直×", "守○", "1体選択", "10 % の確率で相手の『とくぼう』ランクを1段階下げる。"],
    "アイアンヘッド": ["はがね", "物理", 80, 100, 15, "直○", "守○", "1体選択", "30 % の確率で相手をひるませる。"],
    "10まんボルト": ["でんき", "特殊", 90, 100, 15, "直×", "守○", "1体選択", "10 % の確率で相手を『まひ』状態にする。"],
    "ボディプレス": ["かくとう", "物理", 80, 100, 10, "直○", "守○", "1体選択", "『こうげき』ではなく、自分の『ぼうぎょ』と『ぼうぎょ』ランクを『こうげき』の数値にしてダメージ計算する。"],
    "マジカルフレイム": ["ほのお", "特殊", 75, 100, 10, "直×", "守○", "1体選択", "100 % の確率で相手の『とくこう』ランクを1段階下げる。"],
    "イカサマ": ["あく", "物理", 95, 100, 15, "直○", "守○", "1体選択", "自分の『こうげき』ではなく、相手の『こうげき』の能力値でダメージ計算する。"],
    "じごくづき": ["あく", "物理", 80, 100, 15, "直○", "守○", "1体選択", "相手は2ターンの間、音系の技『いびき』『いやしのすず』『いやなおと』『うたう』『うたかたのアリア』『エコーボイス』『おしゃべり』『おたけび』『きんぞくおん』『くさぶえ』『さわぐ』『スケイルノイズ』『すてゼリフ』『チャームボイス』『ちょうおんぱ』『とおぼえ』『ないしょばなし』『なきごえ』『バークアウト』『ハイパーボイス』『ばくおんぱ』『ほえる』『ほろびのうた』『むしのさざめき』『りんしょう』『ソウルビート』『オーバードライブ』『ぶきみなじゅもん』『フレアソング』を使えなくなる。"],
    "サイコキネシス": ["エスパー", "特殊", 90, 100, 10, "直×", "守○", "1体選択", "10 % の確率で相手の『とくぼう』ランクを1段階下げる。"],
    "じしん": ["じめん", "物理", 100, 100, 10, "直×", "守○", "自分以外", "相手が技『あなをほる』を使っている時でも命中し、ダメージが2倍になる。"],
    "アイアンヘッド": ["はがね", "物理", 80, 100, 15, "直○", "守○", "1体選択", "30 % の確率で相手をひるませる。"],
    "じしん": ["じめん", "物理", 100, 100, 10, "直×", "守○", "自分以外", "相手が技『あなをほる』を使っている時でも命中し、ダメージが2倍になる。"],
    "こおりのキバ": ["こおり", "物理", 65, 95, 15, "直○", "守○", "1体選択", "10 % の確率で相手を『こおり』状態にするか、ひるませる。"],
    "シャドーボール": ["ゴースト", "特殊", 80, 100, 15, "直×", "守○", "1体選択", "20 % の確率で相手の『とくぼう』ランクを1段階下げる。"],
}
const skill_effects = {
    "ツタこんぼう": { "damage": "vital_rank += 1" }
}

const items = {

}
class Tokusei {
    constructor(name, phazes) {
        this.name = name; // 特性の名前
        this.phazes = phazes; // 特性の効果の発動関数のマップ
    }

    // 特性の効果を発動するメソッド
    activate(attacker, defender, phaze) {
        if (this.phazes[phaze]) {
            this.phazes[phaze](attacker, defender);
        } else {
            console.error(`Unknown phaze: ${phaze}`);
        }
    }
}
// 特性のオブジェクトのマップ
const tokuseiMap = {
    "きんちょうかん": new Tokusei("きんちょうかん", {
        "out": (attacker, defender) => {
            console.log(`${defender.name}はきんちょうして外に出た！`);
        },
        "in": (attacker, defender) => {
            console.log(`${defender.name}はきんちょうして中に入った！`);
        },
    }),
    "てんねん": { "damage": 'kougeki_rank = 0;bougyo_rank = 0;meityuu_rank = 0;kaihi_rank = 0;' },
    "こだいかっせい": { "out": `if(pokes[poke][8]==="ブーストエナジー")pokes[poke][6] *= 1.5;` },
    "ふゆう": { "isdamage": 'if(skill_type=="じめん"{ return 0 }' },
    "かたやぶり": { "damage": '' },//todo
    "わざわいのたま": { "damage": 'tokubou*=0.75' },
    "クォークチャージ": {},
    "さめはだ": { "hpcalc": 'if(skill_sessyoku=="直○")' },//相手のHPを最大HPの1/8減らす
    "シェルアーマー": {},
    "ちからずく": { "": '' },//追加効果があるとき効果をなくして威力を1.3倍
    "どくのくさり": { "afterdamage": "if(damage>0)" }//30%で「もうどく」

    // 他の特性もここに追加
};
function activateTokusei(attacker, defender) {
    const tokusei = tokuseiMap[defender.tokusei]; // 特性のオブジェクトを取得
    if (tokusei) {
        tokusei.activate(attacker, defender, phaze); // 特性を発動
    } else {
        console.log(`Unknown tokusei: ${defender.tokusei}`);
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
const hit_rate = [3 / 9, 3 / 8, 3 / 7, 3 / 6, 3 / 5, 3 / 4, 3 / 3, 4 / 3, 5 / 3, 6 / 3, 7 / 3, 8 / 3, 9 / 3]
const damage_rank = [2 / 8, 2 / 7, 2 / 6, 2 / 5, 2 / 4, 2 / 3, 2 / 2, 3 / 2, 4 / 2, 5 / 2, 6 / 2, 7 / 2, 8 / 2]