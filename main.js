window.onload = (e) => {
    const getElement = (id) => document.getElementById(id);

    const run = getElement("run");
    const fix_select = getElement("selectpokemon");
    const u_switch = getElement("user_switch");
    const e_switch = getElement("enemy_switch");
    const u_skill = getElement("user_skill");
    const e_skill = getElement("enemy_skill");
    const u_select = getElement("user_select").querySelectorAll("input");
    const e_select = getElement("enemy_select").querySelectorAll("input");
    const u_change = getElement("user_change");
    const e_change = getElement("enemy_change");
    const u_hp = getElement("user_hp");
    const e_hp = getElement("enemy_hp");
    const output = getElement("output");
    var u_names
    var e_names


    let u_pokes = {}    //チームのポケモン(struct)
    let e_pokes = {}
    let u_name = ""       //現在出ているポケモン(name)
    let e_name = ""

    let turn_count = 1
    // ポケモン選択を更新しておく
    const update_pokesmon = () => {
        e_pokes = {}; u_pokes = {};
        u_switch.innerHTML = "";
        e_switch.innerHTML = "";
        u_select.forEach(function (inputElement) {
            if (inputElement.checked) {
                const poke_name = inputElement.id.slice(0, -2)
                u_pokes[poke_name] = { ...getPokemon(poke_name) }
                var option = document.createElement("option");
                option.value = poke_name;
                option.textContent = poke_name;
                u_switch.appendChild(option);
            }
        });
        e_select.forEach(function (inputElement) {
            if (inputElement.checked) {
                const poke_name = inputElement.id.slice(0, -2)
                e_pokes[poke_name] = { ...getPokemon(poke_name) }
                var option = document.createElement("option");
                option.value = poke_name;
                option.textContent = poke_name;
                e_switch.appendChild(option);
            }
        });
    }
    update_pokesmon()

    //ポケモン選択の更新
    getElement("user_select").addEventListener("change", function () {
        update_pokesmon()
        console.log(u_pokes)
    });
    getElement("enemy_select").addEventListener("change", function () {
        update_pokesmon()
        console.log(e_pokes)
    })

    //スキル選択要素の更新
    const update_skills = (mode) => {
        const update_user = () => {
            u_skill.innerHTML = ""
            u_pokes[u_name].skills.forEach(function (skill) {
                var option = document.createElement("option");
                option.value = skill;
                option.textContent = skill;
                u_skill.appendChild(option);
            })
        }
        const update_enemy = () => {
            e_skill.innerHTML = ""
            e_pokes[e_name].skills.forEach(function (skill) {
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
                console.error("Error occurred");
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

        u_name = u_switch.value
        getElement("user_name").innerText = u_name
        e_name = e_switch.value
        getElement("enemy_name").innerText = e_name

        //ランクの初期化
        u_names.forEach(name => { u_pokes[name].rank = init_rank });
        e_names.forEach(name => { e_pokes[name].rank = init_rank });

        //特性などの発動
        phaze = "out"
        // 行動する側のポケモン、行動される側のポケモン

        // 速いポケモン、遅いポケモン
        const out_effect = (a_poke, b_poke, phaze) => {
            a_tokusei = a_poke.tokusei
            b_tokusei = b_poke.tokusei

            a_item = a_poke.item;
            b_item = b_poke.item;

            if (sort_turn(a_poke, b_poke)) {
                [b_poke, a_poke,] = activateItem(b_poke, a_poke, phaze)
            }
            else {
                [a_poke, b_poke] = activateTokusei(a_poke, b_poke, phaze)
            }


            return [a_poke, b_poke]
        }
        [a_name, b_name] = out_effect(u_pokes[u_name], e_pokes[e_name], phaze)

        update_skills("both")
    })

    // 交代ボタンのチェック
    u_change.addEventListener("click", () => {
        if (u_change.checked) {
            getElement("user_skill").innerHTML = ""
            u_skill.innerHTML = ""
            u_names.forEach(function (poke) {
                if (poke === u_name) return;
                var option = document.createElement("option");
                option.value = poke;
                option.textContent = poke;
                if (u_pokes[poke].hp <= 0) option.disabled = true;
                u_skill.appendChild(option);
            })
        } else {
            update_skills("user")
        }
    })
    e_change.addEventListener("click", () => {
        if (e_change.checked) {
            getElement("enemy_skill").innerHTML = ""
            e_skill.innerHTML = ""
            e_names.forEach(function (poke) {
                if (poke === e_name) return;
                var option = document.createElement("option");
                option.value = poke;
                option.textContent = poke;
                if (e_pokes[poke].hp <= 0) option.disabled = true;
                e_skill.appendChild(option);
            })
        } else {
            update_skills("enemy")
        }

    })
    function changepokemon() {
        phaze = "change"
        const user_change = () => {
            u_pokes[u_name].rank = init_rank
            output.innerText += u_name
            u_name = u_skill.value
            getElement("user_name").innerText = u_name
            // if (character[u_pokes[u_name][7]]?.phaze) eval(character[u_pokes[u_name]]?.phaze)
            // if (items[u_pokes[u_name][8]]?.phaze) eval(items[u_pokes[u_name][8]]?.phaze)
            u_change.checked = false
            output.innerText += `から${u_name}に交代\n`
        }
        const enemy_change = () => {
            e_pokes[e_name].rank = init_rank
            output.innerText += e_name
            e_name = e_skill.value
            getElement("enemy_name").innerText = e_name
            // if (character[e_pokes[e_name][7]]?.phaze) eval(character[e_pokes[e_name]]?.phaze)
            // if (items[e_pokes[e_name][8]]?.phaze) eval(items[e_pokes[e_name][8]]?.phaze)
            e_change.checked = false
            output.innerText += `から${e_name}に交代\n`
        }

        if (u_change.checked && e_change.checked) {
            console.log("両交代")
            //素早さ順で行動
            if (sort_turn(u_name, e_name)) {
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
            //死に出し後
            if (u_change.disabled) u_change.disabled = false;
            else run_skill(e_name, u_name, e_skill.value, "enemy")
            check_death()
        }
        else if (e_change.checked) {
            console.log("enemyの交代")
            enemy_change()
            update_skills("enemy")
            //userの攻撃
            if (e_change.disabled) e_change.disabled = false;
            else run_skill(u_name, e_name, u_skill.value, "user")
            check_death()
        }
        else {
            //行動順の判定
            if (sort_turn(u_name, e_name)) {
                run_skill(u_name, e_name, u_skill.value, "user")
                if (!check_death()[1]) { run_skill(e_name, u_name, e_skill.value, "enemy") }
                // check_death()
            }
            else {
                run_skill(e_name, u_name, e_skill.value, "enemy")
                if (!check_death()[0]) { run_skill(u_name, e_name, u_skill.value, "user") }
                // check_death()
            }
        }
    }

    //ターンをすすめる
    run.addEventListener("click", function () {
        // if (!u_change.disabled && !e_change.disabled) output.innerText += `ターン${turn_count}\n`;
        if (!u_change.disabled && !e_change.disabled) {
            var turn = getElement("turn")
            var newTurn = document.createElement("div");
            newTurn.className = "turn"
            var title = document.createElement("div")
            title.className = "title"
            title.textContent = `ターン${turn_count}`
            var turnText = document.createElement("div")
            turnText.className = "turn_text"
            newTurn.appendChild(title)
            newTurn.appendChild(turnText)
            turn.appendChild(newTurn)
        }
        changepokemon()

        u_hp.innerText = `${u_pokes[u_name].hp}/${getPokemon(u_name).hp}`
        e_hp.innerText = `${e_pokes[e_name].hp}/${getPokemon(e_name).hp}`



        var childNodes = Array.from(output.childNodes);
        for (var i = 0; i < childNodes.length; i++) {
            var turnText = [...document.getElementsByClassName("turn_text")].slice(-1)[0]
            var child = childNodes[i];
            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
                var lines = child.textContent.split('\n');
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j];
                    if (line.trim() !== '') {
                        var div = document.createElement('div');
                        div.textContent = line;
                        turnText.appendChild(div);
                    }
                }
            }
            output.innerText = ""
        }

        if (!u_change.disabled && !e_change.disabled) turn_count += 1
    })

    function run_skill(attacker_name, defender_name, skill, attacker_side) {
        if (attacker_side === "user") { damage_args = [u_pokes[attacker_name], e_pokes[defender_name]] }
        else { damage_args = [e_pokes[attacker_name], u_pokes[defender_name]] }
        damage_args.push(skill)

        let damage_num = damage(...damage_args)
        let outputtext = `${attacker_name}は${defender_name}に${skill}で${damage_num}ダメージを与えた`
        if (getElement("fix-random").checked) {
            damage_args.push(1)
            let max_damage = damage(...damage_args)
            damage_args[3] = 0.85
            let min_damage = damage(...damage_args)
            output.innerText += outputtext + ` (${min_damage}以上${max_damage}以下）` + "\n";
            return
        }

        if (attacker_side === "user") {
            e_pokes[defender_name].hp -= damage_num
        } else {
            u_pokes[defender_name].hp -= damage_num
        }

        output.innerText += outputtext + "\n";

    }

    function check_death() {
        user_hp = u_pokes[u_name].hp
        enemy_hp = e_pokes[e_name].hp
        if (user_hp <= 0 && enemy_hp <= 0) {
            u_change.click()
            e_change.click()
            u_change.disabled = true
            e_change.disabled = true
            output.innerText += `${u_name}は倒れた\n`
            output.innerText += `${e_name}は倒れた\n`
            return [true, true]
        }
        else if (user_hp <= 0) {
            u_change.click()
            u_change.disabled = true
            output.innerText += `${u_name}は倒れた\n`
            if (u_skill.value === "") { output.innerText += "user lose"; run.disabled = true }
            return [true, false]
        }
        else if (enemy_hp <= 0) {
            e_change.click()
            e_change.disabled = true
            output.innerText += `${e_name}は倒れた\n`
            if (e_skill.value === "") { output.innerText += "enemy lose"; run.disabled = true }
            return [false, true]
        }
        return [false, false]
    }
    function start_effect(u_namemon, e_namemon) {

    }
    function output_tokusei(poke, text) {
        output.innerText += `${poke}の${text}が発動`
    }
}