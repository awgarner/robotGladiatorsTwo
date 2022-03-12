

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 50,
    attack: 10,
    money: 100,
}

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// Game States
// "WIN" - player has defeated all enemy robots
//      *fight all enemy robots
//      *defeat each enemy robot
// "LOSE" - player robot's health is zero or less
//      *player robot's health is zero or less


var fight = function(enemyName) {
    while(enemyHealth > 0 && playerInfo.health > 0) {
        debugger

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

            enemyHealth = Math.max(0, enemyHealth - damage);

            // Log a resulting message to the console so we know that it worked.

            console.log(
                playerInfo.name + " attacked " + enemyName + ".  " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check the enemy's health

            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died.")
                break;
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.")
            }

            // Subtract the value of `enemyAttack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable

            playerInfo.health = Math.max(0, playerInfo.health - enemyAttack);


            // Log a resulting message to the console so we know that it worked.

            console.log(
                enemyName + " attacked " + playerInfo.name + ".  " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
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
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 100;

    for(var i = 0; i < enemyNames.length; i++) {
        if(playerInfo.health > 0) {
            //lets player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            //pickes new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
            //resets enemyHealth each game
            enemyHealth = randomNumber(40, 60);
            //passes the pickedEnemy
            fight(pickedEnemyName);
            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyNames.length - 1) {
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
            if (playerInfo.money >= 7) {   
                window.alert("Refilling player's health by 20 for 7 dollars");

                //increase health and decrease money
                playerInfo.health = playerInfo.health + 20;
                playerInfo.money = playerInfo.money - 7;
            }
            else {
                window.alert("You don't have enough money!")
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerInfo.money >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.")

                //increase attack and decrease money
                playerInfo.attack = playerInfo.attack + 6;
                playerInfo.money = playerInfo.money - 7;
            }
            else {
                window.alert("You don't have enough money!")
            }
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


//start the game when the page loads

startGame();





