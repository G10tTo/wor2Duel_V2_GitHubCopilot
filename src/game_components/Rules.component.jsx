import Rs from '../styles/Rules.module.css';

const GameRules = ({ onClose }) => {
  return (
    <div className={Rs.rulesOverlay}>
      <div className={Rs.rulesBox}>
        <button className={Rs.closeButton} onClick={onClose}>✕</button>
        <h2>Game Rules</h2>
        <ul>
          <li>Each game consists of composing a single word.</li>
          <li>Players take turns entering one letter at a time.</li>
          <li>Words must be valid English nouns of at least 4 letters, max 10.</li>
          <li>If a player completes a valid word, they earn 1 point.</li>
          <li>If no more continuations are possible, the other player earns 1 point.</li>
          <li>Invalid words are still shown in the table but are not linked to the dictionary.</li>
          <li>Press START to begin the game.</li>
        </ul>
      </div>
    </div>
  );
};

export default GameRules;