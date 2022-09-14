import { Text, Box, Spinner } from 'native-base';

export default function Loading() {
  return (
    <Box alignItems='center' justifyContent='center' flex={1}>
      <Text>Loading data</Text>
      <Spinner size='lg' />
    </Box>
  );
}
