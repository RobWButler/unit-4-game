var playMusic = new Audio("assets/sound/26 - New Donk City Band Performance  (Super Mario Bros. Theme Remix).mp3");
var winMusic = new Audio("assets/sound/01. Super Mario Bros. Victory Theme.mp3");
var gameoverMusic = new Audio("assets/sound/2-27 - Miss.mp3")

var musicOn = false;

var Character = function (name, hp, attack, defense, choice){
    this.name = name;
    this.hp = hp;
    this.atk = attack;
    this.defense = defense;
    this.choice = choice;
    this.isBlock = false;
    this.isBuff= false;
    this.isLive = true;

    this.attack = function(y) {
        damage = this.atk - y.defense

    if (damage < 0) {
        damage = 0;
    }

    y.hp -= damage;

    $("#player-hp").text(player.hp);
    $("#enemy-hp").text(enemy.hp);
    
        if (this.isBuff) {
            this.isBuff = false;
            this.atk /= 2.5;
            $("#player-atk").text(this.atk);
            $("#enemy-atk").text(y.atk);

        };
    };
    
    this.block = function () {
        this.isBlock = true;
        this.defense *= 2.5;
    };
    
    this.atkbuff = function() {
        if (!this.isBuff) {
            this.isBuff = true;
            this.atk *= 2.5;
        }

    };

    this.turnEnd = function(y) {
        if (this.isBlock) {
            this.defense /= 2.5;

        }
    
        if (y.isBlock) {
            y.defense /= 2.5;
            console.log(y.defense)
        }
    
        this.isBlock = false
        y.isBlock = false
    
        $("#player-def").text(player.defense);
    
        if (player.hp <= 0) {
            $("#actiontext").text("You lose!")
            player.isLive = false;
            $("#buttonspace").toggle()
            $("#player-hp").html("<i class='fas fa-skull'></i>")
            $("#instructions").text("GAME OVER!")
            playMusic.pause();
            gameoverMusic.play();
            $("#player_sprite").html("<img src='assets/images/" + this.name + "dead.gif'>");
        }
    
        if (enemy.hp <= 0) {
            $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " was defeated! You leveled up!")
            player.atk = player.atk + 10;
            $("#player-atk").text(" " + player.atk);
            player.defense = player.defense + 10;
            $("#player-def").text(" " + player.defense);
            enemy.isLive = false;
            $("#buttonspace").toggle()
            $("#instructions").text("Select your opponent!")
            $("#enemy-hp").html("<i class='fas fa-skull'></i>")
            score++
            $("#enemy_sprite").html("<img src='assets/images/" + enemy.name+ "dead.gif'>");
        }
    
        if (score >= 3) {
            $("#instructions").text("You win!")
            playMusic.pause();
            winMusic.play();
        }
    };
}

var mario = new Character("Mario", 200, 50, 20, 1);
var luigi = new Character("Luigi", 210, 50, 15, 2);
var peach = new Character("Peach", 220, 40, 25, 3);
var bowser = new Character("Bowser", 230, 60, 10, 4);
var player = new Character("", "", "", "");
var enemy = new Character("", "", "", "");

var damage = "";

var playerChoice = false;
var enemyChoice = false;

var score = 0;

function enemyTurn() {
    
    var enemyActions = ["attack", "atkbuff", "block"];

    function chooseEnemyAct() {
        if (!enemy.isBuff){
            enemyAct = enemyActions[Math.floor(Math.random() * enemyActions.length)];
        } else { 
            enemyAct = "attack"
        }
    }

    chooseEnemyAct()    
    console.log("enemy action: " + enemyAct)

    if (enemyAct === "attack") {
        enemy.attack(player);
        $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " counter-attacked for " + damage + " damage!")
        $("#player-hp").text(" " + player.hp)
    }

    if (enemyAct === "atkbuff") {
        enemy.atkbuff();
        $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " is powering up to attack next turn!")
        $("#enemy-atk").text(" " + enemy.atk)
    }

    if (enemyAct === "block") {
        enemy.block();
        $("#enemyactiontext").text(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " blocked some damage from your attack!")
    }
}

$("#btn-atk").click(function(){
    enemyTurn()
    player.attack(enemy)
    $("#actiontext").text("You attacked " + enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1) + " for " + damage + " damage!")
    player.alreadyBuff = false;
    player.turnEnd(enemy)
    
});

$("#btn-buff").click(function(){

    if (player.isBuff) {
        $("#actiontext").text("Can't power up twice in a row!")
        $("#player-atk").text(" " + player.atk);
        enemyTurn();
        player.turnEnd(enemy)
    }

    else {
        player.atkbuff()
        $("#actiontext").text("You strengthened your attack for next turn!")
        $("#player-atk").text(" " + player.atk);
        enemyTurn();
        player.turnEnd(enemy)
    }
});

$("#btn-blk").click(function(){
    player.block()
    $("#actiontext").text("You blocked some incoming damage!")
    enemyTurn();
    player.turnEnd(enemy)
});


$("#choice1").click(function(){
    selectCharacter(mario.name, mario)
})

$("#choice2").click(function(){
    selectCharacter(luigi.name, luigi)
})

$("#choice3").click(function(){
    selectCharacter(peach.name, peach)

})

$("#choice4").click(function(){
    selectCharacter(bowser.name, bowser)
})

function selectCharacter(charname, charnum) {
    if (!playerChoice) {
        for(var k in charnum) (player[k] = charnum[k])
        $("#playericon").attr("src", "assets/images/" + charname + ".png");
        $("#playericon").css('visibility', 'visible');
        $("#player-hp").text(" " + player.hp);
        $("#player-atk").text(" " + player.atk);
        $("#player-def").text(" " + player.defense);
        $("#playername").text(player.name.charAt(0).toUpperCase()  + player.name.slice(1));
        $("#player_sprite").append("<img src=assets/images/" + charname + "idle.gif>")
        playerChoice = true;
        $("#choice" + charnum.choice).toggle()
        $("#instructions").text("Select your opponent!")
        playMusic.play();
        musicOn = true;
        $("#musictoggle").css("cursor", "pointer")

    }
    
    else if (!enemyChoice && enemy.isLive) {
        for(var k in charnum) (enemy[k] = charnum[k])
        $("#enemyicon").attr("src", "assets/images/" + charname + ".png");
        $("#enemyicon").css('visibility', 'visible');
        $("#enemy-hp").text(" " + enemy.hp);
        $("#enemy-atk").text(" " + enemy.atk);
        $("#enemy-def").text(" " + enemy.defense);
        $("#enemyname").html(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1));
        $("#enemy_sprite").html("<img src=assets/images/" + charname + "idle.gif>")
        $("#enemy_sprite").css('transform', 'scaleX(-1)');
        enemyChoice = true;
        $("#choice" + charnum.choice).toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }

    else if (enemyChoice && !enemy.isLive) {
        for(var k in charnum) (enemy[k] = charnum[k])
        $("#enemyicon").attr("src", "assets/images/" + charname + ".png");
        $("#enemy-hp").text(enemy.hp);
        $("#enemy-atk").text(enemy.atk);
        $("#enemy-def").text(enemy.defense);
        $("#enemyname").html(enemy.name.charAt(0).toUpperCase()  + enemy.name.slice(1));
        $("#enemy_sprite").html("<img src=assets/images/" + charname + "idle.gif>")
        $("#choice" + charnum.choice).toggle()
        $("#instructions").text("Battle!")
        $("#buttonspace").toggle()

    }
}

$("#musictoggle").click(function(){
    if (musicOn === true) {
        playMusic.pause()
        musicOn = false;
        $("#musictoggle").html("<i class='fas fa-volume-off'></i> Turn BGM On")

    }
    else {
        playMusic.play()
        musicOn = true;
        $("#musictoggle").html("<i class='fas fa-volume-up'></i> Turn BGM Off")
    }
})