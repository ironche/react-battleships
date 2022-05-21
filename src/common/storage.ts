import { useState, useEffect } from 'react';

const storage = sessionStorage;

export function useStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
