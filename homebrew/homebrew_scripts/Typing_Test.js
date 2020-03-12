/*This script uses the dictionary API for generating 
words to test speed */

/*Public variables*/
let quit = document.querySelector('#quit');
let begin = document.querySelector('#begin');
let input = document.querySelector('#type_here');
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let paragraph = document.querySelector('#paragraph');
let typed_words = document.querySelector("#typed_words");
let stats = new Statistics();
let time = 0;
let wpm = 0;
let accuracy = 0;
let timer;
let gameStart = false;
/*Strings of data for the paragraphs the user types*/
let strings = {
    1: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    2: 'abcdefghijklmnopqrstuvwxyz'
};



/*The API that is being used has an access capacity of 
1000 times a day, meaning that you cannot type more than 
1000 generated words from this application.*/

/*Calls the dictionary with the word searched,
Currently not in use*/
function getAPI() {
    fetch("https://dictionaryapi.com/api/v3/references/collegiate/json/?key=83c2c7cd-5344-4c38-a00a-54507558c26d")
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => alert("Cannot load words from dictionary. Try checking your connection"));
}

/*Uses the getAPI() function to generate a new synonymous word*/
function callWord() {
    getAPI()
}

/*Event listener for when user types in answer box*/
input.addEventListener('keydown', readChar);

/*When the Begin button is clicked, it calls the function
that starts the game*/
begin.addEventListener('click', (click) => {
    startTest();
});

/*Event listener for when the quit button is clicked*/
quit.addEventListener('click', (click) => {
    endTest();
});



function setCorrect(char, test) {
    typed_words.classList.remove('incorrect_word');
    typed_words.classList.add('correct_word');
    paragraph.textContent = test
        .substring(typed_words.textContent.lastIndexOf(char) + 1);
}

function setIncorrect(char, test) {
    typed_words.classList.remove('correct_word');
    typed_words.classList.add('incorrect_word');
    paragraph.textContent = test
        .substring(typed_words.textContent.lastIndexOf(char) + 1);
}

function setBackSpace(test) {
    let delInput = input.value.substring(0, input.value.length - 1);
    typed_words.textContent = delInput;
    paragraph.textContent = test.substring(delInput.length);
    if (typed_words.textContent === test.substring(0, delInput.length)) {
        typed_words.classList.remove('incorrect_word');
        typed_words.classList.add('correct_word');
    }
}

/*Adds each char to the typed_words span in the Typing_Test.html,
compares the current string value from the input with the substring from the paragraph.
Calls the correct_word and incorrect_word CSS classes to tell the user if the typed char
is correct or incorrect, updates the statistics for every character typed*/
function readChar(char) {
    let myTest = strings[2];
    if (gameStart) {
        if (char.key.length > 1 && char.key !== 'Backspace') {
            return
        }
        if (char.keyCode === 8) {
            setBackSpace(myTest);
        } else if (myTest === input.value + char.key) {
            clearInterval(timer);
            gameStart = false;
            typed_words.textContent += char.key;
            paragraph.textContent = '';
        } else {
            typed_words.textContent = input.value + char.key;
            if (typed_words.textContent === myTest.substring(0, typed_words.textContent.length)) {
                setCorrect(char.key, myTest);
            } else {
                setIncorrect(char.key, myTest);
                stats.updateMissed();
            }
        }
    }
}

/*object will keep track of all the statistics*/
function Statistics() {
	this.cpm = document.querySelector('#cpm');
	this.accuracy = document.querySelector('#accuracy');
	this.missed = document.querySelector('#errors');
	this.cpm_stat = 0;
	this.accuracy_stat = 100;
	this.missed_stat = 0;
	this.clock;
	this.updateCPM = () => {
		this.cpm.textContent = cpm_stat
	}
	/*Updatest the accuracy of the typer*/
	this.updateAccuracy = () => {

	}
	/*updatest the amount of misses*/
	this.updateMissed = () => {
		this.missed.textContent = ++this.missed_stat;
	}
	/*resets the statistics*/
	this.reset = () => {
		this.accuracy_stat = 100;
		this.missed_stat = 0;
		this.cpm_stat = 0;
		this.cpm.textContent = this.cpm_stat;
		this.missed.textContent = this.missed_stat;
		this.accuracy.textContent = this.accuracy_stat;
	}
}


/*Starts the time for the test, counts seconds*/
function startClock() {
    let second = 0;
    timer = setInterval(() => {
    	second++;
        if (second < 10) {
            seconds.textContent = '0' + second;
        } else {
        	seconds.textContent = second;
        }
        if (second === 60) {
            second = 0;
            seconds.textContent = '0'
            minutes.textContent = ++time;
        }
    }, 1000);
}

/*This function will begin the test, starts the clock
and displays the paragraph for the user to type*/
function startTest() {
    if (gameStart === false) {
        gameStart = true;
        startClock();
        typed_words.textContent = '';
        paragraph.textContent = strings[2];
        input.value = '';
        input.placeholder = '';
        input.select();

    }
}

/*Clears the stats and the clock, allowing the user to start a new 
game*/
function endTest() {
    clearInterval(timer);
    seconds.textContent = '00';
    minutes.textContent = '0';
    paragraph.textContent = 'Text will appear here';
    typed_words.textContent = '';
    input.value = "";
    input.placeholder = 'Click Start to begin';
    gameStart = false;
}