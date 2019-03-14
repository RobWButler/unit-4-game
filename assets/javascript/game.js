var player = {
    hp: "",
    attack: "",
    defense: "",
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var enemy = {
    hp: "",
    attack: "",
    defense: "",
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var char_1 = {
    hp: 200,
    attack: 60,
    defense: 20,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
}

var char_2 = {
    hp: 200,
    attack: 50,
    defense: 10,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false
};

var char_3 = {
    hp: 250,
    attack: 60,
    defense: 30,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var char_4 = {
    hp: 300,
    attack: 70,
    defense: 50,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var damage = "";

var playerChoice = false;
var enemyChoice = false;

function attack(x, y) {

    damage = x.attack - y.defense

    y.hp = y.hp - damage

    $("#player-hp").text(player.hp);
    $("#enemy-hp").text(enemy.hp);
    
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

//Aborted attempt at calling random functions so enemy could use the same moves as player randomly each turn
function enemyTurn(event) {
    attack(enemy, player)
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
        $("#buttonspace").toggle()

    }

    if (enemy.hp <= 0) {
        $("#enemyactiontext").text("Enemy was defeated!")
        enemy.isLive = false;
        $("#buttonspace").toggle()
        $("#instructions").text("Select your opponent!")

    }

};


$("#player-hp").text(player.hp);
$("#player-atk").text(player.attack);
$("#player-def").text(player.defense);

$("#enemy-hp").text(enemy.hp);
$("#enemy-atk").text(enemy.attack);
$("#enemy-def").text(enemy.defense);

$("#btn-atk").click(function(){
    attack(player, enemy)
    $("#actiontext").text("You attacked the enemy for " + damage + " damage!")
    player.alreadyBuff = false;
    enemyTurn()
    turnEnd(player, enemy)
    
});

$("#btn-buff").click(function(){

    if (player.alreadyBuff) {
        $("#actiontext").text("Can't power up twice in a row!")
        $("#player-atk").text(player.attack);
        turnEnd(player, enemy)
    }

    else {
        atkbuff(player)
        $("#actiontext").text("You strengthened your attack for next turn!")
        $("#player-atk").text(player.attack);
        turnEnd(player, enemy)
    }
});

$("#btn-blk").click(function(){
    block(player)
    $("#actiontext").text("You blocked some incoming damage!")
    turnEnd(player, enemy)
});


$("#choice1").click(function(){
    if (playerChoice != true) {
        for(var k in char_1) (player[k] = char_1[k])
        $("#player-hp").text(player.hp);
        $("#player-atk").text(player.attack);
        $("#player-def").text(player.defense);
        playerChoice = true;
        $("#choice1").toggle()
        $("#instructions").text("Select your opponent!")
    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_1) (enemy[k] = char_1[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        enemyChoice = true;
        $("#choice1").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()


    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_1) (enemy[k] = char_1[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        enemyChoice = true;
        $("#choice1").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else {

    }

})

$("#choice2").click(function(){
    if (playerChoice != true) {
        for(var k in char_2) (player[k] = char_2[k])
        $("#player-hp").text(player.hp);
        $("#player-atk").text(player.attack);
        $("#player-def").text(player.defense);
        playerChoice = true;
        $("#choice2").toggle()
        $("#instructions").text("Select your opponent!")

    }

    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_2) (enemy[k] = char_2[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        enemyChoice = true;
        $("#choice2").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }
    
    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_2) (enemy[k] = char_2[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        $("#choice2").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else {

    }
})

$("#choice3").click(function(){
    if (playerChoice != true) {
        for(var k in char_3) (player[k] = char_3[k])
        $("#player-hp").text(player.hp);
        $("#player-atk").text(player.attack);
        $("#player-def").text(player.defense);
        playerChoice = true;
        $("#choice3").toggle()
        $("#instructions").text("Select your opponent!")

    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_3) (enemy[k] = char_3[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        enemyChoice = true;
        $("#choice3").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_3) (enemy[k] = char_3[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        $("#choice3").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else {

    }
})

$("#choice4").click(function(){
    if (playerChoice != true) {
        for(var k in char_4) (player[k] = char_4[k])
        $("#player-hp").text(player.hp);
        $("#player-atk").text(player.attack);
        $("#player-def").text(player.defense);
        playerChoice = true;
        $("#choice4").toggle()
        $("#instructions").text("Select your opponent!")

    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_4) (enemy[k] = char_4[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        enemyChoice = true;
        $("#choice4").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()


    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_4) (enemy[k] = char_4[k])
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        $("#choice4").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else {

    }
})