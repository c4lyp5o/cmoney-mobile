import { useEffect, useState } from 'react';

import { useSTStore } from '../lib/Store';

import Loading from '../components/Loading';
import Exchange from '../components/Exchange';

export default function HomeScreen() {
  const { state, setState, fetchData } = useSTStore();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((json) => {
      setData(json);
    });
    setTimeout(() => {
      setState({ isLoading: false });
    }, 2000);
  }, []);

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Exchange data={data} />
    </>
  );
}
