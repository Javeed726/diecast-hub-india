import { useContext } from 'react';
import { PinsContext } from '../context/PinsContext';

export function usePins() {
  const context = useContext(PinsContext);
  if (context === undefined) {
    throw new Error('usePins must be used within a PinsProvider');
  }
  return context;
}
