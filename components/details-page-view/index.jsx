'use client'

import {
  Card,
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function DetailsPage({
  title,
  toEditButtonLabel,
  rows,
  id,
  handleDelete,
}) {
  const pathname = usePathname()
  const URLSearchParams = useSearchParams()

  const searchParamsIterator = URLSearchParams.entries()

  const obtainAllSearchParams = searchParamsIterator => {
    let searchParams = {}
    for (const [key, value] of searchParamsIterator) {
      searchParams = { ...searchParams, [key]: value }
    }
    return searchParams
  }

  const searchParams = obtainAllSearchParams(searchParamsIterator)

  const createSearchParamsURLSection = idAttrs => {
    const queryParams = Object.entries(idAttrs)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    return `?${queryParams}`
  }

  const getPreviousPage = splittedPathname => {
    splittedPathname.pop()
    return splittedPathname.join('/')
  }

  return (
    <Box component="main"
    className="w-full h-full pt-9"
    >
      <Container
        className="flex flex-col justify-center items-center h-full w-full mb-5"
      >
        <Box
          component="section"
          className="flex flex-row flex-grow gap-4 w-[70%]"
        >
          <Card
            className="flex flex-col gap-5 px-10 py-6 h-full mx-2 mb-10 flex-grow rounded-lg text-white text-lg bg-white bg-opacity-25 backdrop-filter backdrop-blur-md border border-gray-300 border-opacity-30"
          >
            <Box component="header" className="flex pb-0 w-full mb-7 mt-4">
              <Link href={getPreviousPage(pathname.split('/'))}>
                <IconButton size="large" color="secondary" className="mr-2">
                  <ChevronLeftIcon size="large" />
                </IconButton>
              </Link>
              <Typography
                variant="h4"
                align="left"
                className="text-secondary flex-shrink-0"
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                align="right"
                className="text-secondary flex-1"
                style={{ wordBreak: 'break-word' }}
              >
                {id}
              </Typography>
            </Box>
              {rows.map(row => (
                <Stack
                  key={row.label}
                  className=" text-secondary"
                  direction="column"
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
                </Stack>
              ))}
            <Box className="flex flex-row justify-center gap-6">
              <Link href={
                pathname.replace(/view/g, 'edit') +
                createSearchParamsURLSection(searchParams)
              }>
                <Button variant="contained" className="max-w-md mt-6">
                  {toEditButtonLabel}
                </Button>
              </Link>
              <Button variant="contained" color="error" onClick={handleDelete} className='mt-6'>
                Eliminar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
