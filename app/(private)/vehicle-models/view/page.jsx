'use client'
import { Container, Box, Card, Typography, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Link from 'next/link'

export default function VehicleModelViewPage() {
  return (
    <Box component="main" className="w-full h-full pt-9">
      <Container
        component="container"
        className="flex flex-col justify-center items-center w-full mb-5"
      >
        <Box
          component="header"
          className="pb-4 w-full"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Link key={'DataPageModels'} href={'/vehicle-models'}>
            <IconButton color="secondary" className="mr-2">
              <ChevronLeftIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h4"
            component="h2"
            className="text-left"
            color="secondary"
          >
            Modelos de vehículos
          </Typography>
        </Box>
        <Card
          variant="elevation"
          className="flex flex-col gap-5 px-10 py-6 w-full h-full mx-2 mb-10"
        >
          <Typography variant="h5">hola</Typography>
        </Card>
      </Container>
    </Box>
  )
}
