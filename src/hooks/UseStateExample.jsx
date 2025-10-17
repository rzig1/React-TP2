import React, { useState } from 'react';

/* 1) useState - Exemple simple */
export default function UseStateExample() {
  const [count, setCount] = useState(0);

  return (
    <section className="example-section" style={{ maxWidth: 400, margin: '2rem auto', background: '#3c3c3c', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 600 }}>1. useState — Compteur simple</h3>
      <p className="explain" style={{ marginBottom: '1.5rem', color: '#bdbdbd' }}>
        useState permet d'avoir une valeur locale et de la modifier.
      </p>
      <div className="card" style={{ background: '#242424', borderRadius: 8, padding: '1.5rem 1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Count : {count}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            style={{
              background: '#f28a13ff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem 1rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setCount((c) => c + 1)}
          >
            ➕
          </button>
          <button
            style={{
              background: '#f28a13ff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem 1rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setCount((c) => c - 1)}
          >
            ➖
          </button>
          <button
            style={{
              background: '#3f409eff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem 1rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
