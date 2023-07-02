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
  TableContainer,
} from '@mui/material'
import { dealerships } from '../../../mock/dealerships'
import { useState } from 'react'
import { MoreVertOutlined } from '@mui/icons-material'
import IconMenu from '@/components/menu'

export default function DealershipsPage() {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const incrementPage = () => setPage(page => page + 1)

  return (
    <Box component="main" className="w-full h-full pt-9">
      <Container
        component="container"
        className="flex flex-col justify-center items-center w-full mb-5"
      >
        <Box component="header" className="pb-4 w-full">
          <Typography
            variant="h4"
            component="h2"
            className="text-left"
            color="secondary"
          >
            Concesionarios
          </Typography>
        </Box>

        <Card
          variant="elevation"
          className="flex flex-col gap-5 px-10 py-6 w-full h-full mx-2 mb-10"
        >
          <Box component="section">
            <Typography
              variant="h5"
              component="h3"
              className="pb-2"
              color="secondary"
            >
              Filtros de busqueda
            </Typography>
            <Stack direction="row" spacing={1}>
              <Select className="flex-grow" />
              <Select className="flex-grow" />
              <Select className="flex-grow" />
            </Stack>
          </Box>

          <Divider variant="middle" />

          <Box
            component="section"
            className="flex flex-nowrap gap-2 justify-end mt-2"
          >
            <TextField
              variant="outlined"
              placeholder="Buscar por nombre..."
            ></TextField>
            <Button variant="contained" color="primary">
              Agregar concesionario
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">RIF</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Ciudad (ID)</TableCell>
                  <TableCell align="left">Manager (ID)</TableCell>
                  <TableCell align="left">Acciones</TableCell>
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
                    <TableCell align="left">{dealership.rif}</TableCell>
                    <TableCell align="left">{dealership.name}</TableCell>
                    <TableCell align="left">{dealership.city_id}</TableCell>
                    <TableCell align="left">
                      {dealership.manager_id}
                    </TableCell>
                    <TableCell align="left">
                      <IconMenu />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPage={rowsPerPage}
            count={dealerships.length}
            page={0}
            onPageChange={setPage}
          />
        </Card>
      </Container>
    </Box>
  )
}
