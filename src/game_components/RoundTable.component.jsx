import '../styles/RoundTable.css';
import styles from '../styles/Rules.module.css';

const RoundTable = ({ rounds, onClose }) => {
  return (
    <div className={styles.rulesOverlay}>
      <div className={styles.rulesBox}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2>Round's Results</h2>
        <div className="round-table-container">
          
          <table className="round-table">
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
                  className={round.winner === 'user' ? 'user-win' : 'ai-win'}
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