import React, { useContext } from 'react';
import { Navbar } from "./components/Navbar/Navbar";
import { ThemeContext } from './components/ThemeContext/ThemeContext';

const Layout = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;