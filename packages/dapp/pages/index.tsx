import { Stack, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { PrimaryButton } from '@/components/PrimaryButton';
import { useTimeDifference } from '@/hooks/useTimeDifference';
import { CLOSE_WHITELIST_TIMESTAMP } from '@/utils/constants';
import { handleError } from '@/utils/helpers';
import { confirmWhitelist } from '@/utils/requests';
import { useWallet } from '@/web3';

const Home: React.FC = () => {
  const { signature, merkleProof } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);
  const onWhitelist = useCallback(async () => {
    if (!signature) return;
    try {
      setLoading(true);
      const whitelist = await confirmWhitelist(signature);
      if (whitelist.confirmed) {
        toast.success('Whitelist confirmed!');
        setWhitelisted(true);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [signature]);

  useEffect(
    () =>
      setWhitelisted(old =>
        old ? old : !!merkleProof && merkleProof.length > 0,
      ),
    [merkleProof],
  );

  const timeLeft = useTimeDifference(CLOSE_WHITELIST_TIMESTAMP);

  return (
    <Stack align="center" p={{ base: '4', md: '16' }} spacing="8">
      <Text>Time left for Whitelist: {timeLeft}</Text>
      <PrimaryButton
        onClick={onWhitelist}
        isLoading={isLoading}
        isDisabled={!signature || whitelisted}
      >
        {whitelisted ? 'Already Whitelisted' : 'Confirm Whitelist'}
      </PrimaryButton>
    </Stack>
  );
};

export default Home;
