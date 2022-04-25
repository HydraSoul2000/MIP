class Coins {
    playerMoney;
    aIMoney;
    availableMoney;

    constructor(playerMoney, aIMoney, availableMoney) {
        this.playerMoney = playerMoney;
        this.aIMoney = aIMoney;
        this.availableMoney = availableMoney;
    }
}

//labaka gajiena funkcija
function bestMove(playerCoins, aICoins, availableMoney) {
    let bestScore = -Infinity;
    let move;
    let score;
    let depth = 0;

    //ja tukss naudas stack tad izvada speles beigas
    if (availableMoney.first == null) {
        return "GAME OVER"
    }

    currentMoney = playerCoins.first;
    //parbauda vai speletajm ir monetas
    if (playerCoins.length !== 0) {
        aICoins.push(availableMoney.first.value);
        score = minimax(playerCoins, aICoins, availableMoney, depth, true);
        aICoins.pop();
        if (score > bestScore) {
            bestScore = score;
            move = "TAKE";
        }
        playerCoins.pop();
        score = minimax(playerCoins, aICoins, availableMoney, depth, true);
        playerCoins.push(currentMoney.value);
        if (score > bestScore) {
            bestScore = score;
            move = "REMOVE";
        }
        return move;
    } else {
        aITakeCoins();
    }
}

//minimax funkc
function minimax(playerMoney, aIMoney, availableMoney, depth, isMaximising) {
    let result = game.winner(playerMoney, aIMoney);

    if (result != null || availableMoney.first == null) {
        return result;
    }

    let currentFirstAvailableCoin = availableMoney.first;
    let score;
    if (isMaximising) {
        let bestScore = -Infinity;
        aIMoney.push(availableMoney.first.value);
        availableMoney.pop();
        //rekrusivi izsaucam minimax
        score = minimax(playerMoney, aIMoney, availableMoney, depth + 1, false);
        bestScore = Math.max(score, bestScore);
        aIMoney.pop();
        availableMoney.push(currentFirstAvailableCoin.value)
        let currentMoney = playerCoins.first;
        playerMoney.pop();
        //rekrusivi izsaucam minimax
        score = minimax(playerMoney, aIMoney, availableMoney, depth + 1, false);
        bestScore = Math.max(score, bestScore);
        playerMoney.push(currentMoney.value);
        return bestScore;
    } else {
        let bestScore = Infinity;
        aIMoney.push(availableMoney.first.value);
        availableMoney.pop();
        //rekrusivi izsaucam minimax
        score = minimax(playerMoney, aIMoney, availableMoney, depth + 1, true);
        bestScore = Math.min(score, bestScore);
        aIMoney.pop();
        availableMoney.push(currentFirstAvailableCoin.value)
        let currentMoney = playerCoins.first;
        playerMoney.pop();
        //rekrusivi izsaucam minimax
        score = minimax(playerMoney, aIMoney, availableMoney, depth + 1, true);
        bestScore = Math.min(score, bestScore);
        playerMoney.push(currentMoney.value);
        return bestScore;
    }
}