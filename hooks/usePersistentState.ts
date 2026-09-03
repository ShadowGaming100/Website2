'use client';

import { useEffect, useState } from 'react';

// Shared mount-hydrate + persist pattern (was copy-pasted in
// FavoritesContext, ConsentContext, ComparisonContext).
export function usePersistentState<T>(
  initial: T,
  load: () => T,
  save?: (value: T) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    save?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
}
