import RTs from '../styles/RoundTable.module.css';
import Rs from '../styles/Rules.module.css';

const RoundTable = ({ rounds, onClose }) => {
  return (
    <div className={Rs.rulesOverlay}>
      <div className={Rs.rulesBox}>
        <button className={Rs.closeButton} onClick={onClose}>✕</button>
        <h2>Round's Results</h2>
        <div className={RTs.roundTableContainer}>
          <table className={RTs.roundTable}>
            <thead>
              <tr>
                <th>Word</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((round, index) => (
                <tr
                  key={index}
                  className={round.winner === 'user' ? RTs.userWin : RTs.aiWin}
                >
                  <td>
                    {round.valid ? (
                      <a
                        href={`https://dictionary.cambridge.org/dictionary/english/${round.word}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {round.word.toUpperCase()}
                      </a>
                    ) : (
                      <span>
                        {round.word.toUpperCase()} <em>(invalid)</em>
                      </span>
                    )}
                  </td>
                  <td>{round.winner === 'user' ? 'User' : 'AI'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default RoundTable;