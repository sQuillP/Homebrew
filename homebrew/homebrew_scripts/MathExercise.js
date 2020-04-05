//All the changing parts of the page
let startGame = document.querySelector("#begin");
let mathProblem = document.querySelector('#operation');
let input = document.querySelector('input');
let scoreText = document.querySelector('#score');
let message = document.querySelector('#message');
let timer = document.querySelector('#time');
let gamemode = document.querySelector('#switch');
let quit = document.querySelector('#quit');
let difficulty = document.querySelector("select");
let answer;
let score = 0;
let started = false;
let begin;
let modes = ['Addition', 'Subtraction', 'Multiplication', 'Division'];

let entries = {

    t: 0,

    incorrect_entry: () => {
        message.style.color = 'red';
        message.textContent = 'Incorrect'
        input.value = '';
        let interval = setInterval(() => {
            if (!entries.t) {
                message.textContent = '';
                clearInterval(interval);
            }
        }, 400);

    },

    correct_entry: () => {
        message.style.color = 'green';
        message.textContent = 'Correct!';
        let interval = setInterval(() => {
            if (!entries.t) {
                message.textContent = '';
                clearInterval(interval);
            }
        }, 400);
        score++;
        scoreText.textContent = score;
        mathProblem.textContent = equation(difficulty.value, modes[0]);
        input.value = '';
    }
};

//Starting the game
startGame.addEventListener('click', (e) => {
    initGame();
});

gamemode.addEventListener('click', (e) => {
    modes.push(modes.shift());
    document.querySelector('#gameOptions').textContent = modes[0];
});

//When the user is ready for the next problem
input.addEventListener('keypress', (e) => {
    if (e.which === 13) {
        checkAnswer(input.value);
    }
});

quit.addEventListener('click', (e) => {
    clearInterval(begin);
    scoreText.textContent = 0;
    mathProblem.textContent = "Click begin to start";
    timer.textContent = 0;
    started = false;
    score = 0;
});

//Checks if the answer is correct
//handles all events for progressing to the next problem
function checkAnswer(ans) {
    if (isNaN(Number(ans)) || Number(ans) !== answer) {
        entries.incorrect_entry();
        return;
    }
    entries.correct_entry();
    return;
}

function findMultiple(n) {
    let arr = [];
    for (var i = 1; i < n; i++) {
        n % i === 0 ? arr.push(i) : null;
    }
    return arr[Math.round(Math.random() * (arr.length - 1))];
}

//Begins the game, starts the clock
function initGame() {
    let time = 0;
    if (!started) {
        started = true;
        mathProblem.textContent = equation(difficulty.value, modes[0]);
        begin = setInterval(() => {
            time++;
            timer.textContent = time;
        }, 1000);
    }
}

//Creates the addition problem
//returns equation for the problem
function equation(diff, mode) {
    let op1, op2, scale;
    if (diff === 'Easy') {
        scale = 10
    } else if (diff === 'Medium') {
        scale = 50
    } else {
        scale = 100
    }
    op1 = Math.round(Math.random() * (scale - 1)) + 1;
    op2 = Math.round(Math.random() * (scale - 1)) + 1;
    if (mode === 'Addition') {
        answer = op1 + op2;
        return `${op1}+${op2} =`
    } else if (mode === 'Subtraction') {
        answer = Math.max(op1, op2) - Math.min(op1, op2);
        return `${Math.max(op1,op2)}-${Math.min(op1,op2)} =`;
    } else if (mode === 'Multiplication') {
        answer = op1 * op2;
        return `${op1}*${op2} =`;
    } else {
        op1 = Math.max(op1, op2);
        op2 = findMultiple(op1);
        answer = op1 / op2;
        return `${op1} / ${op2} =`;
    }
}