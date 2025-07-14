const WordDisplay = ({ sequence, lastCompletedWord, currentPlayer }) => {
  let displayText = '';
  let color = '';

  const roundFinished = currentPlayer === null;

  if (!roundFinished && sequence.length > 0) {
    displayText = sequence.toUpperCase();
  } else if (roundFinished && lastCompletedWord) {
    displayText = lastCompletedWord.word.toUpperCase();
    color = lastCompletedWord.winner === 'user' ? '#3ebd57' : '#d94343';
  } else {
    displayText = '{WordDuel}';
  }

  return (
    <h2 style={{ letterSpacing: '0.3em', color }}>
      {displayText}
      {roundFinished && lastCompletedWord && !lastCompletedWord.valid && (
        <em style={{ fontSize: '0.6em', color: '#aaa', marginLeft: '0.5em' }}>
          (invalid)
        </em>
      )}
    </h2>
  );
};

export default WordDisplay;