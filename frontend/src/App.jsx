import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Home from "./pages/Home.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main>
        {/* Keyed on pathname so each route remounts and replays the fade-in. */}
        <div key={location.pathname} className="route-fade">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
