
let humanScore = 0;
let computerScore = 0;
const MAX_ROUNDS = 5;
let currentRound = 0;
let isRound = 0;
const usersFist = document.querySelector('.users-fist');
const aisFist = document.querySelector('.ais-fist');
const winMessage = document.querySelector('.win-message');
winMessage.innerText = 'Play round with AI';

document.addEventListener('click', e => {
    console.log(e.target.id);
    const btnChoice = e.target.id;

    switch (btnChoice) {
        case 'rock':
            if (isRound) {
                playRound(btnChoice);
            }
            break;
        
        case 'paper':
            if (isRound) {
                playRound(btnChoice);
            }
            break;
        
        case 'scissors':
            if (isRound) {
                playRound(btnChoice);
            }
            break;
        
        case 'play-round':
            if (!isRound) {
                startRound();
            }
            break;
    } 
})

function startRound() {
    winMessage.innerText = 'wait for choice...'
    isRound = 1;
    usersFist.classList.toggle('fist-transform');
    usersFist.classList.toggle('shaking');
    aisFist.classList.toggle('fist-transform');
    aisFist.classList.toggle('shaking');
    usersFist.firstElementChild.src = `./img/fist.png`;
    aisFist.firstElementChild.src = `./img/fist.png`;
}

function playRound(btnChoice) {
    isRound = 0;
    usersFist.classList.toggle('fist-transform');
    usersFist.classList.toggle('shaking');
    aisFist.classList.toggle('fist-transform');
    aisFist.classList.toggle('shaking');
    let computerChoice = getComputerChoice();
    const result = makeChoice(btnChoice, computerChoice);
    usersFist.firstElementChild.src = `./img/${btnChoice}.png`;
    aisFist.firstElementChild.src = `./img/${computerChoice}.png`;
    console.log(aisFist.firstElementChild.src);
    
    const userScore = document.querySelector('.user-score');
        const aiScore = document.querySelector('.ai-score');
    if (currentRound === MAX_ROUNDS)
    {
        finishGame();
        
    } else {
        
        
        winMessage.innerText = result;
        ++currentRound;
    }

    userScore.innerText = humanScore;
    aiScore.innerText = computerScore;
    return;
}



function finishGame() {
    currentRound === 0;
    let result = '';
     if (humanScore > computerScore) {
         result = (`You won the game!!
                    score: ${humanScore} : ${computerScore}`);
    }else if(humanScore < computerScore) {
         result = (`You've lost the game!!
                    score: ${humanScore} : ${computerScore}`);
    } else {
            result = (`Draw!!
            score: ${humanScore} : ${computerScore}`);
    }
    humanScore = computerScore = 0;
    winMessage.innerText = result;
}





function makeChoice(humanChoice, computerChoice) {
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
            return `You lose!  ;-)`;
        } else {
            ++humanScore;
            return `You win! :-)`;
        }
    }
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
