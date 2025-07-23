import { useState, useEffect } from 'react';
import Hs from '../styles/Header.module.css';

const Header = ({ onRestart }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header className={Hs.header}>
      <h1>WOR(2D)UEL</h1>
      <button className={Hs.restartButton} onClick={onRestart}>Restart Game</button> {/* D4_T4 */}
      <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button> {/* D4_T7 */}
    </header>
  );
};

export default Header;