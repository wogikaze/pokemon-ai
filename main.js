window.onload = (e) => {
    const run = document.getElementById("run");
    const fix_select = document.getElementById("selectpokemon")
    const u_switch = document.getElementById("user_switch")
    const e_switch = document.getElementById("enemy_switch")
    const u_skill = document.getElementById("user_skill")
    const e_skill = document.getElementById("enemy_skill")
    const u_select = document.getElementById("user_select").querySelectorAll("input")
    const e_select = document.getElementById("enemy_select").querySelectorAll("input")
    const u_change = document.getElementById("user_change")
    const e_change = document.getElementById("enemy_change")
    const output = document.getElementById("output")

    let u_pokes = {}    //チームのポケモン(struct)
    let e_pokes = {}
    let u_poke = ""     //現在出ているポケモン(name)
    let e_poke = ""
    var u_names         //チームのポケモン([name])
    var e_names
    // ポケモン選択を更新しておく
    const update_pokes = () => {
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
    update_pokes()

    //ポケモン選択の更新
    document.getElementById("user_select").addEventListener("change", function () {
        update_pokes()
        console.log(u_pokes)
    });
    document.getElementById("enemy_select").addEventListener("change", function () {
        update_pokes()
        console.log(e_pokes)
    })

    //スキル選択要素の更新
    const update_skills = (mode) => {
        const update_user = () => {
            u_skill.innerHTML = ""
            pokemon[u_poke].slice(9).forEach(function (skill) {
                var option = document.createElement("option");
                option.value = skill;
                option.textContent = skill;
                u_skill.appendChild(option);
            })
        }
        const update_enemy = () => {
            e_skill.innerHTML = ""
            pokemon[e_poke].slice(9).forEach(function (skill) {
                var option = document.createElement("option");
                option.value = skill;
                option.textContent = skill;
                e_skill.appendChild(option);
            })
        }
        switch (mode) {
            case "both":
                update_user()
                update_enemy()
                break;
            case "user":
                update_user()
                break;
            case "enemy":
                update_enemy()
                break;
            default:
                alert("err")
                break;
        }
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
        run.disabled = false

        u_poke = u_switch.value
        document.getElementById("user_name").innerText = u_poke
        e_poke = e_switch.value
        document.getElementById("enemy_name").innerText = e_poke

        //ランクの初期化
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
        u_names.forEach(name => {
            u_pokes[name][12] = init_rank
        }); 
        e_names.forEach(name => {
            e_pokes[name][12] = init_rank
        }); 
        update_skills("both")
    })

    // 交代チェック
    u_change.addEventListener("click", () => {
        if (u_change.checked) {
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
            update_skills("user")
        }
    })
    e_change.addEventListener("click", () => {
        if (e_change.checked) {
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
            update_skills("enemy")
        }

    })
    // 行動：交代
    function changepokemon(user) {
        const user_change = () => {
            u_poke = u_skill.value
            document.getElementById("user_name").innerText = u_poke
            u_change.checked = false
        }
        const enemy_change = () => {
            e_poke = e_skill.value
            document.getElementById("enemy_name").innerText = e_poke
            e_change.checked = false
        }
        if (u_change.checked && e_change.checked) {
            console.log("両交代")
            //素早さ順で行動
            let order = sortbyspeed()

            user_change()
            enemy_change()
            update_skills("both")
        }
        else if (u_change.checked) {
            console.log("userの交代")
            user_change()
            update_skills("user")
            //enemyの攻撃
        }
        else if (e_change.checked) {
            console.log("enemyの交代")
            enemy_change()
            update_skills("enemy")
            //userの攻撃
        }
    }
    run.addEventListener("click", function () {
        console.log(u_poke, u_skill.value)
        console.log(e_poke, e_skill.value)
        //行動できるかの判定
        //ポケモンの交代
        changepokemon()




        let skill_n = u_skill.value
        let skill = skills[skill_n]

        let a_kougeki_rank = 1
        let a_tokukou_rank = 1
        let a_kougeki_hosei = 4096
        let d_bougyo_rank = 1
        let d_tokubou_rank = 1
        let d_bougyo_hosei = 4096
        let skill_hosei = 4096

        let damage_args = [
            pokemon[u_poke][0].split("・"),
            pokemon[u_poke][2],
            pokemon[u_poke][4],
            a_kougeki_rank,
            a_tokukou_rank,
            a_kougeki_hosei,

            pokemon[e_poke][0].split("・"),
            pokemon[e_poke][3],
            pokemon[e_poke][5],
            d_bougyo_rank,
            d_tokubou_rank,
            d_bougyo_hosei,

            skill[0],
            skill[1],
            skill[2],
            skill_hosei,
            false]
        let damage_v = damage(...damage_args)
        let outputtext = `${u_poke}は${e_poke}に${skill_n}で${damage_v}ダメージを与えた\n`
        if (document.getElementById("fix-random").checked) {
            damage_args.push(1)
            let max_damage = damage(...damage_args)
            damage_args[17] = 0.85
            let min_damage = damage(...damage_args)
            outputtext += `（${min_damage}以上${max_damage}以下）\n`
        }
        output.innerText += outputtext;


    })


}