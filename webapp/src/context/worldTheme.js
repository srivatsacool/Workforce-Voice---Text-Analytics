import { createContext, useContext } from 'react';

export const WORLDS = {
  cybernetic: {
    id: 'cybernetic',
    name: 'Cybernetic Matrix',
    shortName: 'Cybernetic',
    tagline: 'NASA Flight Operations & High-Density Telemetry Console',
    code: '02',
    fontHeading: 'font-cybernetic',
    headingFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
    accentColor: '#38BDF8',
    secondaryAccent: '#F59E0B',
    tertiaryAccent: '#10B981',
    cardClass: 'world-card-cybernetic',
    chartPalette: ['#38BDF8', '#F59E0B', '#10B981', '#818CF8', '#F43F5E', '#34D399'],
    badgeClass: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    kickerColor: 'text-cyan-400',
    buttonPrimary: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25',
    buttonOutline: 'border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/40',
    iconColor: 'text-cyan-400',
    heroGradient: 'from-cyan-400 via-sky-300 to-blue-500',
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial Gazette',
    shortName: 'Editorial',
    tagline: 'Financial Times & Bloomberg Executive Intelligence Memo',
    code: '01',
    fontHeading: 'font-editorial',
    headingFamily: "'Newsreader', Georgia, Cambria, serif",
    accentColor: '#E03131',
    secondaryAccent: '#D97706',
    tertiaryAccent: '#2B8A3E',
    cardClass: 'world-card-editorial',
    chartPalette: ['#E03131', '#2B8A3E', '#D97706', '#1E40AF', '#7C2D12', '#4B5563'],
    badgeClass: 'bg-amber-500/10 text-amber-300 border border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700/50',
    kickerColor: 'text-amber-400',
    buttonPrimary: 'bg-red-700 hover:bg-red-600 text-white shadow-md shadow-red-900/30',
    buttonOutline: 'border border-amber-600/30 text-amber-300 hover:bg-amber-950/30',
    iconColor: 'text-amber-400',
    heroGradient: 'from-amber-200 via-rose-300 to-amber-400',
  },
  biomorphic: {
    id: 'biomorphic',
    name: 'Biomorphic Canvas',
    shortName: 'Biomorphic',
    tagline: 'Neural Acoustic Physics & Bioluminescent Voice Waves',
    code: '03',
    fontHeading: 'font-biomorphic',
    headingFamily: "'Plus Jakarta Sans', sans-serif",
    accentColor: '#00F2FE',
    secondaryAccent: '#7928CA',
    tertiaryAccent: '#F43F5E',
    cardClass: 'world-card-biomorphic',
    chartPalette: ['#00F2FE', '#A855F7', '#FB7185', '#38BDF8', '#34D399', '#F472B6'],
    badgeClass: 'bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-400/30',
    kickerColor: 'text-fuchsia-400',
    buttonPrimary: 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25',
    buttonOutline: 'border border-purple-500/30 text-purple-300 hover:bg-purple-950/30',
    iconColor: 'text-fuchsia-400',
    heroGradient: 'from-cyan-300 via-fuchsia-400 to-indigo-400',
  }
};

export const WorldContext = createContext();

export function useWorldTheme() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorldTheme must be used within a WorldProvider');
  }
  return context;
}
