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
    name: "Mario",
    hp: 200,
    attack: 60,
    defense: 20,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
}

var char_2 = {
    name: "Luigi",
    hp: 200,
    attack: 50,
    defense: 10,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false
};

var char_3 = {
    name: "Peach",
    hp: 250,
    attack: 60,
    defense: 30,
    isBlock: false,
    isBuff: false,
    isLive: true,
    alreadyBuff: false,
};

var char_4 = {
    name: "Bowser",
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
        $("#enemy-atk").text(player.attack);

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

//Aborted attempt at calling random functions so enemy could use the same moves as player randomly each turn
function enemyTurn(event) {
    
    var enemyActions = ["attack", "atkbuff", "block"];

    function chooseEnemyAct() {
        enemyAct = enemyActions[Math.floor(Math.random() * enemyActions.length)];
    }

    chooseEnemyAct()    
    console.log(enemyAct)


    if (enemyAct === "attack") {
        attack(enemy, player);
        $("#enemyactiontext").text(enemy.name + " counter-attacked for " + damage + " damage!")
        $("player-hp").text(" " + player.hp)
    }

    if (enemyAct === "atkbuff") {
        atkbuff(enemy);
        $("#enemyactiontext").text(enemy.name + " powered up their next attack!")
        $("enemy-atk").text(" " + enemy.attack)
    }

    if (enemyAct === "block") {
        block(enemy);
        $("#enemyactiontext").text(enemy.name + " blocked some damage from your attack!")
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

        if (player.name = "Mario") {
            $("#player_sprite").html("<img src='assets/images/mariodead.gif'>");
        }

    }

    if (enemy.hp <= 0) {
        $("#enemyactiontext").text("Enemy was defeated!")
        enemy.isLive = false;
        $("#buttonspace").toggle()
        $("#instructions").text("Select your opponent!")
        $("#enemy-hp").html("<i class='fas fa-skull'></i>")
        score++

        if(enemy.name = "Mario") {
            $("#enemy_sprite").html("<img src='assets/images/mariodead.gif'>");
        }
    }

    if (score >= 3) {
        $("#instructions").text("You win!")

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
    if (playerChoice != true) {
        for(var k in char_1) (player[k] = char_1[k])
        $("#playericon").attr("src", "assets/images/mario.png");
        $("#playericon").css('visibility', 'visible');
        $("#player-hp").text(" " + player.hp);
        $("#player-atk").text(" " + player.attack);
        $("#player-def").text(" " + player.defense);
        $("#playername").html(player.name);
        $("#player_sprite").append("<img src=assets/images/marioidle.gif>")
        playerChoice = true;
        $("#choice1").toggle()
        $("#instructions").text("Select your opponent!")
    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_1) (enemy[k] = char_1[k])
        $("#enemyicon").attr("src", "assets/images/mario.png");
        $("#enemyicon").css('visibility', 'visible');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
        $("#enemy_sprite").append("<img src=assets/images/marioidle.gif>")
        $("#enemy_sprite").css('transform', 'scaleX(-1)');
        enemyChoice = true;
        $("#choice1").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()


    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_1) (enemy[k] = char_1[k])
        $("#enemyicon").attr("src", "assets/images/mario.png");
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
        $("#enemy_sprite").append("<img src=assets/images/marioidle.gif>")
        $("#enemy_sprite").css('transform', 'scaleX(-1)');
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
        $("#playericon").attr("src", "assets/images/luigi.png");
        $("#playericon").css('visibility', 'visible');
        $("#player-hp").text(" " + player.hp);
        $("#player-atk").text(" " + player.attack);
        $("#player-def").text(" " + player.defense);
        $("#playername").text(player.name);
        playerChoice = true;
        $("#choice2").toggle()
        $("#instructions").text("Select your opponent!")

    }

    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_2) (enemy[k] = char_2[k])
        $("#enemyicon").attr("src", "assets/images/luigi.png");
        $("#enemyicon").css('visibility', 'visible');
        $("#enemyicon").css('transform', 'scaleX(-1)');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
        enemyChoice = true;
        $("#choice2").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }
    
    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_2) (enemy[k] = char_2[k])
        $("#enemyicon").attr("src", "assets/images/luigi.png");
        $("#enemyicon").css('transform', 'scaleX(-1)');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
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
        $("#playericon").attr("src", "assets/images/peach.png");
        $("#playericon").css('visibility', 'visible');
        $("#playericon").css('transform', 'scaleX(-1)');
        $("#player-hp").text(" " + player.hp);
        $("#player-atk").text(" " + player.attack);
        $("#player-def").text(" " + player.defense);
        $("#playername").text(player.name);
        playerChoice = true;
        $("#choice3").toggle()
        $("#instructions").text("Select your opponent!")

    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_3) (enemy[k] = char_3[k])
        $("#enemyicon").attr("src", "assets/images/peach.png");
        $("#enemyicon").css('visibility', 'visible');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
        enemyChoice = true;
        $("#choice3").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_3) (enemy[k] = char_3[k])
        $("#enemyicon").attr("src", "assets/images/peach.png");
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
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
        $("#playericon").attr("src", "assets/images/bowser.png");
        $("#playericon").css('visibility', 'visible');
        $("#playericon").css('transform', 'scaleX(-1)');
        $("#player-hp").text(" " + player.hp);
        $("#player-atk").text(" " + player.attack);
        $("#player-def").text(" " + player.defense);
        $("#playername").text(player.name);
        playerChoice = true;
        $("#choice4").toggle()
        $("#instructions").text("Select your opponent!")

    }
    
    else if (enemyChoice !=true && enemy.isLive) {
        for(var k in char_4) (enemy[k] = char_4[k])
        $("#enemyicon").attr("src", "assets/images/bowser.png");
        $("#enemyicon").css('visibility', 'visible');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.attack);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name);
        enemyChoice = true;
        $("#choice4").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()


    }

    else if (enemyChoice && enemy.isLive != true) {
        for(var k in char_4) (enemy[k] = char_4[k])
        $("#enemyicon").attr("src", "assets/images/bowser.png");
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.attack);
        $("#enemy-def").text(enemy.defense);
        $("#enemyname").html(enemy.name);
        $("#choice4").toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else {

    }
})