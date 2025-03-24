'use client';
import { SessionProvider } from 'next-auth/react';
import { store } from './store';
import { Provider } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

export const ReduxProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>
          <>{children}</>
      </Provider>
    </SessionProvider>
  );
};
