import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Shared loading/error/data plumbing for screens that fetch through
 * `marketplaceService`. Avoids re-implementing the same three `useState`
 * calls on every screen.
 */
export function useAsyncData<T>(fetcher: () => Promise<T>, deps: ReadonlyArray<unknown> = []) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  const requestId = useRef(0);

  const run = useCallback(() => {
    const currentRequestId = ++requestId.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (requestId.current === currentRequestId) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (requestId.current === currentRequestId) {
          setState({ data: null, loading: false, error: error.message || 'Something went wrong' });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, retry: run };
}
