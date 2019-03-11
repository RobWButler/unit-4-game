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

function attack(x, y) {

    y.hp = (y.hp - x.attack) + y.defense;
    $("#player-hp").text(player.hp);
    
    if (x.isBuff) {
        x.isBuff = false;
        x.attack = x.attack / 2.5
    }

    console.log(x, y)
};

function block(x) {
    x.isBlock = true
    x.defense = x.defense * 2.5
    $("#player-def").text(player.defense);
    console.log(x.defense)
};

function atkbuff(x) {
    x.isBuff = true
    x.attack = x.attack * 2.5
    $("#player-atk").text(player.attack);
    console.log(x.attack)
};

function turnEnd(x, y) {
    x.isBlock = false
    y.isBlock = false
    x.defense = x.defense / 2.5
    y.defense = y.defense / 2.5
};

$(document).ready(function(){

    $("#player-hp").text(player.hp);
    $("#player-atk").text(player.attack);
    $("#player-def").text(player.defense);

    $("#btn-atk").click(function(){
        attack(player, enemy_1)
    });
    
    $("#btn-buff").click(function(){
        atkbuff(player)
    });

    $("#btn-blk").click(function(){
        block(player)
    });

})