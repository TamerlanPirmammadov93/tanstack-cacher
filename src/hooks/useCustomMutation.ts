import { useMutation } from '@tanstack/react-query';

import { CustomMutationOptions } from './types';
import { useNotificationContext } from './useNotificationContext';

/**
 * useCustomMutation - A type-safe wrapper around React Query's `useMutation`.
 *
 * Provides optional notifications on success or error and ensures type-safe
 * callbacks for your mutations. Supports full generics for data, error, variables,
 * and context, making it highly extendable for any API response.
 *
 * @template TData - The type of data returned by the mutation
 * @template TError - The type of error returned by the mutation (usually your API error type)
 * @template TVariables - The type of variables passed to the mutation function
 * @template TContext - The type of context for optimistic updates
 *
 * @param {CustomMutationOptions<TData, TError, TVariables, TContext>} options - Mutation options including callbacks and notification config
 * @returns {UseMutationResult<TData, TError, TVariables, TContext>} React Query mutation object enhanced with notifications
 *
 * @example
 * ```typescript
 * const mutation = useCustomMutation<User, ApiError, { id: string }>({
 *   mutationFn: (variables) => api.updateUser(variables.id),
 *   notify: true,
 *   successMessage: 'User updated successfully!',
 *   onSuccess: (data, variables, context, mutation) => {
 *     console.log('Mutation succeeded', data);
 *   },
 *   onError: (error, variables, context) => {
 *     console.error('Mutation failed', error);
 *   },
 * });
 *
 * // Trigger mutation
 * mutation.mutate({ id: '123' });
 * ```
 */

export const useCustomMutation = <TData, TError, TVariables = void, TContext = unknown>(
  options: CustomMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const {
    onError,
    onSuccess,
    notify = false,
    notifyError = false,
    notifySuccess = false,
    errorMessage = 'Operation failed!',
    successMessage = 'Operation successfull!',
    notificationConfig = { duration: 2 },
    getErrorMessage,
    ...rest
  } = options;
  const { showSuccess, showError } = useNotificationContext();

  return useMutation<TData, TError, TVariables, TContext>({
    ...rest,
    onSuccess: (data, variables, context, mutation) => {
      if (notify || notifySuccess) {
        showSuccess(successMessage, notificationConfig);
      }

      onSuccess?.(data, variables, context, mutation);
    },
    onError: (apiError, variables, context, mutation) => {
      const message = getErrorMessage
        ? getErrorMessage(apiError)
        : ((apiError as any)?.error?.message ?? errorMessage);

      if (notify || notifyError) {
        showError(message, notificationConfig);
      }

      onError?.(apiError, variables, context, mutation);
    },
  });
};
