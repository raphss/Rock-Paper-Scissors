const rockBtn = document.querySelector('.rock');
const paperBtn = document.querySelector('.paper');
const scissorsBtn = document.querySelector('.scissors');

const playerSquare = document.querySelector('.results .player');
const computerSquare = document.querySelector('.results .computer');
const playerSquareOriginalState = playerSquare.innerHTML;
const computerSquareOriginalState = computerSquare.innerHTML;

const roundResultText = document.querySelector('.chooseText');
const roundChoices = document.querySelector('.rulesText');
const roundResultTextOriginalState = roundResultText.innerHTML;
const roundChoicesOriginalState = roundChoices.innerHTML;

const scoreText = document.querySelector('.points');
const scoreTextOriginalState = scoreText.innerHTML;

rockBtn.addEventListener('click', function () {
    getRoundResult("rock", getComputerChoice());
});

paperBtn.addEventListener('click', function () {
    getRoundResult("paper", getComputerChoice());
});

scissorsBtn.addEventListener('click', function () {
    getRoundResult("scissors", getComputerChoice());
});

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-title');
const newGame = document.querySelector('.modal button');

const playerText = document.querySelector('.player');
const computerText = document.querySelector('.computer');

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
    }
}

function updateResults(playerSelection, computerSelection, roundWinner) {

    playerSquare.innerHTML = `<img src="./images/${playerSelection}.png" alt="${playerSelection}" style="width: 100%; height: 100%;">`;
    computerSquare.innerHTML = `<img src="./images/${computerSelection}.png" alt="${computerSelection}" style="width: 100%; height: 100%;">`;
    scoreText.innerHTML = `<p class="points">Player: ${playerScore} points<br>Computer: ${computerScore} points</p>`

    if (roundWinner === "playerWin") {
        roundResultText.innerHTML = '<p style="margin-top: 40px;">You Won!<br></p>';
        roundChoices.innerHTML = `<p style="margin-top: 30px;">${playerSelection} beats ${computerSelection}</p>`;

    } else if (roundWinner === "computerWin") {
        roundResultText.innerHTML = '<p style="margin-top: 40px;">You Lost!<br></p>';
        roundChoices.innerHTML = `<p style="margin-top: 30px;">${computerSelection} beats ${playerSelection}</p>`;

    } else if (roundWinner === "tie") {
        roundResultText.innerHTML = '<p style="margin-top: 40px;">It\'s a tie!<br></p>';
        roundChoices.innerHTML = `<p style="margin-top: 30px;">${playerSelection} ties with ${computerSelection}</p>`;
    }
}

function getRoundResult(playerSelection, computerSelection) {

    if (playerScore < 5 && computerScore < 5) {


        if (
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "scissors" && computerSelection === "paper")
        ) {
            playerScore++;
            updateResults(playerSelection, computerSelection, "playerWin");

        } else if (playerSelection === computerSelection) {
            updateResults(playerSelection, computerSelection, "tie");

        } else {
            computerScore++;
            updateResults(playerSelection, computerSelection, "computerWin");
        }
    }

    if (playerScore > 4 || computerScore > 4) {

        modal.showModal();

        if (playerScore > computerScore) {
            modalTitle.textContent = 'You Won!';
        } else {
            modalTitle.textContent = 'You Lost...';
        }

        reset();

    }
}


function reset() {
    newGame.onclick = function () {

        roundResultText.innerHTML = roundResultTextOriginalState;
        roundChoices.innerHTML = roundChoicesOriginalState;

        playerScore = 0;
        computerScore = 0;

        scoreText.innerHTML = scoreTextOriginalState;

        playerSquare.innerHTML = playerSquareOriginalState;
        computerSquare.innerHTML = computerSquareOriginalState;

        modal.classList.add('off');

        modal.addEventListener('animationend', function () {
            modal.classList.remove('off');
            modal.close();
        }, {
            once: true
        });
    }
}