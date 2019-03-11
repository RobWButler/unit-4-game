var player = {
    hp: 200,
    attack: 80,
    defense: 50,
    isBlock: false,
    isBuff: false,
};

var enemy_1 = {
    hp: 200,
    attack: 50,
    defense: 10,
    isBlock: false,
    isBuff: false,
};

var enemy_2 = {
    hp: 250,
    attack: 60,
    defense: 30,
    isBlock: false,
    isBuff: false,
};

var enemy_3 = {
    hp: 300,
    attack: 70,
    defense: 50,
    isBlock: false,
    isBuff: false,
};

function attack(x, y) {
    if (y.isBlock) {
        y.hp = y.hp + (y.defense + (y.defense/2))
    }

    if (x.isBuff) {
        y.hp = y.hp - (x.attack + (x.attack/2))
    }

    else {
        y.hp = (y.hp - x.attack) + y.defense
    }

    console.log(player, enemy_1)
};

function block(x) {
    x.isBlock = true
};

function atkbuff (x) {
    x.isBuff = true
};

function turnEnd (x, y) {
    x.isBlock = false
    x.isBuff = false
    y.isBlock = false
    y.isBuff = false
};


$("#player-hp").text(player.hp);
$("#player-atk").text(player.attack);
$("#player-def").text(player.defense);