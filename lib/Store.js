import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      if (
        key === 'usd' ||
        key === 'eur' ||
        key === 'gbp' ||
        key === 'jpy' ||
        key === 'aud' ||
        key === 'cad' ||
        key === 'chf' ||
        key === 'cny' ||
        key === 'hkd' ||
        key === 'idr' ||
        key === 'inr' ||
        key === 'krw' ||
        key === 'mxn' ||
        key === 'nzd' ||
        key === 'rub' ||
        key === 'sgd' ||
        key === 'thb' ||
        key === 'zar'
      ) {
        data.push({
          label: key,
          name: namesJson[key],
          value: ratesJson.myr[key],
        });
      }
    }
    return data;
  };
  const getData = async () => {
    console.log('HELPER: Getting rates');
    try {
      const jsonData = await AsyncStorage.getItem('rates');
      return jsonData !== null ? JSON.parse(jsonData) : null;
    } catch (e) {
      console.log('HELPER: Error getting rates');
    }
  };
  const storeData = async (dataType, data) => {
    console.log('HELPER: Storedata function:', dataType);
    switch (dataType) {
      case 'rates':
        try {
          const jsonData = JSON.stringify(data);
          await AsyncStorage.setItem(dataType, jsonData);
        } catch (e) {
          console.log('Error');
        }
        break;
      case 'currSelection':
        try {
          await AsyncStorage.setItem(dataType, data);
        } catch (e) {
          console.log('Error');
        }
        break;
      default:
        console.log('HELPER: No data type');
    }
  };
  const value = {
    state,
    setState,
    fetchData,
    getData,
    storeData,
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
