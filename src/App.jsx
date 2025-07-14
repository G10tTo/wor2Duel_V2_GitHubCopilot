import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GAME from "./pages/GAME";
import NotFound from "./pages/NotFound";
import Header from "./page_components/Header.component";
import Footer from "./page_components/Footer.component";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<GAME />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;