window.onload = (e) => {
    const attacker = document.getElementById("attacker");
    let a_n = attacker.getElementsByTagName("select")[0].value;
    const defender = document.getElementById("defender");
    let d_n = defender.getElementsByTagName("select")[0].value;
    const run = document.getElementById("run");
    // statuses = [タイプ,HP,攻撃,防御,特攻,特防,素早さ,特性,持ち物,]
    const statuses = {
        "ヘイラッシャ":["みず",225,167,135,76,117,55,"てんねん","とつげきチョッキ","じしん","ゆきなだれ","ボディプレス"],
        "ハバタクカミ":["ゴースト・フェアリー",130,67,75,187,155,205,"こだいかっせい","ブーストエナジー","シャドーボール","サイコショック","マジカルフレイム"],
        "ロトム(ウォッシュ)":["みず・でんき",157,76,127,172,127,106,"ふゆう","こだわりメガネ","10まんボルト","シャドーボール","イカサマ"],
        "オーガポン(かまど)":["くさ・ほのお",155,172,104,72,116,178,"かたやぶり","かまどのめん","じゃれつく","ウッドホーン","じごくづき"],
        "イーユイ":["ほのお・あく",130,90,100,187,140,167,"わざわいのたま","こだわりスカーフ","かえんほうしゃ","あくのはどう","サイコキネシス"],
        "テツノカイナ":["でんき・かくとう",229,211,128,63,120,70,"クォークチャージ","パンチグローブ","かみなりパンチ","れいとうパンチ","じしん"],
        "ガブリアス":["じめん・ドラゴン",183,182,115,90,105,169,"さめはだ","こだわりハチマキ","じしん","いわなだれ","アイアンヘッド"],
        "ヌメルゴン(ヒスイ)":["はがね・ドラゴン",187,120,120,178,170,72,"シェルアーマー","たべのこし","10まんボルト","ラスターカノン","じしん"],
        "ギャラドス":["みず・ひこう",202,194,99,72,120,101,"いかく","ゴツゴツメット","じしん","アイアンヘッド","こおりのキバ"],
        "テツノブジン":["フェアリー・かくとう",149,150,110,172,72,184,"クォークチャージ","きあいのタスキ","インファイト","10まんボルト","シャドーボール"],
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
    const character = {
        "てんねん": { "damage": 'kougeki_rank = 1;bougyo_rank = 1;', "isdamage": 'meityuu_rank = 1;kaihi_rank = 1;' },
        "こだいかっせい": { "status": "if(a_status[" },
        "ふゆう": { "damage": 'if(skill_type=="じめん"{ return 0 }' },
        "": {}
    }
    console.table(`${a_n}のstatus:`);
    console.log(statuses[a_n]);
    console.log(`${d_n}のstatus:`);
    console.table(statuses[d_n]);
    //初期設定
    {
        a_n = attacker.getElementsByTagName("select")[0].value;
        var outputElement = document.getElementById("attacker_skill");

        // 既存のオプションをクリア
        outputElement.innerHTML = "";
        a_skills = statuses[a_n].slice(-3)
        for (var i = 0; i < a_skills.length; i++) {
            var option = document.createElement("option");
            option.value = a_skills[i];
            option.textContent = a_skills[i];
            outputElement.appendChild(option);
        }
        d_n = defender.getElementsByTagName("select")[0].value;
        var outputElement = document.getElementById("defender_skill");

        // 既存のオプションをクリア
        outputElement.innerHTML = "";

        d_skills = statuses[d_n].slice(-3)
        for (var i = 0; i < d_skills.length; i++) {
            var option = document.createElement("option");
            option.value = d_skills[i];
            option.disabled = true;
            option.textContent = d_skills[i];
            outputElement.appendChild(option);
        }
    }
    document.getElementById("attacker_select").addEventListener("change", function () {
        a_n = attacker.getElementsByTagName("select")[0].value;
        var outputElement = document.getElementById("attacker_skill");

        // 既存のオプションをクリア
        outputElement.innerHTML = "";

        a_skills = statuses[a_n].slice(8)
        for (var i = 0; i < a_skills.length; i++) {
            var option = document.createElement("option");
            option.value = a_skills[i];
            option.textContent = a_skills[i];
            outputElement.appendChild(option);
        }

        console.log(`${a_n}のstatus:`);
        console.log(statuses[a_n]);
    });
    document.getElementById("defender_select").addEventListener("change", function () {
        d_n = defender.getElementsByTagName("select")[0].value;
        var outputElement = document.getElementById("defender_skill");

        // 既存のオプションをクリア
        outputElement.innerHTML = "";

        d_skills = statuses[d_n].slice(8)
        for (var i = 0; i < d_skills.length; i++) {
            var option = document.createElement("option");
            option.value = d_skills[i];
            option.disabled = true;
            option.textContent = d_skills[i];
            outputElement.appendChild(option);
        }
        console.log(`${d_n}のstatus:`);
        console.log(statuses[d_n]);
    });



    document.getElementById("run").addEventListener("click", function () {
        let skill_n = document.getElementById("attacker_skill").value
        let skill = skills[skill_n]
        let attacker_s = statuses[a_n]

        let a_kougeki_rank = 1
        let a_tokukou_rank = 1
        let a_kougeki_hosei = 4096
        let d_bougyo_rank = 1
        let d_tokubou_rank = 1
        let d_bougyo_hosei = 4096
        let skill_hosei = 4096

        let damage_args = [
            statuses[a_n][0].split("・"),
            statuses[a_n][2],
            statuses[a_n][4],
            a_kougeki_rank,
            a_tokukou_rank,
            a_kougeki_hosei,

            statuses[d_n][0].split("・"),
            statuses[d_n][3],
            statuses[d_n][5],
            d_bougyo_rank,
            d_tokubou_rank,
            d_bougyo_hosei,

            skill[0],
            skill[1],
            skill[2],
            skill_hosei,
            false]
        let damage_v = damage(...damage_args)
        let outputtext = `${a_n}は${d_n}に${skill_n}で${damage_v}ダメージを与えた`
        if (document.getElementById("fix-random").checked) {
            damage_args.push(1)
            let max_damage = damage(...damage_args)
            damage_args[17] = 0.85
            let min_damage = damage(...damage_args)
            outputtext += `\n（${min_damage}以上${max_damage}以下）`
        }
        document.getElementById("output").innerText = outputtext;
    });
}