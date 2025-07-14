import LBs from '../styles/LetterButtons.module.css';

const LetterButtons = ({ onClick, disabled }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const radius = 220;
  const centerX = 250;
  const centerY = 250;

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
            disabled={disabled}
            style={{ left: `${x}px`, top: `${y}px` }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default LetterButtons;