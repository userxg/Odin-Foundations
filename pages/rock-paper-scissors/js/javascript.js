
let humanScore = 0;
let computerScore = 0;

while (true) {
    playGame();
}


function playGame() {
    for (let i = 0; i < 5; ++i){
        console.log(playRound(getHumanChoice(), getComputerChoice()));
    }
    if (humanScore > computerScore) {
            console.log('You won the game!!');
    }else if(humanScore < computerScore) {
            console.log("You've lost this game!!");
    } else {
            console.log("Draw!!");
    }

    humanScore = computerScore = 0;
    return;
}





function playRound(humanChoice, computerChoice) {
    if (humanChoice === undefined || humanChoice != 'rock' && humanChoice != 'paper'
        && humanChoice != 'scissors') {
        return 'wrong choice';
    } else {
        if (humanChoice === computerChoice) {
            return `Draw! :-|`;
        }else if (humanChoice === 'rock' && computerChoice === 'paper'
            || humanChoice === 'scissors' && computerChoice === 'rock'
            || humanChoice === 'paper' && computerChoice === 'scissors') {
            ++computerScore;
            --humanScore;
            return `You lose! ${computerChoice} beats ${humanChoice} ;-)`;
        } else {
            --computerScore;
            ++humanScore;
            return `You win! ${humanChoice} beats ${computerChoice} :-)`;
        }
    }
}
function getHumanChoice() {
    let choice = (prompt('Choose 1-rock, 2-paper, 3-scissors', '')).toLowerCase();
    return choice;
}
function getComputerChoice() {
    let choiceCode = Math.floor(Math.random() * 10) % 3 + 1;
    switch (choiceCode) {
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
    }
}