import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NFs from "../styles/NotFound.module.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
   <>
    <div className={NFs.BoxContainer}>
      <h1>404</h1>
      <p>Oops! Page not found</p>
      <p>
        Return to the <a href="/" className={NFs.link}>GAME</a>
      </p>
    </div>
   </>
  );
};

export default NotFound;