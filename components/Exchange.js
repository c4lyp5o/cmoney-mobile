import {
  Text,
  Box,
  Button,
  Input,
  Select,
  Heading,
  Checkbox,
  Stack,
} from 'native-base';
import { useRef, useState } from 'react';

import { useSTStore } from '../lib/Store';

export default function Exchange({ data, names }) {
  const { state, setState, fetchExchangeData, fetchCurrencyNames } =
    useSTStore();
  const [exchange, setExchange] = useState(0);
  const [result, setResult] = useState(0);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const amount = useRef(null);
  // const search = useRef(null);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.label ? item : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <Box alignItems='center' w='full'>
      <Box
        w='90%'
        mt={3}
        alignItems='center'
        rounded='lg'
        overflow='hidden'
        borderColor='coolGray.200'
        borderWidth='1'
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        <Stack p='4' space={3}>
          <Stack space={2}>
            <Heading size='md' ml='-1'>
              Hola, today is {new Date().toLocaleDateString('en-GB')}
            </Heading>
            <Text>Welcome to MYR exchange rate</Text>
          </Stack>
        </Stack>
      </Box>
      <Box
        w='90%'
        mt={3}
        alignItems='center'
        rounded='lg'
        overflow='hidden'
        borderColor='coolGray.200'
        borderWidth='1'
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        <Stack p='4' w='90%' space={5}>
          <Box>
            <Input
              keyboardType='numeric'
              onChange={(e) => {
                amount.current = e.nativeEvent.text;
              }}
              placeholder='Enter MYR amount'
            />
          </Box>
          <Box>
            <Select
              minWidth='70'
              accessibilityLabel='Select Currency'
              placeholder='Select Currency'
              onValueChange={(i) => {
                setExchange(null);
                setState({ exr: null });
                setExchange(i);
              }}
            >
              {data.map((i, index) => (
                <Select.Item
                  key={index}
                  label={i.name}
                  value={i.value}
                  onTouchEnd={() => {
                    setState({ exr: i.label });
                  }}
                />
              ))}
            </Select>
          </Box>
          <Box alignSelf='center' alignContent='center' textAlign='center'>
            <Checkbox
              shadow={2}
              value='test'
              accessibilityLabel='This is a dummy checkbox'
              defaultIsChecked
            >
              Remember my currency
            </Checkbox>
          </Box>
          <Button
            onPress={() => {
              setResult(amount.current * exchange);
            }}
          >
            Convert
          </Button>
        </Stack>
      </Box>
      {result ? (
        <Box
          w='90%'
          mt={3}
          alignItems='center'
          rounded='lg'
          overflow='hidden'
          borderColor='coolGray.200'
          borderWidth='1'
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
        >
          <Heading m={5} textAlign='center'>
            You will get {state.exr.toUpperCase()} {result.toFixed(0)} for MYR{' '}
            {amount.current}
          </Heading>
          <Text mb={5}>Thank you for using NNMC! ❤</Text>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}
