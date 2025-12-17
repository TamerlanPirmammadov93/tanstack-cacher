import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { UseQueryResult } from '@tanstack/react-query';

import { QueryCacheManager } from '../managers';

import { type CustomQueryOptions } from './types';

/**
 * Custom React Query hook that extends the standard useQuery with optional cache management capabilities.
 *
 * @template TData - The type of data returned by the query
 * @template TError - The type of error that may be thrown (defaults to unknown)
 * @template TItem - The type of individual items in the data, must have an id property
 *
 * @param {CustomQueryOptions<TData, TError, TItem>} options - Configuration options for the query and cache
 * @param {object} [options.cacheConfig] - Configuration for the cache manager (only used if useCache is true)
 *
 * @returns {UseQueryResult<TData, TError> & { cache?: QueryCacheManager<TData, TItem> }}
 * Standard useQuery result with optional cache manager instance
 *
 * @example
 * // Without cache
 * const { data, isLoading } = useCustomQuery({
 *   queryKey: ['users'],
 *   queryFn: fetchUsers,
 * });
 *
 * // With cache
 * const { data, isLoading, cache } = useCustomQuery({
 *   queryKey: ['users'],
 *   queryFn: fetchUsers,
 *   cacheConfig: { itemsPath: 'data.users' }
 * });
 */

export function useCustomQuery<
  TData,
  TError = unknown,
  // eslint-disable-next-line
  TItem extends { id: string | number } = any,
>(
  options: CustomQueryOptions<TData, TError, TItem>,
): UseQueryResult<TData, TError> & {
  cache?: QueryCacheManager<TData, TItem>;
} {
  const { queryKey, cacheConfig, ...rest } = options;

  const queryClient = useQueryClient();

  const queryResult = useQuery<TData, TError>({
    queryKey,
    ...rest,
  });

  const cache = cacheConfig
    ? new QueryCacheManager<TData, TItem>({
        queryKey,
        queryClient,
        pagination: cacheConfig?.pagination,
        initialData: cacheConfig?.initialData,
        itemsPath: cacheConfig?.itemsPath ?? '',
        keyExtractor: cacheConfig?.keyExtractor,
      })
    : undefined;

  return {
    ...queryResult,
    cache,
  };
}
