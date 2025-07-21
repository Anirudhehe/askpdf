import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'
import './globals.css'
import Provider from '@/components/Provider'
import {Toaster} from 'react-hot-toast'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Provider>

      <html lang="en">
        <body>{children}</body>
      <Toaster/>
      </html>
      </Provider>
    </ClerkProvider>
  )
}
