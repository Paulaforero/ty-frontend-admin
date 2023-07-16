'use client'

import { ThemeProvider } from '@mui/material'
import './globals.css'

import { theme } from '@/lib/theme'
import { SnackbarProvider } from '@/contexts/snackbar'

export const metadata = {
  title: 'T&Y Admin Panel',
  description: 'Panel de administración de la empresa de concesionarios T&Y',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <ThemeProvider theme={theme}>
        <body className={'h-screen w-screen overflow-x-hidden'}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
