import React from "react";
import { useTheme } from "./context/ThemeContext";
import Navigation from "./components/Navbar";
import Hero from "./components/Hero.jsx";
import Projects from "./components/projects.jsx";

import "./css/App.css";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App" data-theme={theme}>
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <div className="main">
        <Hero />
        <Projects />
      </div>
    </div>
  );
}

export default App;
