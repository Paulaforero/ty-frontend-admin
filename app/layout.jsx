'use client'

import { ThemeProvider } from '@mui/material'
import './globals.css'

import { Inter } from 'next/font/google'
import { theme } from '@/lib/theme'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'T&Y Admin Panel',
  description: 'Panel de administración de la empresa de concesionarios T&Y',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <ThemeProvider theme={theme}>
        <body className={inter.className + ' h-screen w-screen'}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
