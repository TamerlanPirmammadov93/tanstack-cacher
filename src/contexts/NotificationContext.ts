import { createContext } from 'react';

import { NotificationContextType } from './Context.types';

export const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);
