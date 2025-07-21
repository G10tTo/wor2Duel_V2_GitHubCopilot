import { isValidWord, getPossibleWords } from './dictionary';
import nounList from '../assets/valid_nouns_4-10.json';

describe('dictionary.js', () => {
  describe('isValidWord', () => {
    it('should return true for valid words', async () => {
      const validWord = nounList[0]; // Assuming nounList has at least one valid word
      const result = await isValidWord(validWord);
      expect(result).toBe(true);
    });

    it('should return false for invalid words', async () => {
      const invalidWord = 'invalidword';
      const result = await isValidWord(invalidWord);
      expect(result).toBe(false);
    });

    it('should return false for words with length less than 4', async () => {
      const shortWord = 'abc';
      const result = await isValidWord(shortWord);
      expect(result).toBe(false);
    });

    it('should return false for words with length greater than 10', async () => {
      const longWord = 'abcdefghijk';
      const result = await isValidWord(longWord);
      expect(result).toBe(false);
    });
  });

  describe('getPossibleWords', () => {
    it('should return words that start with the given prefix', async () => {
      const prefix = nounList[0].substring(0, 2); // Take the first two characters of a valid word
      const result = await getPossibleWords(prefix);
      expect(result).toEqual(nounList.filter(word => word.startsWith(prefix)));
    });

    it('should return an empty array if no words match the prefix', async () => {
      const prefix = 'zzzz'; // Assuming no word starts with 'zzzz'
      const result = await getPossibleWords(prefix);
      expect(result).toEqual([]);
    });
  });
});
