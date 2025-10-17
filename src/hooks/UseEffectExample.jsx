import React, { useEffect, useReducer } from 'react';
import CharacterList from '../components/CharacterList';

/* 2) useEffect - Appel API */

const initialState = {
  page: 1,
  characters: [],
  loading: true,
  error: null,
  totalPages: 1,
};

function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        characters: action.payload.characters,
        totalPages: action.payload.totalPages ?? state.totalPages,
        error: null,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, characters: [] };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

export default function UseEffectExample() {
  const [state, dispatch] = useReducer(apiReducer, initialState);
  const { page, characters, loading, error, totalPages } = state;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCharacters() {
      try {
        dispatch({ type: 'FETCH_START' });

        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Erreur réseau (${res.status})`);

        const data = await res.json();

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            characters: data.results ?? [],
            totalPages: data.info?.pages ?? 1,
          },
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Erreur inconnue' });
      }
    }

    fetchCharacters();
    return () => controller.abort();
  }, [page]);

  return (
    <section className="example-section">
      <h3>2. useEffect — Récupération (Rick & Morty API) avec useReducer</h3>
      <p className="explain">
        Exemple avec pagination (page dans l'URL) et gestion centralisée d'état via <code>useReducer</code>.
      </p>

      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <div>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: Math.max(1, page - 1) })}
              disabled={page <= 1 || loading}
              aria-label="Page précédente"
            >
              ◀ Precedant
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: Math.min(totalPages, page + 1) })}
              disabled={page >= totalPages || loading}
              style={{ marginLeft: 8 }}
              aria-label="Page suivante"
            >
              Suivant ▶
            </button>
          </div>

          <div>
            <small>
              Page {page} / {totalPages}
            </small>
          </div>
        </div>

        {loading && <p className="loading">Chargement...</p>}
        {error && <p className="error">Erreur : {error}</p>}

        {!loading && !error && characters.length > 0 && <CharacterList characters={characters} />}

        {!loading && !error && characters.length === 0 && <p>Aucun personnage trouvé.</p>}
      </div>
    </section>
  );
}
