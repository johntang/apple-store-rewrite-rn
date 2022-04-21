import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
const SettingContext = React.createContext();

const storeData = async (key, value) => {
  try {
    console.log(key, value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const useAsyncStorage = (key, initVal) => {
  const [storedValue, setStoredValue] = useState(async () => {
    const saved = await getData(key);
    if (saved) {
      setStoredValue(saved);
    } else {
      setStoredValue(initVal);
    }
  });

  const setVal = async (newVal) => {
    console.log('setVal', newVal);
    await storeData(key, newVal);
    await setStoredValue(newVal);
  };

  return [storedValue, setVal];
};

function SettingProvider(props) {
  const [language, setLanguage] = useAsyncStorage('language', 'en-US');
  const [throttle, setThrottle] = useAsyncStorage('throttle', 0);
  const [failingRate, setFailingRate] = useAsyncStorage('failingRate', 0);
  i18n.locale = language;
  return (
    <SettingContext.Provider
      value={{
        language,
        setLanguage,
        throttle,
        setThrottle,
        failingRate,
        setFailingRate,
      }}
      {...props}
    />
  );
}

const useSetting = () => useContext(SettingContext);

export { SettingProvider, useSetting };
