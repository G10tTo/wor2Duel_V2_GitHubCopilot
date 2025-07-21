export const updateScore = (currentScore, winner) => {
  const updatedScore = { ...currentScore };
  updatedScore[winner] += 1;
  return updatedScore;
};

export const registerRound = async (word, winner, isValidWord, setRounds, setLastCompletedWord) => {
  const valid = await isValidWord(word);
  const round = { word, winner, valid };
  setRounds(prev => [...prev, round]);
  setLastCompletedWord(round);
};
