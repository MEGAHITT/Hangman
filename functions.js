const fetch = require('node-fetch');

function updateGameState(secretWord, gameState, userEntry) {
  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord[i];
    if (userEntry === letter) {
      gameState[i] = userEntry;
      secretWord[i] = '-';
    }
  }
}

function didUserWin(secretWord, inputArray, userEntry) {
  let arraycheck = inputArray.join('');
  if (arraycheck === secretWord || userEntry === secretWord) {
    return true;
  } else {
    return false;
  }
}


async function getWord() {
  const url = 'https://random-word-api.herokuapp.com/word';
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
}

module.exports = { updateGameState, didUserWin, getWord };