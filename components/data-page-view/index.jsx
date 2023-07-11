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
import IconMenu from '@/components/data-page-view/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DataPageView({
  title,
  rows,
  columns,
  filters,
  createButtonLabel,
}) {
  const pathname = usePathname()
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
        <Card
          variant="elevation"
          className="flex flex-col gap-5 px-10 py-6 w-full h-full mx-2 mb-10"
        >
           <Box className="flex justify-between w-full">
            <Typography
              variant="h4"
              component="h2"
              className="text-left"
              color="secondary"
            >
              {title}
            </Typography>
            <Link href={pathname + '/create'}>
              <Button variant="contained" color="primary" className='pt-2 pb-2'>
                {createButtonLabel}
              </Button>
            </Link>
          </Box>
          {filters && (
            <>
              <Box component="section">
                <Typography
                  variant="h5"
                  component="h3"
                  className="pb-2"
                  color="secondary"
                >
                  Filtros de búsqueda
                </Typography>
                <Stack direction="row" spacing={1}>
                  {filters.map(filter => (
                    <FormControl fullWidth key={filter.label}>
                      <InputLabel id={filter.label} color="primary">
                        {filter.label}
                      </InputLabel>
                      <Select
                        id={filter.label}
                        className="flex-grow"
                        label={filter.label}
                        color="primary"
                      >
                        {filter.options.map(option => (
                          <MenuItem
                            value={option.value}
                            key={option.value}
                            className="text-secondary"
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columnsAttributes.map(attr => (
                    <TableCell align="left" color="primary" key={attr} className='text-secondary'>
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
                      <TableCell align="left" key={attr} className='text-secondary'>
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
