import LBs from '../styles/LetterButtons.module.css';

const LetterButtons = ({ onClick, disabled }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const radius = 220;
  const centerX = 250;
  const centerY = 250;

  /* D4_T3 ---> */
  const handleKeyDown = (event, letter) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick(letter);
    }
  };/*
  <--- */

  return (
    <div className={LBs.letterButtons}>
      {alphabet.map((letter, index) => {
        const angle = (index / alphabet.length) * 2 * Math.PI - Math.PI / 2; // Start from the top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        return (
          <button
            key={letter}
            onClick={() => onClick(letter)}
            onKeyDown={(event) => handleKeyDown(event, letter)}  /* D4_T3 */
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}  /* D4_T3 */
            style={{ left: `${x}px`, top: `${y}px` }}
            aria-label={`Letter ${letter}`}  /* D4_T3 */
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default LetterButtons;