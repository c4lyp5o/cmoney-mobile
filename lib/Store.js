import React, { useState, useContext, useRef, useEffect } from 'react';

const STstore = React.createContext();

function STstoreProvider({ children }) {
  const [state, setState] = useState({
    isLoading: true,
    data: {},
  });
  value = { state, setState };
  return <STstore.Provider value={value}>{children}</STstore.Provider>;
}

const useSTStore = () => {
  const context = useContext(STstore);
  if (!context) {
    throw new Error('useSTStore must be used within a STstoreProvider');
  }
  return context;
};

export { STstoreProvider, useSTStore };
