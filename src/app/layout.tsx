import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'
import './globals.css'
import Provider from '@/components/Provider'
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Provider>

      <html lang="en">
        <body>{children}</body>
      </html>
      </Provider>
    </ClerkProvider>
  )
}
