import * as React from 'react';

export function useMounted(): () => boolean {
  const isMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return React.useCallback((): boolean => isMounted.current, []);
}
