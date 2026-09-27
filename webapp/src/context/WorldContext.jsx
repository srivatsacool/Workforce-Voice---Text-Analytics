import React, { useState, useEffect } from 'react';
import { WorldContext, WORLDS } from './worldTheme';

export function WorldProvider({ children }) {
  const [world, setWorld] = useState(() => {
    const saved = localStorage.getItem('wi_active_world');
    return (saved && WORLDS[saved]) ? saved : 'cybernetic';
  });

  useEffect(() => {
    localStorage.setItem('wi_active_world', world);
    document.documentElement.setAttribute('data-world', world);
  }, [world]);

  const activeWorld = WORLDS[world] || WORLDS.cybernetic;

  return (
    <WorldContext.Provider value={{ 
      world, 
      setWorld, 
      activeWorld, 
      allWorlds: WORLDS 
    }}>
      {children}
    </WorldContext.Provider>
  );
}
