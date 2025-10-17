function CharacterCard({ character }) {
  return (
    <article
      className="character-card"
      style={{
        border: '1px solid #e3e3e3',
        borderRadius: 8,
        padding: 8,
        textAlign: 'center',
      }}
    >
      <img
        src={character.image}
        alt={character.name}
        style={{ width: '100%', borderRadius: 6 }}
      />
      <p style={{ fontWeight: 700, margin: '8px 0 4px' }}>{character.name}</p>
      <p style={{ margin: 0 }}>Status: {character.status}</p>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
        {character.species} — {character.gender}
      </p>
    </article>
  );
}

export default CharacterCard;
