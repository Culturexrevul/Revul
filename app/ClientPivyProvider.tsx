"use client"

import { PrivyProvider } from '@privy-io/react-auth'
import { ReactNode } from 'react'

export function ClientPrivyProvider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        loginMethods: ['email', 'google', 'twitter', 'discord'],
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
