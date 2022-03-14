// Game States
// "WIN" - player has defeated all enemy robots
//      *fight all enemy robots
//      *defeat each enemy robot
// "LOSE" - player robot's health is zero or less
//      *player robot's health is zero or less


var fight = function(enemy) {

    while(enemy.health > 0 && playerInfo.health > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            window.alert(playerInfo.name + " has chosen to skip the fight!")
            var confirmSkip = window.confirm("Are you sure you'd like to quit?")
            //confirms skip and subracts 2 from playerInfo.money
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!")
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("Player Money" , playerInfo.money);
                break;
            }
        }

        //  if player choses to fight, then fight
        if(promptFight === "fight" || promptFight === "FIGHT") {


            //generate random number damage value based on player's attack power

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.

            console.log(
                playerInfo.name + " attacked " + enemy.name + ".  " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // check the enemy's health

            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died.")
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.")
            }

            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable

            playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);


            // Log a resulting message to the console so we know that it worked.

            console.log(
                enemy.name + " attacked " + playerInfo.name + ".  " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //checks player's health

            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died.")
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
            }
        }

        // alert to let player know they entered an incorrect entry
        else {
            window.alert("You need to choose a valid option. Try again!")
        }
    }
}

var startGame = function() {

    //reset player stats
    playerInfo.reset();


    for(var i = 0; i < enemyInfo.length; i++) {
        if(playerInfo.health > 0) {
            //lets player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            //pickes new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
            //resets enemyHealth each game
            pickedEnemyObj.health = randomNumber(40, 60);
            //passes the pickedEnemy
            fight(pickedEnemyObj);
            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // after the for loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
}

var endGame = function() {
    //if player is still alive, player wins!
    if(playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.")
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        //if playAgainConfirm evaluates as TRUE, then restart the game
        startGame();
    }

    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
}

// Shop functionality

var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice. ")
    //switch function decides what to do based on user input
    switch(shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;        
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.")

            //do nothing, so function will end
            break;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name);
    return name;
}



var playerInfo = {
    name: getPlayerName(),
    health: 50,
    attack: 10,
    money: 100,
    reset: function() {
        this.health = 50;
        this.money = 100;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }    
    }
}


var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];


//start the game when the page loads

startGame();





