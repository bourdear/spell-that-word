import {words} from './wordArray.js';

let i;
const getNumber = () => {
     i = Math.floor(Math.random() * 107344) + 1;
    document.getElementById('result').innerHTML = words[i];
}

const begin = document.getElementById('begin');
begin.addEventListener('click', getNumber)

let point = 0;
let high = 0;

let newHS = localStorage.getItem('highScore');
if (newHS > high) {
    high = newHS;
}

let scoreBoard = document.getElementById('score');
scoreBoard.innerHTML = `Score: ${point}`

let highScore = document.getElementById('highScore');
highScore.innerHTML = `High Score: ${high}`

const instructions = document.getElementById('instructions');
instructions.innerHTML = `Correctly spell as many words as you can within 30 seconds! See if you can beat the high score of ${high}!`;

const scored = () => {
    scoreBoard.innerHTML = `Score: ${point}`
    }

const reference = () => {
let input =  document.getElementById('input').value
if (input === words[i] ) {
    point++;
    scored();
    getNumber();
    document.getElementById('input').value = '';

} 
}


const reset = () => {
    if (point > high) {
        high = point;
        point = 0;
        scoreBoard.innerHTML = `Score: ${point}`
        highScore.innerHTML = `High Score: ${high}`
        localStorage.setItem('highScore', high)
        location.reload();
    } else {
        point = 0;
        scoreBoard.innerHTML = `Score: ${point}`
        highScore.innerHTML = `High Score: ${high}`
        location.reload();
    }
}

const theEnd = () => {
    var time = document.getElementById('timer');
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


const timer = () => {
    setTimeout(theEnd, 31000)
    getFocus();
}

const getFocus = () => {
    document.getElementById('input').focus()
}

let text = document.getElementById('input');
text.addEventListener('keydown', reference )


const startTimer = (duration, display) => {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('timer').innerHTML = 'Time: ' + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

const times = function () {
    var thirty = 30,
        display = document.querySelector('#timer');
    startTimer(thirty, display);
};


const change = () => {
    document.getElementById('game').style.height = "560px";
}

const hide = () => {
    begin.style.display = "none";
}

const show = () => {
    let input = document.getElementById('input');
    input.style.display = 'initial';
    scoreBoard.style.display = 'inherit';
    highScore.style.display = 'inherit';
    instructions.style.display = 'none';
}


begin.addEventListener('click', times);
begin.addEventListener('click', change)
begin.addEventListener('click', hide);
begin.addEventListener('click', show)
begin.addEventListener('click', timer);
