import {
  Divider,
  ListItem,
  OrderedList,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';

import { handleError } from '@/utils/helpers';
import { fetchStatus, StatusResponse } from '@/utils/requests';

const Home: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [{ whitelists, updatedAt, merkleRoot }, setStatus] =
    useState<StatusResponse>({
      whitelists: [],
      updatedAt: new Date().toISOString(),
      merkleRoot: '',
    });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setStatus(await fetchStatus());
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Stack align="center" p={{ base: '4', md: '16' }} spacing="8">
      {!isLoading ? (
        <>
          {merkleRoot && (
            <>
              <Text>Merkle Root: {merkleRoot}</Text>
              <Text>Updated At: {new Date(updatedAt).toUTCString()}</Text>
              <Divider />
              <OrderedList>
                {whitelists.map(w => (
                  <ListItem key={w.address}>
                    <Text>{utils.getAddress(w.address)}</Text>
                  </ListItem>
                ))}
              </OrderedList>
            </>
          )}
        </>
      ) : (
        <Spinner size="xl" />
      )}
    </Stack>
  );
};

export default Home;
