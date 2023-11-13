class Item {
    constructor(name, phazes) {
        this.name = name; // 持ち物の名前
        this.phazes = phazes; // 持ち物の効果の発動関数のマップ
    }

    // 持ち物の効果を発動するメソッド
    activate(attacker, defender, phaze) {
        if (this.phazes[phaze]) {
            this.phazes[phaze](attacker, defender);
            console.log(`持ち物：${defender.name}の${defender.item}`);
        } else {
            console.log(`Unknown phaze: ${phaze}`);
        }
    }
}
const activateItem = (attacker, defender, phaze) => {
    const item = itemMap[defender.item]; // 持ち物のオブジェクトを取得
    if (item) {
        item.activate(attacker, defender, phaze); // 持ち物を発動
    } else {
        console.log(`Unknown item: ${defender.item}`);
    }
    return [attacker, defender]
}
// 持ち物のオブジェクトのマップ
const itemMap = {
    
}