
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// Game States
// "WIN" - player has defeated all enemy robots
//      *fight all enemy robots
//      *defeat each enemy robot
// "LOSE" - player robot's health is zero or less
//      *player robot's health is zero or less

window.alert("Welcome to Robot Gladiators!")

var fight = function(enemyName) {

    while(enemyHealth > 0 && playerHealth > 0) {
        

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            window.alert(playerName + " has chosen to skip the fight!")
            var confirmSkip = window.confirm("Are you sure you'd like to quit?")
            //confirms skip and subracts 2 from playerMoney
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!")
                playerMoney = playerMoney - 10;
                console.log("playerMoney" , playerMoney);
                break;
            }
        }

        //  if player choses to fight, then fight
        if(promptFight === "fight" || promptFight === "FIGHT") {


            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable

            enemyHealth = enemyHealth - playerAttack;

            // Log a resulting message to the console so we know that it worked.

            console.log(
                playerName + " attacked " + enemyName + ".  " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check the enemy's health

            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died.")
                break;
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.")
            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable

            playerHealth = playerHealth - enemyAttack;


            // Log a resulting message to the console so we know that it worked.

            console.log(
                enemyName + " attacked " + playerName + ".  " + playerName + " now has " + playerHealth + " health remaining."
            );

            //checks player's health

            if (playerHealth <= 0) {
                window.alert(playerName + " has died.")
                break;
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.")
            }
        }

        // alert to let player know they entered an incorrect entry
        else {
            window.alert("You need to choose a valid option. Try again!")
        }
    }
}


for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(enemyNames[i]);
}




