/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secrete word.
 * @returns {number} - Number of letters matched between guessed and secret words
 */
export function getLetterMatchCount(guessedWord, secretWord) {
    // takes the word, splits into array, then makes key's out of them in an object
  const secretLetterSet = new Set(secretWord.split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));

  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter))
    .length;
}
