import { useState, useEffect, useRef } from 'react';
import LetterButtons from '../game_components/LetterButtons.component';
import WordDisplay from '../game_components/WordDisplay.component';
import RoundTable from '../game_components/RoundTable.component';
import GameRules from '../game_components/Rules.component';

import { isValidWord, getPossibleWords } from '../game_components/dictionary';
import Gs from '../styles/GAME.module.css';
import { updateScore, registerRound } from '../utils/scoring';

function App() {
  const [sequence, setSequence] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null); // null till the game starts
  const [score, setScore] = useState({ user: 0, ai: 0 });
  const [rounds, setRounds] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lastCompletedWord, setLastCompletedWord] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 535);  /* D4_T2 */

  const turnTimer = useRef(null);

  /* D4_T2  ---> */
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 535);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);/* 
  <--- */

  /* D4_T8  ---> */
  const registerRoundAsync = async (word, winner) => {
    const valid = await isValidWord(word);
    const round = { word, winner, valid };
    setRounds(prev => [...prev, round]);
    setLastCompletedWord(round);
  };/* 
  <--- */
  
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
      setScore(prev => updateScore(prev, 'user'));
      registerRoundAsync(newSeq, 'user');
      setCurrentPlayer(null); // End of round
      return;
    }

    const possible = await getPossibleWords(newSeq);
    if (possible.length === 0) {
      setScore(prev => updateScore(prev, 'ai'));
      registerRoundAsync(newSeq, 'ai');
      setCurrentPlayer(null);
      return;
    }

    setSequence(newSeq);
    setCurrentPlayer('ai');
  };

  const aiTurn = async () => {
    const possible = await getPossibleWords(sequence);

    if (possible.length === 0) {
      setScore(prev => updateScore(prev, 'user'));
      registerRoundAsync(sequence, 'user');
      setCurrentPlayer(null);
      return;
    }

    const nextLetters = possible.map(w => w[sequence.length]).filter(Boolean);

    if (nextLetters.length === 0) {
      setScore(prev => updateScore(prev, 'user'));
      registerRoundAsync(sequence, 'user');
      setCurrentPlayer(null);
      return;
    }

    const nextLetter = nextLetters[Math.floor(Math.random() * nextLetters.length)];
    const newSeq = sequence + nextLetter.toLowerCase();

    if (newSeq.length >= 4 && await isValidWord(newSeq)) {
      setScore(prev => updateScore(prev, 'ai'));
      registerRoundAsync(newSeq, 'ai');
      setSequence('');
      setCurrentPlayer(null);
      return;
    }

    setSequence(newSeq);
    setCurrentPlayer('user');
  };

  return (
    <div className={Gs.App}>
      {isSmallScreen && (
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
      )}

      <div className={`${Gs.circleContainer} ${currentPlayer === 'user' ? Gs.playerTurn : Gs.aiTurn}`}> {/* D4_T5 */}
        <LetterButtons onClick={handleUserInput} disabled={currentPlayer !== 'user'} />

        <div className={Gs.circleCenter}>
          {!isSmallScreen && (
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
          )}
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