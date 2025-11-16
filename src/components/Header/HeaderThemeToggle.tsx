import { useEffect, useState } from 'react';
import { getInitialTheme } from '../../theme';

export const HeaderThemeToogle = () => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.body.classList.add(`${theme}-theme`);
    return () => {
      document.body.classList.remove(`${theme}-theme`);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label="Toggle theme"
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: theme === 'dark' ? '#FFD700' : '#4b4b4bff',
      }}
    >
      {theme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 0 1 12.79 3a7 7 0 1 0 8.21 9.79Z" />
        </svg>
      )}
    </button>
  );
};
