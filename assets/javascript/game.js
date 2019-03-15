var playMusic = new Audio("assets/sound/26 - New Donk City Band Performance  (Super Mario Bros. Theme Remix).mp3");
var winMusic = new Audio("assets/sound/01. Super Mario Bros. Victory Theme.mp3");


var player = {
    name: "",
    hp: "",
    attack: "",
    defense: "",
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var enemy = {
    name: "",
    hp: "",
    attack: "",
    defense: "",
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var char_1 = {
    name: "mario",
    hp: 200,
    attack: 50,
    defense: 20,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
    choice: 1,
}

var char_2 = {
    name: "luigi",
    hp: 210,
    attack: 50,
    defense: 15,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
    choice: 2,
};

var char_3 = {
    name: "peach",
    hp: 220,
    attack: 40,
    defense: 25,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
    choice: 3,
};

var char_4 = {
    name: "bowser",
    hp: 230,
    attack: 60,
    defense: 10,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
    choice: 4,
};

var damage = "";

var playerChoice = false;
var enemyChoice = false;

var score = 0;

function attack(x, y) {

    damage = x.attack - y.defense

    if (damage < 0) {
        damage = 0
    }

    y.hp = y.hp - damage

    $("#player-hp").text(player.hp);
    $("#enemy-hp").text(enemy.hp);
    
    if (x.isBuff) {
        x.isBuff = false;
        x.attack = x.attack / 2
        $("#player-atk").text(player.attack);
        $("#enemy-atk").text(enemy.attack);

    }
    
};

function block(x) {
    x.isBlock = true
    x.defense = x.defense * 2.5
};

function atkbuff(x) {
    if (x.isBuff) {
        x.alreadyBuff = true
    }

    else {
        x.isBuff = true
        x.attack = x.attack * 2
        x.alreadyBuff = true
    }
};

function enemyTurn(event) {
    
    var enemyActions = ["attack", "atkbuff", "block"];

    function chooseEnemyAct() {
        enemyAct = enemyActions[Math.floor(Math.random() * enemyActions.length)];
    }

    chooseEnemyAct()    
    console.log(enemyAct)


    if (enemyAct === "attack") {
        attack(enemy, player);
        $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " counter-attacked for " + damage + " damage!")
        $("#player-hp").text(" " + player.hp)
    }

    if (enemyAct === "atkbuff") {
        atkbuff(enemy);
        $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " powered up their next attack!")
        $("#enemy-atk").text(" " + enemy.attack)
    }

    if (enemyAct === "block") {
        block(enemy);
        $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " blocked some damage from your attack!")
    }
}

function checkDeath(charname){
    if (player.name === charname) {
        $("#player_sprite").html("<img src='assets/images/" + charname + "dead.gif'>");
    }
    if (enemy.name === charname) {
        $("#enemy_sprite").html("<img src='assets/images/" + charname + "dead.gif'>");
    }
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
        $("#player-hp").html("<i class='fas fa-skull'></i>")
        $("#instructions").text("GAME OVER!")

        checkDeath(player.name)
    }

    if (enemy.hp <= 0) {
        $("#enemyactiontext").text("Enemy was defeated! You leveled up!")
        player.attack = player.attack + 10;
        $("#player-atk").text(" " + player.attack);
        player.defense = player.defense + 10;
        $("#player-def").text(" " + player.defense);
        enemy.isLive = false;
        $("#buttonspace").toggle()
        $("#instructions").text("Select your opponent!")
        $("#enemy-hp").html("<i class='fas fa-skull'></i>")
        score++

        checkDeath(enemy.name)
    }


    if (score >= 3) {
        $("#instructions").text("You win!")
        playMusic.pause();
        winMusic.play();

    }
    
};


$("#player-hp").text(" " + player.hp);
$("#player-atk").text(" " + player.attack);
$("#player-def").text(" " + player.defense);

$("#enemy-hp").text(" " + enemy.hp);
$("#enemy-atk").text(" " + enemy.attack);
$("#enemy-def").text(" " + enemy.defense);

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
        $("#player-atk").text(" " + player.attack);
        enemyTurn();
        turnEnd(player, enemy)
    }

    else {
        atkbuff(player)
        $("#actiontext").text("You strengthened your attack for next turn!")
        $("#player-atk").text(" " + player.attack);
        enemyTurn();
        turnEnd(player, enemy)
    }
});

$("#btn-blk").click(function(){
    block(player)
    $("#actiontext").text("You blocked some incoming damage!")
    enemyTurn();
    turnEnd(player, enemy)
});


$("#choice1").click(function(){
    selectCharacter(char_1.name, char_1)
})

$("#choice2").click(function(){
    selectCharacter(char_2.name, char_2)
})

$("#choice3").click(function(){
    selectCharacter(char_3.name, char_3)

})

$("#choice4").click(function(){
    selectCharacter(char_4.name, char_4)
})

function selectCharacter(charname, charnum) {
    if (playerChoice != true) {
        for(var k in charnum) (player[k] = charnum[k])
        $("#playericon").attr("src", "assets/images/" + charname + ".png");
        $("#playericon").css('visibility', 'visible');
        $("#player-hp").text(" " + player.hp);
        $("#player-atk").text(" " + player.attack);
        $("#player-def").text(" " + player.defense);
        $("#playername").text(player.name.charAt(0).toUpperCase()  + player.name.slice(1));
        $("#player_sprite").append("<img src=assets/images/" + charname + "idle.gif>")
        playerChoice = true;
        $("#choice" + charnum.choice).toggle()
        $("#instructions").text("Select your opponent!")
        playMusic.play();

    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in charnum) (enemy[k] = charnum[k])
        $("#enemyicon").attr("src", "assets/images/" + charname + ".png");
        $("#enemyicon").css('visibility', 'visible');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1));
        $("#enemy_sprite").html("<img src=assets/images/" + charname + "idle.gif>")
        $("#enemy_sprite").css('transform', 'scaleX(-1)');
        enemyChoice = true;
        $("#choice" + charnum.choice).toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()


    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in charnum) (enemy[k] = charnum[k])
        $("#enemyicon").attr("src", "assets/images/" + charname + ".png");
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        $("#enemyname").html(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1));
        $("#enemy_sprite").html("<img src=assets/images/" + charname + "idle.gif>")
        $("#choice" + charnum.choice).toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else {

    }
}

