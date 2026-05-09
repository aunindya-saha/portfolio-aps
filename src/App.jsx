import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ParticleBackground } from "./components/ParticleBackground";
import { Navbar } from "./components/Navbar";
import { ChatbotShell } from "./components/ChatbotShell";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Insights } from "./pages/Insights";
import { ExperiencePage } from "./pages/ExperiencePage";

// Scroll to top or specific hash on route change
function ScrollHandler() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Small timeout to ensure DOM is ready after navigation
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Initialize dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30">
      <ScrollHandler />
      <ParticleBackground />
      {/* Fixed floating navbar — rendered outside content flow */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/experience" element={<ExperiencePage />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <ChatbotShell />
    </div>
  );
}

export default App;
