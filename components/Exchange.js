import { Text, Box, Button, Input, Select, VStack } from 'native-base';
import { useRef, useState } from 'react';

import { useSTStore } from '../lib/Store';

export default function Exchange({ data, names }) {
  const { state, setState, fetchExchangeData, fetchCurrencyNames } =
    useSTStore();
  const [exchange, setExchange] = useState(0);
  const [result, setResult] = useState(0);
  const amount = useRef(null);
  const search = useRef(null);

  return (
    <Box alignItems='center' justifyContent='center'>
      <Text>Hola, today is {new Date().toLocaleDateString()}</Text>
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
          onValueChange={(i) => {
            setExchange(i);
            setState({
              exd: i,
              exr: data[i],
            });
          }}
        >
          {data.map((i, index) => (
            <Select.Item key={index} label={i.name} value={i.value} />
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
    </Box>
  );
}
