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
    const u_hp = document.getElementById("user_hp")
    const e_hp = document.getElementById("enemy_hp")
    const output = document.getElementById("output")
    var u_names
    var e_names


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
                u_pokes[poke_name] = { ...pokemon[poke_name] }
                var option = document.createElement("option");
                option.value = poke_name;
                option.textContent = poke_name;
                u_switch.appendChild(option);
            }
        });
        e_select.forEach(function (inputElement) {
            if (inputElement.checked) {
                const poke_name = inputElement.id.slice(0, -2)
                e_pokes[poke_name] = { ...pokemon[poke_name] }
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

    //スキル選択要素の更新
    const update_skills = (mode) => {
        const update_user = () => {
            u_skill.innerHTML = ""
            pokemon[u_poke].slice(9, -1).forEach(function (skill) {
                var option = document.createElement("option");
                option.value = skill;
                option.textContent = skill;
                u_skill.appendChild(option);
            })
        }
        const update_enemy = () => {
            e_skill.innerHTML = ""
            pokemon[e_poke].slice(9, -1).forEach(function (skill) {
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
        u_names.forEach(name => {
            u_pokes[name][13] = init_rank
        });
        e_names.forEach(name => {
            e_pokes[name][13] = init_rank
        });

        update_skills("both")
    })

    // 交代ボタンのチェック
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
    function changepokemon() {
        phaze = "change"
        const user_change = () => {
            u_pokes[u_poke][13] = init_rank
            output.innerText += u_poke
            u_poke = u_skill.value
            document.getElementById("user_name").innerText = u_poke
            if (character[u_pokes[u_poke][7]]?.phaze) eval(character[u_pokes[u_poke]]?.phaze)
            if (items[u_pokes[u_poke][8]]?.phaze) eval(items[u_pokes[u_poke][8]]?.phaze)
            u_change.checked = false
            output.innerText += `から${u_poke}に交代\n`
        }
        const enemy_change = () => {
            e_pokes[e_poke][13] = init_rank
            output.innerText += e_poke
            e_poke = e_skill.value
            document.getElementById("enemy_name").innerText = e_poke
            if (character[e_pokes[e_poke][7]]?.phaze) eval(character[e_pokes[e_poke]]?.phaze)
            if (items[e_pokes[e_poke][8]]?.phaze) eval(items[e_pokes[e_poke][8]]?.phaze)
            e_change.checked = false
            output.innerText += `から${e_poke}に交代\n`
        }

        if (u_change.checked && e_change.checked) {
            console.log("両交代")
            //素早さ順で行動
            if (sort_turn(u_poke, e_poke)) {
                user_change()
                enemy_change()
            } else {
                enemy_change()
                user_change()
            }

            update_skills("both")
        }
        else if (u_change.checked) {
            console.log("userの交代")
            user_change()
            update_skills("user")
            //enemyの攻撃
            run_skill(e_poke, u_poke, e_skill.value, "enemy")
        }
        else if (e_change.checked) {
            console.log("enemyの交代")
            enemy_change()
            update_skills("enemy")
            //userの攻撃
            run_skill(u_poke, e_poke, u_skill.value, "user")
        }
        else {
            //行動順の判定
            if (sort_turn(u_poke, e_poke)) {
                run_skill(u_poke, e_poke, u_skill.value, "user")
                run_skill(e_poke, u_poke, e_skill.value, "enemy")
            }
            else {
                run_skill(e_poke, u_poke, e_skill.value, "enemy")
                run_skill(u_poke, e_poke, u_skill.value, "user")
            }
        }
    }

    //ターンをすすめる
    run.addEventListener("click", function () {
        changepokemon()
        output.innerText += "\n";
    })

    function run_skill(attacker_name, defender_name, skill, attacker_side) {
        if (attacker_side === "user") { damage_args = [u_pokes[attacker_name], e_pokes[defender_name]] }
        else { damage_args = [e_pokes[attacker_name], u_pokes[defender_name]] }
        damage_args.push(skill)

        let damage_num = damage(...damage_args)
        let outputtext = `${attacker_name}は${defender_name}に${skill}で${damage_num}ダメージを与えた`
        if (document.getElementById("fix-random").checked) {
            damage_args.push(1)
            let max_damage = damage(...damage_args)
            damage_args[3] = 0.85
            let min_damage = damage(...damage_args)
            outputtext += ` (${min_damage}以上${max_damage}以下）`
        } else {

            if (attacker_side === "user") {
                u_pokes[attacker_name][1] -= damage_num
                u_hp.innerText = `${u_pokes[attacker_name][1]}/${pokemon[attacker_name][1]}`
                e_hp.innerText = `${e_pokes[defender_name][1]}/${pokemon[defender_name][1]}`
            } else {
                e_pokes[attacker_name][1] -= damage_num
                u_hp.innerText = `${u_pokes[defender_name][1]}/${pokemon[defender_name][1]}`
                e_hp.innerText = `${e_pokes[attacker_name][1]}/${pokemon[attacker_name][1]}`
            }
            console.log(pokemon)
        }

        output.innerText += outputtext + "\n";
    }

}