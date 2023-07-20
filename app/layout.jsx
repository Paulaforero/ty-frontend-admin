'use client'

import { motion } from 'framer-motion'
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
        <body className={'h-screen w-screen'}>
          <SnackbarProvider><motion.div className='h-screen w-screen p-0 m-0' animate={{opacity: 1, animationDelay: 4}} initial={{opacity: 0}}>{children}</motion.div></SnackbarProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
