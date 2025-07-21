import Fs from "../styles/Footer.module.css";

/**
 * Footer Component
 * 
 * This component renders the footer section of the application.
 * It includes a copyright notice with the year and author information.
 * 
 * @returns {JSX.Element} The JSX code for the footer.
 */

const Footer = () => {
  return (
    <footer>
      <p className={Fs}>&copy; 2025 Andrea Sargiotto. All rights reserved.</p>
    </footer>
  );
};

export default Footer;