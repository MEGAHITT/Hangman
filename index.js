//Risto ja Kristen
const functions = require('./functions');
const gameWord = require('./functions');
const hanged = require('./emot')
const title = require('./title')
const trophy = require('./trophy')

let vowelsArray = ['A', 'E', 'I', 'O', 'U'];
let tryAgain = true;
game();

async function game() {
  while (tryAgain) {

    //const randomizer = (Math.random() * (gameWord.length - 1)).toFixed(0);
    // functions.getWord();
    const rawWord = "";

    try {
    rawWord = await functions.getWord();
    } 
    catch (error) {
      console.log('PANIC')
    }
    const secretWord = rawWord.toUpperCase();
    const secretWordLetters = [...secretWord];

    const gameState = new Array(secretWordLetters.length).fill(`-`);
    const usedLetters = [];

    let attempts = 6;

    const vowelsAmount = secretWordLetters.reduce((vowels, letter) => vowelsArray.includes(letter) ? vowels + 1 : vowels, 0);
    const consonantAmount = secretWordLetters.length - vowelsAmount;

    const hint = `The hidden word contains ${vowelsAmount} vowels and ${consonantAmount} consonants :bulb: \n`;
    let hintYes = true;

    console.log(title)
    prompt(`PRESS ANY KEY TO CONTINUE...`);
    console.clear();
    console.log(title)

    console.log(`- H - A - N - G - M - A - N - \n`);

    while (true) {

      let hintsInput = prompt(`Do you want a hint :bulb:? [YES/NO]`).toUpperCase();

      if (hintsInput === 'YES' || hintsInput === 'Y') {
        hintYes = true;
        console.clear();
        break;
      } else if (hintsInput === 'NO' || hintsInput === 'N') {
        hintYes = false;
        console.clear();
        break;
      } else {
        continue;
      }
    }

    // console.log(`Letters or words that you have already guessed: ${usedLetters} \n \n`);
    //console.log(`You have ${attempts} tries. \nHere's what you're guessing: \n \n ${gameState.join(' ')} \n`);

    while (attempts > 0) {

      const isString = (string) => /[A-Za-z]/.test(string);

      console.log(title)
      console.log(`- H - A - N - G - M - A - N - \n`);
      console.log(`You have ${attempts} tries. \nHere's what you're guessing: \n \n ${gameState.join(' ')} \n`);
      console.log(`Letters or words that you have already guessed: ${usedLetters} \n \n`);

      if (hintYes) {
        console.log(hint);
      } else {
        hintYes = false;
      }

      let userInput = prompt('Enter a letter or a word: ').toUpperCase();

      if (isString(userInput) && secretWordLetters.includes(userInput)) {
        usedLetters.push(userInput);
        console.clear();
      } else if (isString(userInput)) {
        usedLetters.push(userInput);
        console.clear();
        attempts--;
      } else {
        attempts--;
        console.log(`\nYou have to enter a letter or a word!\n`);
        console.log;
      } //input validation
      
      console.clear();

      functions.updateGameState(secretWordLetters, gameState, userInput,);

      const didUserWinState = functions.didUserWin(secretWord, gameState, userInput);

      if (didUserWinState) {
        console.log(title)
        console.log(`- H - A - N - G - M - A - N - \n`);
        console.log(trophy);
        console.log(`You WIN! You guessed the word - '${secretWord}'\n`);
      } else if (!didUserWinState && attempts === 0) {
        console.log(hanged);
        console.log(`YOU LOSE! \n\nThe correct word was: '${secretWord}'\n`);
      }

      if (didUserWinState === true || !didUserWinState && attempts === 0) {
        const restartInput = prompt('PRESS ANY KEY TO CONTINUE OR ENTER "Q" TO QUIT').toUpperCase();
        if (restartInput === 'Q' || restartInput === 'q') {
          console.log(`So sad :sob: ! Baiiii `);
          console.clear();
          tryAgain = false;
          break;
        } else {
          console.clear();
          tryAgain = true;
          break;
        }
      }
    }
  }
}