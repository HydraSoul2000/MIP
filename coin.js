const playerTotal = 0;
const computerTotal = 0;
const player = "player";
const AI = "computer";
let score;

class CoinGame {
    playerCoins = Stack;
    aICoins = Stack;
    availableMoney = Stack;
    turn = player; // create turn chose later

    constructor(turn) {
        this.availableMoney = new Stack();
        this.playerCoins = new Stack();
        this.aICoins = new Stack();
        this.turn = turn;
    }

    displayMoneyStack(divStackElementId, moneyStack) {
        var e = "";

        if (moneyStack != null) {
            var node = moneyStack.first;

            while (node != null) {
                e += "<button class='coin'> " + node.value + "</button><br/>";
                node = node.next;
            }

            document.getElementById(divStackElementId).innerHTML = e;
        }
    }

    changeTurn() {
        if (this.turn === player) {
            document.getElementById("takeCoinsButton").style.display = "none";
            document.getElementById("removeCoinsButton").style.display = "none";
            this.turn = AI;
        } else if (this.turn === AI) {
            document.getElementById("takeCoinsButton").style.display = "";
            document.getElementById("removeCoinsButton").style.display = "";
            this.turn = player;
        }
    }

    winner(playerCoins, aICoins) {
        if (playerCoins.sum < aICoins.sum) {
            return 1;
        } else if (playerCoins.sum > aICoins.sum) {
            return -1;
        } else if (playerCoins.sum === aICoins.sum) {
            return 0;
        } else {
            return null;
        }
    }

    gameOver() {
        if (this.availableMoney.length == 0) {
            let gameWinner = this.winner(this.playerCoins, this.aICoins);
            if(gameWinner === 1) {
                alert("computer won");
            } else if (gameWinner === -1) {
                alert("player won");
            } else {
                alert("draw");
            }
        }
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
        this.sum = 0;
    }

    push(value) {
        let newNode = new Node(value);
        if (this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            let prevFirst = this.first;
            this.first = newNode;
            newNode.next = prevFirst;
        }
        this.sum += parseInt(value);

        return ++this.length;
    }

    pop() {
        if (this.length === 0) return null;
        let removedNode = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.sum -= parseInt(removedNode.value);
        this.length--;
        return removedNode.value;
    }
}

function addCoins() {
    var option = document.getElementById("coinValues").value;
    game.availableMoney.push(option);
    game.displayMoneyStack("moneyStack", game.availableMoney);
    game.displayMoneyStack("moneyStack-preview", game.availableMoney);
}

function removeCoins() {
    game.availableMoney.pop();
    game.displayMoneyStack("moneyStack", game.availableMoney);
    game.displayMoneyStack("moneyStack-preview", game.availableMoney);
}

function playerTakeCoins() {
    game.playerCoins.push(game.availableMoney.first.value);
    removeCoins();
    game.displayMoneyStack("playerCoins", game.playerCoins);
    document.getElementById("player-points").innerHTML = game.playerCoins.sum;
    game.changeTurn();
    move = bestMove(game.playerCoins, game.aICoins, game.availableMoney);
    if (move === "TAKE") {
        aITakeCoins();
    } else if (move == "REMOVE") {
        aIRemoveCoins();
    } else if (move == "GAME OVER") {
        game.gameOver()
    }
    if(typeof(this.availableMoney) == "undefined") {
        game.gameOver();
    }
}

function aITakeCoins() {
    game.aICoins.push(game.availableMoney.first.value);
    removeCoins();
    game.displayMoneyStack("AICoins", game.aICoins);
    document.getElementById("ai-points").innerHTML = game.aICoins.sum;
    game.changeTurn();
}

function playerRemoveCoins() {
    if (game.aICoins.length !== 0) {
        game.aICoins.pop();
        game.displayMoneyStack("AICoins", game.aICoins);
        document.getElementById("ai-points").innerHTML = game.aICoins.sum;
        game.changeTurn();
        move = bestMove(game.playerCoins, game.aICoins, game.availableMoney);
        if (move === "TAKE") {
            aITakeCoins();
        } else if (move == "REMOVE") {
            aIRemoveCoins();
        } else if (move == "GAME OVER") {
            game.gameOver()
        }
    } else {
        alert("AI has no coins to take");
    }
    if(typeof(this.availableMoney) == "undefined") {
        game.gameOver();
    }
}

function aIRemoveCoins() {
    game.playerCoins.pop();
    game.displayMoneyStack("playerCoins", game.playerCoins)
    document.getElementById("player-points").innerHTML = game.playerCoins.sum;
    game.changeTurn();
}

function startGame() {
    if (game.availableMoney.length >= 3) {
        var firstTurn = document.getElementById("firstTurn").value;
        game.turn = firstTurn;
        if(firstTurn === AI){
            aITakeCoins();
        }
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
    } else {
        alert("To start game, You need to add at least 3 coins to stack!");
    }
}