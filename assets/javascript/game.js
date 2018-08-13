
let wordBank =["eric", "kenny", "kyle", "stan", "token", "butters", "lorde", "wendy", "timmy", "towelie", "mackey", "tweak", "ike"];


const maxTries = 10;
let guessedLetters = [];
let currentWordIndex;
let guessingWord = [];
let remainingGuesses = 0;       // Lives
let hasFinished = false;        // Flag    
let wins = 0;                   // Set Wins to Zero
let losses = 0;                 // Set Losses to Zero

// This function is needed upon start of the game and upon either meeting a Game Win or Game Lose condition
function resetGame() {
remainingGuesses = maxTries;
document.getElementById("startMsg").innerText = "Press any letter to play.";
currentWordIndex = Math.floor(Math.random() * (wordBank.length));
guessedLetters = [];
guessingWord = [];
for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
guessingWord.push("_");
}
updateGameContent();
};

// This function is needed to send to the html the updates and status of where we are in the game instance.
function updateGameContent() {

document.getElementById("winCount").innerText = wins;
document.getElementById("lossCount").innerText = losses;
let guessingWordText = "";
for (let i = 0; i < guessingWord.length; i++) {
guessingWordText += guessingWord[i];
}

console.log("CurrentWord:", guessingWordText);
console.log("GuessingWord:", guessingWord);
console.log("CurrentWordIndex:", currentWordIndex);
document.getElementById("currentWord").innerText = guessingWordText;
document.getElementById("remainingChances").innerText = remainingGuesses;
document.getElementById("usedLetters").innerText = guessedLetters;
};


function evaluateGuess(letter) {
// Array to store strArray of letters in string
let strArray = [];
console.log("Current Word Index :", currentWordIndex);
// Loop through word finding all instances of guessed letter, store value in an array.
for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
if (wordBank[currentWordIndex][i] === letter) {
    strArray.push(i);
}
}

if (strArray.length <= 0) {
remainingGuesses--;
} else {
for (let i = 0; i < strArray.length; i++) {
    guessingWord[strArray[i]] = letter;
}
}
};

function checkWin() {
if (guessingWord.indexOf("_") === -1) {
wins++;
hasFinished = true;
document.getElementById("startMsg").innerText = "Congratulations!";
}
}; 


function checkLoss() {
if (remainingGuesses <= 0) {
hasFinished = true;
losses++;
document.getElementById("startMsg").innerText = "Sorry you lose!";
}
}

// Makes a guess
function letterPress(letter) {
if (remainingGuesses > 0) {
// Make sure we didn't use this letter yet
if (guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    evaluateGuess(letter);
}
}

};

// Event listener
document.onkeydown = function (event) {
// If we finished a game, dump one keystroke and reset.
if (hasFinished) {
resetGame();
hasFinished = false;
} else {
// Check to make sure a-z was pressed.
if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterPress(event.key.toLowerCase());
    updateGameContent();
    checkWin();
    checkLoss();
}
}
};    