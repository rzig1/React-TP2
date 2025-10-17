import React, { useContext } from 'react';
import { ThemeContext } from '../theme/themeContext';
import ThemeProvider from '../theme/themeProvider';

/* 4) useContext — Partage d'état (right sidebar) */
function ThemeDisplay() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;
  return <p>Thème courant : <strong>{ctx.theme}</strong></p>;
}

function ThemeToggler() {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <button onClick={toggle} aria-pressed={theme === 'dark'}>
      {theme === 'light' ? 'Passer au mode Sombre' : 'Revenir au mode Clair'}
    </button>
  );
}

export default function UseContextSidebar() {
  return (
    <aside
      role="complementary"
      aria-label="Thème & options"
      style={{
        width: 320,
        minWidth: 260,
        padding: 16,
        boxSizing: 'border-box',
      }}
    >
      <ThemeProvider>
        <div className="card" style={{ position: 'sticky', top: 16 }}>
          <h4 style={{ marginTop: 0 }}>4. useContext — Thème (Sidebar)</h4>
          <p className="explain" style={{ marginBottom: 10 }}>
            useContext évite le "prop drilling". Ici on montre un petit panneau de contrôle du thème.
          </p>
          <ThemeDisplay />
          <div style={{ marginTop: 12 }}>
            <ThemeToggler />
          </div>
        </div>
      </ThemeProvider>
    </aside>
  );
}
