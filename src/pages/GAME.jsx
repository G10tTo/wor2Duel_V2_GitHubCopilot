import { useState, useEffect, useRef } from 'react';
import LetterButtons from '../game_components/LetterButtons.component';
import WordDisplay from '../game_components/WordDisplay.component';
import RoundTable from '../game_components/RoundTable.component';
import GameRules from '../game_components/Rules.component';

import { isValidWord, getPossibleWords } from '../game_components/dictionary';
import Gs from '../styles/GAME.module.css';

function App() {
  const [sequence, setSequence] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null); // null till the game starts
  const [score, setScore] = useState({ user: 0, ai: 0 });
  const [rounds, setRounds] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lastCompletedWord, setLastCompletedWord] = useState(null);

  const turnTimer = useRef(null);

  const registraRound = async (word, winner) => {
    const valid = await isValidWord(word);
    const round = { word, winner, valid };
    setRounds(prev => [...prev, round]);
    setLastCompletedWord(round); // ✅ salva sempre la parola
  };

  const startNewRound = () => {
    clearTimeout(turnTimer.current);
    setSequence('');
    const startingPlayer = Math.random() < 0.5 ? 'user' : 'ai';
    setCurrentPlayer(startingPlayer);
  };

  useEffect(() => {
    if (currentPlayer === 'ai') {
      startTurn();
    }
  }, [currentPlayer]);

  const startTurn = () => {
    clearTimeout(turnTimer.current);
    turnTimer.current = setTimeout(() => {
      if (currentPlayer === 'ai') {
        aiTurn();
      }
    }, 2000);
  };

  const handleUserInput = async (letter) => {
    if (currentPlayer !== 'user') return;
    const newSeq = sequence + letter.toLowerCase();
    setSequence(newSeq);

    if (newSeq.length >= 4 && await isValidWord(newSeq)) {
      setScore(prev => ({ ...prev, user: prev.user + 1 }));
      registraRound(newSeq, 'user');
      setCurrentPlayer(null); // End of round
      return;
    }

    const possible = await getPossibleWords(newSeq);
    if (possible.length === 0) {
      // if no possible words, AI score 1 point
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      registraRound(newSeq, 'ai');
      setCurrentPlayer(null);
      return;
    }

    setSequence(newSeq);
    setCurrentPlayer('ai');
  };

  const aiTurn = async () => {
    const possible = await getPossibleWords(sequence);

    if (possible.length === 0) {
      setScore(prev => ({ ...prev, user: prev.user + 1 }));
      registraRound(sequence, 'user');
      setCurrentPlayer(null);
      return;
    }

    const nextLetters = possible.map(w => w[sequence.length]).filter(Boolean);

    if (nextLetters.length === 0) {
      setScore(prev => ({ ...prev, user: prev.user + 1 }));
      registraRound(sequence, 'user');
      setCurrentPlayer(null);
      return;
    }

    const nextLetter = nextLetters[Math.floor(Math.random() * nextLetters.length)];
    const newSeq = sequence + nextLetter.toLowerCase();

    if (newSeq.length >= 4 && await isValidWord(newSeq)) {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      registraRound(newSeq, 'ai');
      setSequence('');
      setCurrentPlayer(null);
      return;
    }

    setSequence(newSeq);
    setCurrentPlayer('user');
  };

  return (
    <div className={Gs.App}>

      <div className={Gs.circleContainer}>
        <LetterButtons onClick={handleUserInput} disabled={currentPlayer !== 'user'} />

        <div className={Gs.circleCenter}>
          <div className={Gs.scores}>
            <div className={Gs.score}>
              <p>Player:</p>
              <p>{score.user}</p>
            </div>
            <div className={Gs.score}>
              <p>AI:</p>
              <p>{score.ai}</p>
            </div>
          </div>
          {currentPlayer === null ? (
            <p>LET'S PLAY</p>
          ) : (
            <p>{currentPlayer === 'user' ? 'Player' : 'AI'}'s turn</p>
          )}

          <WordDisplay
            sequence={sequence}
            lastCompletedWord={lastCompletedWord}
            currentPlayer={currentPlayer}
          />

          <div className={Gs.controls}>
            <button onClick={() => setShowRules(true)}>Rules</button>
            <button onClick={startNewRound}>Start</button>
          </div>
          <div className={Gs.results}>
            <button onClick={() => setShowResults(true)}>View Results</button>
          </div>
        </div>
      </div>
      
      {showRules && <GameRules onClose={() => setShowRules(false)} />}
      {showResults && <RoundTable rounds={rounds} onClose={() => setShowResults(false)} />}
    </div>
  );
}

export default App;