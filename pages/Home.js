import {
  Text,
  Box,
  Button,
  TextInput,
  Input,
  Spinner,
  Select,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';

import { useSTStore } from '../lib/Store';

export default function HomeScreen() {
  const { state, setState } = useSTStore();
  const [date, setDate] = useState('');
  const [data, setData] = useState(null);
  const [exchange, setExchange] = useState(0);
  const [result, setResult] = useState(0);
  const ic = useRef(null);
  const pass = useRef(null);
  const amount = useRef(null);

  function LoginScreen() {
    return (
      <>
        <Text>Sila Log Masuk</Text>
        <TextInput
          value={state.ic}
          onChange={(e) => (ic.current = e.nativeEvent.text)}
          onBlur={() => setState({ ...state, ic: ic.current })}
          variant='outlined'
          label='No. IC'
          style={{ margin: 16, width: '85%' }}
        />
        <TextInput
          value={state.pass}
          onChange={(e) => (pass.current = e.nativeEvent.text)}
          variant='outlined'
          label='Password'
          style={{ margin: 16, width: '85%' }}
        />
        <Button
          title='Click Me'
          onPress={() => {
            setState({ ...state, pass: pass.current });
            if (state.ic === '123456789' && state.pass === '123456789') {
              setState({ ...state, isLogin: true });
            } else {
              setState({ ...state, isLogin: false });
            }
          }}
          style={{ alignSelf: 'center' }}
        />
        <Box style={{ alignSelf: 'center' }}>
          <Text>{state.ic}</Text>
          <Text>{state.pass}</Text>
        </Box>
      </>
    );
  }

  function LoggedInScreen() {
    return (
      <>
        <Text>Selamat Datang ke Sistem Temujanji</Text>
        <Button
          title='Logout'
          onPress={() => {
            setState({ ...state, isLogin: false });
          }}
          style={{ alignSelf: 'center' }}
        />
      </>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/myr.json'
      );
      const json = await response.json();
      let data = [];
      for (let key in json.myr) {
        data.push({ label: key, value: json.myr[key] });
      }
      console.log(data);
      setData(data);
      return json;
    };
    fetchData().then((json) => {
      setState({ ...state, data: json });
    });
    setTimeout(() => {
      setState({ ...state, isLoading: false });
    }, 2000);
  }, []);

  return (
    <Box alignItems='center'>
      {state.isLoading ? (
        <Box>
          <Text>Loading data</Text>
          <Spinner size='lg' />
        </Box>
      ) : (
        <>
          <Text>Hola, today is {data.date}</Text>
          <Text>Welcome to MYR exchange rate</Text>
          <Input
            m={2}
            keyboardType='numeric'
            onChange={(e) => {
              amount.current = e.nativeEvent.text;
              console.log(amount.current);
            }}
            placeholder='Enter MYR amount'
          />
          <Box>
            <Select
              minWidth='200'
              accessibilityLabel='Select Currency'
              placeholder='Select Currency'
              m='2'
              onValueChange={(itemValue) => {
                setExchange(itemValue);
                setState({
                  ...state,
                  exd: itemValue,
                  exr: data[itemValue],
                });
              }}
            >
              {data.map((i, index) => (
                <Select.Item key={index} label={i.label} value={i.value} />
              ))}
            </Select>
          </Box>
          <Button
            onPress={() => {
              setResult(amount.current * exchange);
            }}
          >
            Click Me
          </Button>
          {state.exd ? <Text mt={5}>You will get {result}</Text> : ''}
        </>
      )}
    </Box>
  );
}
