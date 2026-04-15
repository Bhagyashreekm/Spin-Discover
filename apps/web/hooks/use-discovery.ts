import { useQuery } from '@tanstack/react-query';
import {
  fetchRandomActivity,
  fetchRandomJoke,
  fetchRandomQuote,
  fetchRandomDog,
} from '@/lib/api';

export type DiscoveryType = 'activity' | 'joke' | 'quote' | 'dog';

export function useDiscovery(type: DiscoveryType | null, enabled: boolean) {
  const activityQuery = useQuery({
    queryKey: ['activity'],
    queryFn: fetchRandomActivity,
    enabled: enabled && type === 'activity',
  });

  const jokeQuery = useQuery({
    queryKey: ['joke'],
    queryFn: fetchRandomJoke,
    enabled: enabled && type === 'joke',
  });

  const quoteQuery = useQuery({
    queryKey: ['quote'],
    queryFn: fetchRandomQuote,
    enabled: enabled && type === 'quote',
  });

  const dogQuery = useQuery({
    queryKey: ['dog'],
    queryFn: fetchRandomDog,
    enabled: enabled && type === 'dog',
  });

  if (type === 'activity') return activityQuery;
  if (type === 'joke') return jokeQuery;
  if (type === 'quote') return quoteQuery;
  if (type === 'dog') return dogQuery;

  return { data: null, isLoading: false, isError: false, refetch: () => {} };
}
