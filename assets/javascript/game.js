var player = {
    hp: 200,
    attack: 60,
    defense: 20,
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

var damage = "";

var alreadyBuff = false;

var enemyChoice = [];

function attack(x, y) {

    damage = x.attack - y.defense

    y.hp = y.hp - damage

    $("#player-hp").text(player.hp);
    
    if (x.isBuff) {
        x.isBuff = false;
        x.attack = x.attack / 2
        $("#player-atk").text(player.attack);
    }

    console.log(x, y)
};

function block(x) {
    x.isBlock = true
    x.defense = x.defense * 2.5
    console.log(x.defense)
};

function atkbuff(x) {
    if (x.isBuff) {
        alreadyBuff = true
    }

    else {
        x.isBuff = true
        x.attack = x.attack * 2
        console.log(x.attack)
        alreadyBuff = true
    }
};

//function enemyTurn () {
//    var enemyActions = [attack(enemy_1, player), block(enemy_1), atkbuff(enemy_1)];
//    enemyChoice = enemyActions[Math.floor(Math.random()*enemyActions.length - 1)];

//   console.log(enemyChoice)
//}

function turnEnd(x, y) {
    if (x.isBlock) {
        x.defense = x.defense / 2.5
    }

    if (y.isBlock) {
        y.defense = y.defense / 2.5
    }

    x.isBlock = false
    y.isBlock = false

    $("#player-def").text(player.defense);

};


    $("#player-hp").text(player.hp);
    $("#player-atk").text(player.attack);
    $("#player-def").text(player.defense);

    $("#btn-atk").click(function(){
        attack(player, enemy_1)
        $("#actiontext").text("You attacked the enemy for " + damage + " damage!")
        alreadyBuff = false;
        turnEnd(player, enemy_1)
    });
    
    $("#btn-buff").click(function(){

        if (alreadyBuff) {
            $("#actiontext").text("Can't power up twice in a row!")
            $("#player-atk").text(player.attack);
            turnEnd(player, enemy_1)
        }

        else {
            atkbuff(player)
            $("#actiontext").text("You strengthened your attack for next turn!")
            $("#player-atk").text(player.attack);
            turnEnd(player, enemy_1)
        }
    });

    $("#btn-blk").click(function(){
        block(player)
        $("#actiontext").text("You blocked some incoming damage!")
        turnEnd(player, enemy_1)
    });

