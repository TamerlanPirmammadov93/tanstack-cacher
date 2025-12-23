import type { UseMutationOptions } from '@tanstack/react-query';

import { type CacheConfig } from '../managers';

export type MutationTypes = 'add' | 'invalidate' | 'remove' | 'update';

export interface CacheActions<TData> {
  type: MutationTypes;
  config: Omit<CacheConfig<TData, unknown>, 'queryClient'>;
}

export type CustomMutationOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & {
    notify?: boolean;
    notifyError?: boolean;
    errorMessage?: string;
    notifySuccess?: boolean;
    successMessage?: string;
    cacheActions?: CacheActions<TData>[];
    notificationConfig?: NotificationOptions;
    getErrorMessage?: (error: TError) => string;
  };

export interface NotificationOptions {
  duration?: number;
  [key: string]: any;
}
