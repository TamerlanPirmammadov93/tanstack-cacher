import type {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { CacheConfig } from '../managers';

export type CustomQueryOptions<
  TData,
  TError = unknown,
  // eslint-disable-next-line
  TItem extends { id?: string | number } = any,
> = UseQueryOptions<TData, TError> & {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  cacheConfig?: Omit<CacheConfig<TData, TItem>, 'queryClient' | 'queryKey'>;
};

export type CustomMutationOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & {
    notify?: boolean;
    notifyError?: boolean;
    errorMessage?: string;
    notifySuccess?: boolean;
    successMessage?: string;
    notificationConfig?: NotificationOptions;
    getErrorMessage?: (error: TError) => string;
  };

export interface NotificationOptions {
  duration?: number;
  [key: string]: any;
}
