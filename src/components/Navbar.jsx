import React from 'react';

const Navbar = ({ isDark, toggleTheme, onSignupClick }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <button onClick={toggleTheme} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-cyan-500 transition-all duration-300">
          {isDark ? <span className="text-yellow-400 text-xl">☀️</span> : <span className="text-indigo-600 text-xl">🌙</span>}
        </button>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Purpose', 'Use Case', 'Revise'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onSignupClick} 
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:opacity-70 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={onSignupClick}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;