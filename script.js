let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {

    let random = Math.floor(Math.random() * 3) + 1;

    switch (random) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
        default:
            return "Invalid choice";
    }
}

function getRoundResult(playerSelection, computerSelection) {

    if (playerSelection.toLowerCase() !== "rock" && playerSelection.toLowerCase() !== "paper" &&
        playerSelection.toLowerCase() !== "scissors") {

        alert("Invalid input! Try again");
        return "Invalid Input";

    } else if (playerSelection.toLowerCase() === "rock" && computerSelection === "scissors" ||
        playerSelection.toLowerCase() === "paper" && computerSelection === "rock" ||
        playerSelection.toLowerCase() === "scissors" && computerSelection === "paper") {

        alert(`You Won! ${playerSelection.charAt(0).toUpperCase() + playerSelection.toLowerCase().slice(1)} 
        beats ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`);

        playerScore++;
        return;

    } else if (playerSelection.toLowerCase() === computerSelection) {
        alert(`Draw! ${playerSelection.charAt(0).toUpperCase() + playerSelection.toLowerCase().slice(1)}
        ties with ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)}`);
        return;

    } else {
        alert(`You Lost! ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)} 
        beats ${playerSelection.charAt(0).toUpperCase() + playerSelection.toLowerCase().slice(1)}`);

        computerScore++;
        return;
    }
}

function getFinalScore() {
    alert(`Your Score: ${playerScore} points\nComputer Score: ${computerScore} points`);
}

function game() {

    alert("This is a Rock Paper Scissors Game\nBest Of Five Rounds Win!\n\nEnter 0 to finish the game");

    while (true) {

        for (let i = 0; i < 5; i++) {

            let playerInput = prompt("Enter your choice: ");

            if (playerInput === "0") {
                break;

            } else {
                let gameResults = getRoundResult(playerInput, getComputerChoice());

                if (gameResults === "Invalid Input") {
                    if (i > 0) {
                        i--;
                    }
                    continue;
                }
            }
        }

        alert("Game Over");

        getFinalScore();

        let newGame = window.confirm("One more game?");
        if (!newGame) {
            break;
        }

        playerScore = 0;
        computerScore = 0;
    }
}

// Game start-point
game();