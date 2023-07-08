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
  FormControl,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useParams } from 'next/navigation'

export default function EditionPageView() {
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
        className="flex flex-col justify-center items-center h-full w-full mb-5"
      >
        <Box component="header" className="pb-4 w-full">
          <IconButton size="large" color="secondary">
            <ChevronLeftIcon size="large" />
          </IconButton>
        </Box>

        <Box
          component="section"
          className="flex flex-row flex-grow gap-4 w-full"
        >
          <Card
            variant="elevation"
            className="flex flex-col gap-5 px-10 py-6 h-full mx-2 mb-10 flex-grow"
          >
            <Typography variant="h5" align="right">
              Concesionario #{id}
            </Typography>

            <Stack className="w-full" margin={0} component="ul">
              <ListItem className="flex flex-row w-full justify-center">
                <Typography variant="p" align="left" className="font-bold w-[15%]">
                  RIF:
                </Typography>
                <Input
                  placeholder="Inserte el RIF..."
                  value={dealership.rif}
                  className="ml-5 w-[85%] flex-grow"
                />
              </ListItem>
              <ListItem className="flex flex-row w-full justify-center">
                <Typography variant="p" align="left" className="font-bold w-[15%]">
                  Nombre:
                </Typography>
                <Input
                  placeholder="Inserte el nombre..."
                  value={dealership.name}
                  className="ml-5 w-[85%] flex-grow"
                />
              </ListItem>
              <ListItem className="flex flex-row w-full justify-center"> 
                <Typography variant="p" align="left" className="font-bold w-[15%]">
                  Ciudad:
                </Typography>
                <FormControl fullWidth>
                  <InputLabel
                    id="city-select"
                    size="small"
                    className="items-center ml-7 lg:ml-9 w-[95%]"
                  >
                    Seleccione una ciudad
                  </InputLabel>
                  <Select
                    id="city-select"
                    size="small"
                    className="ml-7 lg:ml-9 w-[95%]"
                    label="Seleccione una ciudad"
                  >
                    <MenuItem value="">Nada</MenuItem>
                    <MenuItem value={1}>Caracas</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem className="flex flex-row w-full justify-center">
                <Typography variant="p" align="left" className="font-bold w-[15%]">
                  Manager:
                </Typography>
                <Input
                  placeholder="Inserte el ID del Manager..."
                  value={dealership.manager_id}
                  className="ml-5 w-[85%] flex-grow"
                ></Input>
              </ListItem>
            </Stack>
            <Box className="mx-auto">
              <Button variant="contained" className="max-w-md">
                Editar Concesionario
              </Button>
            </Box>
          </Card>
        </Box>

      </Container>
    </Box>
  )
}