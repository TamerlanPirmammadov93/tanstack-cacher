import React, { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { CacheContext, CacheContextType } from '../../contexts';
import { cacheManagerFactory } from '../../managers';

interface CacheProviderProps {
  children: ReactNode;
  config: CacheContextType;
}

export const CacheProvider = ({ config, children }: CacheProviderProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    cacheManagerFactory.setQueryClient(queryClient);
  }, [queryClient]);

  return <CacheContext.Provider value={config}>{children}</CacheContext.Provider>;
};
