import {words} from './wordArray.js';

const beginButton = document.getElementById('beginButton');
let index;
let point = 0;
let high = 0;
let scoreBoard = document.getElementById('score');

//Returns a random number that displays a word from the array index.
const getNumber = () => {
    index = Math.floor(Math.random() * 107344) + 1;
    document.getElementById('result').innerHTML = words[index];
}

//Pulls old high score from memory.
let newHS = localStorage.getItem('highScore');
if (newHS > high) {
    high = newHS;
}

let highScore = document.getElementById('highScore');
highScore.innerHTML = `High Score: ${high}`;


const instructions = document.getElementById('instructions');
instructions.innerHTML = `
    Correctly spell as many words as you can within 30 seconds! 
    Press ENTER to move on to the next word. 
    See if you can beat the high score of ${high}!`;

const scored = () => {
    scoreBoard.innerHTML = `Score: ${point}`;
}

//Clears text from input box.
const clearInput = () => {
    document.getElementById('input').value = '';
}

//Compares spelling of typed word to array word.
const reference = () => {
    let input =  document.getElementById('input').value;
    if (input === words[index]) {
        point++;
        scored();
        getNumber();
        clearInput();
    } 
}

let text = document.getElementById('input');
text.addEventListener('keydown', reference);

//Compares final score to high score. Replaces high score if current score is larger. 
const reset = () => {
    if (point > high) {
        high = point;
        point = 0;
        scoreBoard.innerHTML = `Score: ${point}`;
        highScore.innerHTML = `High Score: ${high}`;
        localStorage.setItem('highScore', high);
        location.reload();
        clearInput();
    } else {
        point = 0;
        scoreBoard.innerHTML = `Score: ${point}`;
        highScore.innerHTML = `High Score: ${high}`;
        location.reload();
        clearInput();
    }
}

//Pop-up message displays the player's score.
const theEnd = () => {
    let time = document.getElementById('timer');
    if (point > high) {
        time.style.display = 'none';
        swal('Game Over', `You beat the high score! The new high score is ${point}!`).then(reset);
    } else if (point === 0) {
        time.style.display = 'none';
        swal('Game Over', 'Zero points? Better luck next time!').then(reset);
    } else {
        time.style.display = 'none';
    swal('Game Over',` You got a score of ${point}. Well done!`).then(reset);
    }
}

//Timer that triggers the end message.
const timer = () => {
    setTimeout(theEnd, 30000);
    getFocus();
}

//Brings the cursor focus to the text input.
const getFocus = () => {
    document.getElementById('input').focus();
}

//Calclulates the number of seconds remaining.
const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('timer').innerHTML = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//Starts countdown timer.
const times = () => {
    let twentyNine = 29,
        display = document.querySelector('#timer');
    startTimer(twentyNine, display);
};

//Hides instructions and button.
const hide = () => {
    beginButton.style.display = "none";
    instructions.style.display = 'none';
}

//Displays input and scoreboards.
const show = () => {
    let input = document.getElementById('input');
    let timerTitle = document.getElementById('timerTitle');
    input.style.display = 'initial';
    timerTitle.style.display = 'initial';
    scoreBoard.style.display = 'inherit';
    highScore.style.display = 'inherit';
    scored();
}

beginButton.addEventListener('click', getNumber);
beginButton.addEventListener('click', times);
beginButton.addEventListener('click', hide);
beginButton.addEventListener('click', show);
beginButton.addEventListener('click', timer);
