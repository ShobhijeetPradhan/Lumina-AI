import { useState, useEffect } from 'react';

export const useAppController = () => {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const exitTimer = setTimeout(() => {
      setIsExiting(true); 
      
      const removeTimer = setTimeout(() => {
        setLoading(false); 
      }, 800); 

      return () => clearTimeout(removeTimer);
    }, 2000); 

    return () => clearTimeout(exitTimer);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newMode = !isDark;
    setIsDark(newMode);
    root.classList.toggle('dark');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return { loading, isExiting, isDark, toggleTheme };
};