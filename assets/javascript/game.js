var player = {
    hp: 200,
    attack: 60,
    defense: 20,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff = false,
};

var enemy_1 = {
    hp: 200,
    attack: 50,
    defense: 10,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff = false
};

var enemy_2 = {
    hp: 250,
    attack: 60,
    defense: 30,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff = false,
};

var enemy_3 = {
    hp: 300,
    attack: 70,
    defense: 50,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff = false,
};

var damage = "";

var enemyChoice = [];

function attack(x, y) {

    damage = x.attack - y.defense

    y.hp = y.hp - damage

    $("#player-hp").text(player.hp);
    $("#enemy-hp").text(enemy_1.hp);
    
    if (x.isBuff) {
        x.isBuff = false;
        x.attack = x.attack / 2
        $("#player-atk").text(player.attack);
        $("#enemy-atk").text(player.attack);

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
        x.alreadyBuff = true
    }

    else {
        x.isBuff = true
        x.attack = x.attack * 2
        console.log(x.attack)
        x.alreadyBuff = true
    }
};

function enemyTurn(event) {
    var enemyActions = [attack(enemy_1, player)];
    enemyChoice = enemyActions[Math.floor(Math.random()*enemyActions.length)];
    $("#enemyactiontext").text("Enemy counter-attacked for " + damage + " damage!")
    console.log(enemyChoice)
}

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

    if (player.hp <= 0) {
        $("#actiontext").text("You lose!")
        player.isLive = false;
    }

    if (enemy_1.hp <= 0) {
        $("#enemyactiontext").text("You defeated the enemy!")
        enemy_1.isLive = false;
    }

};


    $("#player-hp").text(player.hp);
    $("#player-atk").text(player.attack);
    $("#player-def").text(player.defense);

    $("#enemy-hp").text(enemy_1.hp);
    $("#enemy-atk").text(enemy_1.attack);
    $("#enemy-def").text(enemy_1.defense);

    $("#btn-atk").click(function(){
        attack(player, enemy_1)
        $("#actiontext").text("You attacked the enemy for " + damage + " damage!")
        player.alreadyBuff = false;
        enemyTurn()
        turnEnd(player, enemy_1)
        
    });
    
    $("#btn-buff").click(function(){

        if (player.alreadyBuff) {
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

