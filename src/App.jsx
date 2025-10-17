import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CharacterList from "./components/CharacterList";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); 
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null); 

useEffect(() => {
  setLoading(true);
  setError(null);
  setCharacters([]);

  const encodedQuery = encodeURIComponent(query.trim());

  const base = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const url = query.trim() ? `${base}&name=${encodedQuery}` : base;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) return { results: [], info: { prev: null, next: null } };
        throw new Error("La requête a échoué (code " + response.status + ")");
      }
      return response.json();
    })
    .then(data => {
      setCharacters(data.results || []);
      setInfo(data.info || null);
    })
    .catch(err => setError(err.message || "Erreur inconnue"))
    .finally(() => setLoading(false));

}, [query, page]);


  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "32px auto",
        padding: 24,
        background: "#4e4e4eff",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(18, 38, 63, 0.08)",
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, color: "#10243a" }}>
          Annuaire Rick and Morty
        </h1>
      </header>

      <div style={{ marginBottom: 18 }}>
        <SearchBar
          onSearchSubmit={(newQuery) => {
            setQuery(newQuery);
            setPage(1); // réinitialise la page à 1 lors d'une nouvelle recherche
          }}
        />
      </div>

      {loading && (
        <p
          style={{
            padding: 12,
            background: "#72767aff",
            borderRadius: 8,
            textAlign: "center",
            boxShadow: "0 1px 4px rgba(16,36,58,0.04)",
          }}
        >
          Chargement...
        </p>
      )}

      {error && (
        <p
          style={{
            padding: 12,
            background: "#72767aff",
            color: "#b00020",
            borderRadius: 8,
            textAlign: "center",
            boxShadow: "0 1px 4px rgba(16,36,58,0.04)",
          }}
        >
          Erreur : {error}
        </p>
      )}

      {!loading && !error && (
        <div
          style={{
            background: "#72767aff",
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 2px 8px rgba(16,36,58,0.04)",
          }}
        >
            <div
        className="pagination"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 20,
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!info || !info.prev}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #e3e8ef",
            background: !info || !info.prev ? "#f1f3f5" : "#ffffff",
            cursor: !info || !info.prev ? "not-allowed" : "pointer",
            opacity: !info || !info.prev ? 0.7 : 1,
          }}
        >
          Précédent
        </button>

        <span style={{ minWidth: 80, textAlign: "center", fontWeight: 600, color: "#22324a" }}>
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!info || !info.next}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #e3e8ef",
            background: !info || !info.next ? "#f1f3f5" : "#ffffff",
            cursor: !info || !info.next ? "not-allowed" : "pointer",
            opacity: !info || !info.next ? 0.7 : 1,
          }}
        >
          Suivant
        </button>
      </div>
          <CharacterList characters={characters} />
        </div>
      )}

    
    </div>
  );
}

export default App;
