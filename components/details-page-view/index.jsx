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
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DetailsPage({ title, toEditButtonLabel, rows }) {
  const pathname = usePathname()

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
            <Typography variant="h4" align="left">
              {title}
            </Typography>

            <Stack className="w-full" margin={0} component="ul">
              {rows.map(row => (
                <ListItem
                  key={row.label}
                  className="flex flex-row w-full justify-center"
                >
                  <Typography
                    variant="p"
                    align="left"
                    className="font-bold w-[15%]"
                  >
                    {row.label}
                  </Typography>
                  <Typography className="ml-5 w-[85%] flex-grow">
                    {row.value}
                  </Typography>
                </ListItem>
              ))}
            </Stack>

            <Box className="flex flex-row justify-center gap-2">
              <Link href={pathname + '/edit'}>
                <Button variant="contained" className="max-w-md">
                  {toEditButtonLabel}
                </Button>
              </Link>
              <Button variant="contained" color="error">
                Eliminar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
