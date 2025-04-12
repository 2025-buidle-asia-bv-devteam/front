import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { PrivyProvider } from '@privy-io/react-auth';
import Web3Providers from './providers/Web3Providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <PrivyProvider
    appId="cm9a85oru00cli80mcj2tl09n"
    clientId="client-WY5isvqDdykq8KAKoq36UaesNmkurXkpN22M5DfFNMCAm"
    config={{
      loginMethods: ['email', 'wallet'],
      appearance: {
        theme: 'dark',
        accentColor: '#8A2BE2',
        logo: '/logo22.png'
      },
      embeddedWallets: {
        createOnLogin: 'users-without-wallets'
      }
    }}
  >
    <BrowserRouter>
      <Web3Providers>
        <App />
      </Web3Providers>
    </BrowserRouter>
  </PrivyProvider>
);

