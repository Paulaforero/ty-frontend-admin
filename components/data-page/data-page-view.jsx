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
  TableContainer,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useState } from 'react'
import IconMenu from '@/components/data-page/menu'

export default function DataPageView({
  title,
  rows,
  columns,
  filters,
  createButtonLabel,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const columnsAttributes = Object.keys(columns)

  const handlePageChange = (event, newPage) => setPage(newPage)

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
            {title}
          </Typography>
        </Box>

        <Card
          variant="elevation"
          className="flex flex-col gap-5 px-10 py-6 w-full h-full mx-2 mb-10"
        >
          {filters && (
            <>
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
                  {filters.map(filter => (
                    <FormControl fullWidth key={filter.label}>
                      <InputLabel id={filter.label} color="secondary">
                        {filter.label}
                      </InputLabel>
                      <Select
                        id={filter.label}
                        className="flex-grow"
                        label={filter.label}
                        color="secondary"
                      >
                        {filter.options.map(option => (
                          <MenuItem
                            value={option.value}
                            key={option.value}
                            className="text-black"
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ))}
                </Stack>
              </Box>
              <Divider variant="middle" />
            </>
          )}

          <Box
            component="section"
            className="flex flex-nowrap gap-2 justify-end mt-2"
          >
            <TextField
              variant="outlined"
              placeholder="Buscar por nombre..."
            ></TextField>
            <Button variant="contained" color="primary">
              {createButtonLabel}
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columnsAttributes.map(attr => (
                    <TableCell align="left" color="primary" key={attr}>
                      {columns[attr]}
                    </TableCell>
                  ))}
                  <TableCell align="left" color="primary">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, idx) => (
                  <TableRow key={idx}>
                    {columnsAttributes.map(attr => (
                      <TableCell align="left" key={attr}>
                        {row[attr]}
                      </TableCell>
                    ))}
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
            count={rows.length}
            page={page}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
          />
        </Card>
      </Container>
    </Box>
  )
}
