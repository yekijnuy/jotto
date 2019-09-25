/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secrete word.
 * @returns {number} - Number of letters matched between guessed and secret words
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set(secretWord.split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));
  console.log(secretLetterSet);
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter))
    .length;
}
