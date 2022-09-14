import React, { useState, useContext, useRef, useEffect } from 'react';

const STstore = React.createContext();

function STstoreProvider({ children }) {
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    date: new Date().toLocaleDateString('en-GB'),
  });
  const fetchData = async () => {
    const names = await fetch(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
    );
    const rates = await fetch(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/myr.json'
    );
    const namesJson = await names.json();
    const ratesJson = await rates.json();
    let data = [];
    for (let key in ratesJson.myr) {
      data.push({
        label: key,
        name: namesJson[key],
        value: ratesJson.myr[key],
      });
    }
    return data;
  };
  const value = {
    state,
    setState,
    fetchData,
  };
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
