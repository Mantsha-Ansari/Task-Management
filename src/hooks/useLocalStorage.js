import { useState } from 'react';

// Custom hook for managing data in browser's local storage
// This allows our app to remember data even after page refresh
export function useLocalStorage(key, initialValue) {
  
  // useState hook to store our data in component state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get data from localStorage
      const item = window.localStorage.getItem(key);
      // If data exists, parse it from JSON, otherwise use initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If something goes wrong, log error and use initial value
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to update both state and localStorage
  const setValue = (value) => {
    try {
      // If value is a function, call it with current value
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update component state
      setStoredValue(valueToStore);
      
      // Save to localStorage as JSON string
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Log any errors that occur during saving
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Return current value and setter function
  // This is similar to useState, but with localStorage persistence
  return [storedValue, setValue];
}