//急所の判定
const check_vital = (
    vital_rank
) => {
    randomNumber = Math.random();
    if (randomNumber < vital_rate[vital_rank]) {
        return true
    }
    return false
}

const vital_rate = [1 / 24, 1 / 8, 1 / 2, 1 / 1]

// console.log("vital_rank: 3", check_vital(3))

//ターンの並び替え
const sort_turn = (
    u_poke,
    e_poke,
) => {
    //todo:トリックルーム
    //todo:場の状態:道具:特性
    //todo:まひ状態
    //todo:優先度:下位優先度
    if (pokemon[u_poke][6] > pokemon[e_poke][6]) {
        return 1
    }
    else if (pokemon[u_poke][6] === pokemon[e_poke][6]) {
        return Math.random() < 0.5 ? 0 : 1;
    }
    else {
        return 0
    }
}

//ランクの初期化
const init_u_rank = (u_pokes, u_poke) => {
    u_pokes[u_poke][13] = init_rank
    return u_pokes[u_poke]
}
const init_e_rank = (e_pokes, e_poke) => {
    e_pokes[e_poke][13] = init_rank
    return e_pokes[e_poke]
}