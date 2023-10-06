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

console.log("vital_rank: 3", check_vital(3))