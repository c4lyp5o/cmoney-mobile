import { Heading, Box, Spinner, Stack } from 'native-base';

export default function Loading() {
  return (
    <Box alignItems='center' justifyContent='center' flex={1}>
      <Box
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
            <Spinner size='lg' />
            <Heading textAlign='center'>Loading data</Heading>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
