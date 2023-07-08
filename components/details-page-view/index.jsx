'use client'

import {
  Card,
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  InputLabel,
  Input,
  Stack,
  ListItem,
  Select,
  MenuItem,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useParams } from 'next/navigation'

export default function DetailsPageView() {
  const dealership = {
    rif: 'J-123456789',
    name: 'Concesionaria A',
    city_id: 1,
    manager_id: 'M-987654321',
  }

  const { id } = useParams()

  return (
    <Box component="main" className="w-full h-full pt-9">
      <Container
        component="container"
        className="flex flex-row justify-center items-center h-full w-full mb-5"
      >
        <Box component="header" className="pb-4 w-full">
          <IconButton size="large" color="secondary">
            <ChevronLeftIcon size="large" />
          </IconButton>
        </Box>

        <Box component="section" className="flex flex-row flex-grow gap-4 w-full">
          <Card
            variant="elevation"
            className="flex flex-col gap-5 px-10 py-6 h-full mx-2 mb-10 flex-grow"
          >
            <Typography variant="h5" align="right">
              Concesionario #{id}
            </Typography>

            <Stack>
              <ListItem>
                <Typography variant="p" align="left" className="font-bold">
                  RIF:
                </Typography>
                <Input
                  placeholder="Inserte el RIF..."
                  value={dealership.rif}
                  className="ml-5"
                />
              </ListItem>
              <ListItem>
                <Typography variant="p" align="left" className="font-bold">
                  Nombre:
                </Typography>
                <Input
                  placeholder="Inserte el nombre..."
                  value={dealership.name}
                  className="ml-5"
                />
              </ListItem>
              <ListItem>
                <Typography variant="p" align="left" className="font-bold">
                  Ciudad:
                </Typography>
                <Select
                  placeholder="Selecciona la ciudad..."
                  value={dealership.city_id}
                  className="ml-5"
                >
                  <MenuItem value={dealership.city_id}>Caracas</MenuItem>
                </Select>
              </ListItem>
              <ListItem>
                <Typography variant="p" align="left" className="font-bold">
                  Manager:
                </Typography>
                <Input
                  placeholder="Inserte el ID del Manager..."
                  value={dealership.manager_id}
                  className="ml-5"
                >
                </Input>
              </ListItem>
            </Stack>
          </Card>

          <Box
            component="aside"
            className="flex flex-col gap-2 px-5 whitespace-nowrap w-[30%]"
          >
            <Button variant="contained" color="inherit">
              Editar Orden
            </Button>
            <Button variant="contained">Agregar Pago</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}