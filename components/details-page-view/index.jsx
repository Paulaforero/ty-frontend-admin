'use client'

import {
  Card,
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  Stack,
  ListItem,
  Divider,
  Item,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DetailsPage({ title, toEditButtonLabel, rows, id, handleDelete }) {
  const pathname = usePathname()
  const getPreviousPage = (splittedPathname) => {
    splittedPathname.pop()
    return(splittedPathname.join('/')) 
  }

  return (
    <Box component="main" className="w-full h-full pt-9">
      <Container
        className="flex flex-col justify-center items-center h-full w-full mb-5"
      >
        <Box
          component="section"
          className="flex flex-row flex-grow gap-4 w-full"
        >
          <Card
            variant="elevation"
            className="flex flex-col gap-5 px-10 py-6 h-full mx-2 mb-10 flex-grow"
          >
            <Box component="header" className="flex pb-0 w-full">
              <Link href={getPreviousPage(pathname.split('/'))}>
                <IconButton size="large" color="secondary" className="mr-2">
                  <ChevronLeftIcon size="large" />
                </IconButton>
              </Link>
              <Typography variant="h4" align="left" className="text-secondary flex-shrink-0">
                {title}
              </Typography>
              <Typography variant="h4" align="right" className="text-secondary flex-1" style={{ wordBreak: 'break-word' }}>
                  {id}
              </Typography>
            </Box>
              {rows.map(row => (
                <Box
                  key={row.label}
                  className=" text-secondary"
                >
                  <Typography
                    variant="h6"
                    className="font-bold  text-secondary"
                  >
                    {row.label}
                  </Typography>
                  <Divider variant='fullWidth'/>
                  <Typography className="text-secondary" variant='p'>
                    {row.value}
                  </Typography>
                </Box>
              ))}

            <Box className="flex flex-row justify-center gap-6">
              <Link href={pathname + '/edit'}>
                <Button variant="contained" className="max-w-md">
                  {toEditButtonLabel}
                </Button>
              </Link>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Eliminar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
