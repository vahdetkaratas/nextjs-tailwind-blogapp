import { useCallback, useEffect, useState } from 'react';

export const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (!hasMore || isFetching) return;

    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight;

    if (scrolledToBottom) {
      setIsFetching(true);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  return [isFetching, setIsFetching] as const;
};
