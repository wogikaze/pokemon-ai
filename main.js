window.onload = (e) => {
    const run = document.getElementById("run");
    const fix_select = document.getElementById("selectpokemon")
    const u_switch = document.getElementById("user_switch")
    const e_switch = document.getElementById("enemy_switch")
    const u_skill = document.getElementById("user_skill")
    const e_skill = document.getElementById("enemy_skill")
    const u_select = document.getElementById("user_select").querySelectorAll("input")
    const e_select = document.getElementById("enemy_select").querySelectorAll("input")
    var u_names
    var e_names
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
    const character = {
        "てんねん": { "damage": 'kougeki_rank = 1;bougyo_rank = 1;', "isdamage": 'meityuu_rank = 1;kaihi_rank = 1;' },
        "こだいかっせい": { "status": "if(u_status[" },
        "ふゆう": { "damage": 'if(skill_type=="じめん"{ return 0 }' },
        "": {}
    }


    let u_pokes = {}    //チームのポケモン(struct)
    let e_pokes = {}
    let u_poke = ""       //現在出ているポケモン(name)
    let e_poke = ""
    // ポケモン選択を更新しておく
    const update_pokesmon = () => {
        e_pokes = {}; u_pokes = {};
        u_switch.innerHTML = "";
        e_switch.innerHTML = "";
        u_select.forEach(function (inputElement) {
            if (inputElement.checked) {
                const poke_name = inputElement.id.slice(0, -2)
                u_pokes[poke_name] = pokemon[poke_name];
                var option = document.createElement("option");
                option.value = poke_name;
                option.textContent = poke_name;
                u_switch.appendChild(option);
            }
        });
        e_select.forEach(function (inputElement) {
            if (inputElement.checked) {
                const poke_name = inputElement.id.slice(0, -2)
                e_pokes[poke_name] = pokemon[poke_name]
                var option = document.createElement("option");
                option.value = poke_name;
                option.textContent = poke_name;
                e_switch.appendChild(option);
            }
        });
    }
    update_pokesmon()

    //ポケモン選択の更新
    document.getElementById("user_select").addEventListener("change", function () {
        update_pokesmon()
        console.log(u_pokes)
    });
    document.getElementById("enemy_select").addEventListener("change", function () {
        update_pokesmon()
        console.log(e_pokes)
    })

    //スキル選択の更新
    const update_skills = () => {
        u_skill.innerHTML = ""
        e_skill.innerHTML = ""
        pokemon[u_poke].slice(9).forEach(function (skill) {
            var option = document.createElement("option");
            option.value = skill;
            option.textContent = skill;
            u_skill.appendChild(option);
        })
        pokemon[e_poke].slice(9).forEach(function (skill) {
            var option = document.createElement("option");
            option.value = skill;
            option.textContent = skill;
            e_skill.appendChild(option);
        })
    }


    // パーティーを固定して開始
    fix_select.addEventListener("click", function () {
        u_names = [...document.querySelectorAll("#user_select input:checked")].map(e => e.id.slice(0, -2))
        e_names = [...document.querySelectorAll("#enemy_select input:checked")].map(e => e.id.slice(0, -2))
        if (u_names.length !== 3 || e_names.length !== 3) {
            alert("どちらも3体のポケモンを選んでください");
            return
        }
        e_select.forEach(element => { element.disabled = true });
        u_select.forEach(element => { element.disabled = true });
        fix_select.disabled = true;
        u_switch.disabled = true;
        e_switch.disabled = true;

        u_poke = u_switch.value
        document.getElementById("user_name").innerText = u_poke
        e_poke = e_switch.value
        document.getElementById("enemy_name").innerText = e_poke

        update_skills()
    })

    // 交代
    document.getElementById("user_change").addEventListener("click", () => {
        if (document.getElementById("user_change").checked) {
            document.getElementById("user_skill").innerHTML = ""
            u_skill.innerHTML = ""
            u_names.forEach(function (poke) {
                if (poke === u_poke) return;
                var option = document.createElement("option");
                option.value = poke;
                option.textContent = poke;
                u_skill.appendChild(option);
            })
        } else {
            update_skills()
        }
    })
    document.getElementById("enemy_change").addEventListener("click", () => {
        if (document.getElementById("enemy_change").checked) {
            document.getElementById("enemy_skill").innerHTML = ""
            e_skill.innerHTML = ""
            e_names.forEach(function (poke) {
                if (poke === e_poke) return;
                var option = document.createElement("option");
                option.value = poke;
                option.textContent = poke;
                e_skill.appendChild(option);
            })
        } else {
            update_skills()
        }

    })

    run.addEventListener("click", function () {
        console.log(u_poke, u_skill.value)
        console.log(e_poke, e_skill.value)
        //行動できるかの判定
        //ポケモンの交代
        if (document.getElementById("user_change").checked && document.getElementById("enemy_change").checked) {
            console.log("両交代")
            u_poke = u_skill.value
            document.getElementById("user_name").innerText = u_poke
            e_poke = e_skill.value
            document.getElementById("enemy_name").innerText = e_poke
            document.getElementById("user_change").checked = false
            document.getElementById("enemy_change").checked = false
        }
        else if (document.getElementById("user_change").checked) {
            console.log("userの交代")
            u_poke = u_skill.value
            document.getElementById("user_name").innerText = u_poke
            document.getElementById("user_change").checked = false
            //enemyの攻撃
        }
        else if (document.getElementById("enemy_change").checked) {
            console.log("enemyの交代")
            e_poke = e_skill.value
            document.getElementById("enemy_name").innerText = e_poke
            document.getElementById("enemy_change").checked = false
            //userの攻撃
        }
        update_skills()
    })
}