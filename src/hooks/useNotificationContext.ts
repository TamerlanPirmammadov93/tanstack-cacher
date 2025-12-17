import { useContext } from 'react';

import { NotificationContext, NotificationContextType } from '../contexts';

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within an NotificationProvider');
  }
  return context;
};
