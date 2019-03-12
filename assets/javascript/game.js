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

function attack(x, y) {

    damage = x.attack - y.defense

    y.hp = y.hp - damage

    $("#player-hp").text(player.hp);
    
    if (x.isBuff) {
        x.isBuff = false;
        x.attack = x.attack / 2.5
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
    x.isBuff = true
    x.attack = x.attack * 2.5
    console.log(x.attack)
};

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

$(document).ready(function(){

    $("#player-hp").text(player.hp);
    $("#player-atk").text(player.attack);
    $("#player-def").text(player.defense);

    $("#btn-atk").click(function(){
        attack(player, enemy_1)
        $("#actiontext").text("You attacked the enemy for " + damage + " damage!")
        turnEnd(player, enemy_1)
    });
    
    $("#btn-buff").click(function(){
        atkbuff(player)
        $("#actiontext").text("You strengthened your attack for next turn!")
        $("#player-atk").text(player.attack);
        turnEnd(player, enemy_1)
    });

    $("#btn-blk").click(function(){
        block(player)
        $("#actiontext").text("You blocked some incoming damage!")
        turnEnd(player, enemy_1)
    });

})