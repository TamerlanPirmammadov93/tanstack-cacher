import { NotificationOptions } from '../hooks/types';

export interface NotificationContextType {
  showSuccess: (message: string, options?: NotificationOptions) => void;
  showError: (message: string, options?: NotificationOptions) => void;
}
