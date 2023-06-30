'use client'

import {
  Button,
  Select,
  Table,
  TextField,
  Divider,
  Stack,
  Card,
  Typography,
  Box,
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
} from '@mui/material'
import { dealerships } from '../../../mock/dealerships'
import { useState } from 'react'

export default function DealershipsPage() {

  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [page, setPage] = useState(0)

  const incrementPage = () => setPage(page => page + 1)

  return (
    <Container
      component="main"
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <Box component="header" className="pb-4 w-full">
        <Typography variant="h4" component="h2" className="text-left" color='secondary'>
          Concesionarios
        </Typography>
      </Box>

      <Card
        variant="elevation"
        className="flex flex-col gap-5 px-10 py-6 w-full"
      >
        <Box component="section">
          <Typography variant="h5" component="h3" className='pb-2' color='secondary'>
            Filtros de busqueda
          </Typography>
          <Stack direction="row" spacing={1} className="">
            <Select className="flex-grow" />
            <Select className="flex-grow" />
            <Select className="flex-grow" />
          </Stack>
        </Box>

        <Divider variant="middle" />

        <Box
          component="section"
          className="flex flex-nowrap gap-2 md:gap-8 justify-end"
        >
          <TextField
            variant="outlined"
            placeholder="Buscar por nombre..."
          ></TextField>
          <Button variant="contained" color="primary">
            Agregar concesionario
          </Button>
        </Box>

        <Box component="section">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>RIF</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Ciudad (ID)</TableCell>
                <TableCell align="right">Manager (ID)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? dealerships.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dealerships
              ).map(dealership => (
                <TableRow key={dealership.rif}>
                  <TableCell align="right">{dealership.rif}</TableCell>
                  <TableCell align="right">{dealership.name}</TableCell>
                  <TableCell align="right">{dealership.city_id}</TableCell>
                  <TableCell align="right">{dealership.manager_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  count={dealerships.length}
                  page={0}
                  onPageChange={setPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </Card>
    </Container>
  )
}
