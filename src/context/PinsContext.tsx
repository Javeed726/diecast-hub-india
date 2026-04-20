import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

const PIN_KEY = 'diecast_hub_pins';

interface PinsContextType {
  pins: Set<string>;
  togglePin: (id: string) => void;
  isPinned: (id: string) => boolean;
  clearPins: () => void;
  pinCount: number;
}

export const PinsContext = createContext<PinsContextType | undefined>(undefined);

export function PinsProvider({ children }: { children: React.ReactNode }) {
  const [pins, setPins] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(PIN_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist to localStorage whenever pins change
  useEffect(() => {
    try {
      localStorage.setItem(PIN_KEY, JSON.stringify(Array.from(pins)));
    } catch {}
  }, [pins]);

  const togglePin = useCallback((id: string) => {
    setPins((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isPinned = useCallback((id: string) => pins.has(id), [pins]);
  const clearPins = useCallback(() => setPins(new Set()), []);

  const value = useMemo(() => ({
    pins,
    togglePin,
    isPinned,
    clearPins,
    pinCount: pins.size
  }), [pins, togglePin, isPinned, clearPins]);

  return (
    <PinsContext.Provider value={value}>
      {children}
    </PinsContext.Provider>
  );
}
