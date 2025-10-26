import React, { useRef, useEffect } from "react";

function Search({ search, setSearch, origins, onChange, selectedOrigins }) {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            ref={inputRef}
            />
            {origins.map(o => {
                return (
                    <div key={o} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <input
                        id={o}
                        checked={selectedOrigins.includes(o)}
                        type="checkbox"
                        value={o}
                        onChange={() => onChange(o)}
                        style={{ marginRight: '0.5rem' }}
                        />
                        <label htmlFor={o}>{o}</label>
                    </div>
                )
            })}
        
        </>
    );
}

export default Search;