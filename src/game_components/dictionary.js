import nounList from '../assets/valid_nouns_4-10.json';

// Verify if a word is valid
export const isValidWord = async (word) => {
  return word.length >= 4 && word.length <= 10 && nounList.includes(word.toLowerCase());
};

// Get words that start with a prefix
export const getPossibleWords = async (prefix) => {
  return nounList.filter(word => word.startsWith(prefix.toLowerCase()));
};