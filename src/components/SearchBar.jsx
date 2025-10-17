import React, { useState } from 'react'

const SearchBar = ({onSearchSubmit}) =>{
  const [term,setTerm]=useState('');
  const handleSubmit=(event)=>{
    event.preventDefault(); 
    onSearchSubmit(term);
    };
    return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <p>
                Recherche de personnage
            </p>
            <input style={{border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%'}} type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
        </form>
    </div>
  )
}

export default SearchBar;