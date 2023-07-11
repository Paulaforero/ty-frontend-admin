'use client'

import {
  Card,
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  FormControl,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TextInputListItem from '../form-list-items/text-input-list-item'
import SelectInputListItem from '../form-list-items/select-input-list-item'
import NumberInputListItem from '../form-list-items/number-input-list-item'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function EditionPage({
  title,
  submitLabel,
  inputs,
  values,
  handleSubmit,
  handleChange,
}) {
  const pathname = usePathname()
  const getPreviousPage = splittedPathname => {
    splittedPathname.pop()
    splittedPathname.pop()
    return splittedPathname.join('/')
  }
  return (
    <Box component="main" className="w-full h-full pt-9">
      <Container
        component="container"
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
            <Box component="header" className="flex pb-4 w-full">
              <Link href={getPreviousPage(pathname.split('/'))}>
                <IconButton size="large" color="secondary" className="mr-2">
                  <ChevronLeftIcon size="large" />
                </IconButton>
              </Link>
              <Typography variant="h4" align="left" className="text-secondary">
                {title}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              {inputs.map(input =>
                input.type === 'text' ? (
                  <FormControl key={input.name} fullWidth margin="normal">
                    <TextInputListItem
                      key={input.name}
                      label={input.label}
                      name={input.name}
                      placeholder={input.placeholder}
                      handleChange={handleChange}
                      value={values[input.name]}
                      required={input.required}
                      adornment={input.adornment}
                    />
                  </FormControl>
                ) : input.type === 'number' ? (
                  <FormControl key={input.name} fullWidth margin="normal">
                    <NumberInputListItem
                      key={input.name}
                      label={input.label}
                      name={input.name}
                      placeholder={input.placeholder}
                      handleChange={handleChange}
                      value={values[input.name]}
                      required={input.required}
                      adornment={input.adornment}
                      inputProps={{
                        min: input.min,
                        max: input.max,
                      }}
                    />
                  </FormControl>
                ) : (
                  <FormControl key={input.name} fullWidth margin="normal">
                    <SelectInputListItem
                      key={input.name}
                      label={input.label}
                      placeholder={input.placeholder}
                      handleChange={handleChange}
                      options={input.options}
                      value={values[input.name]}
                      name={input.name}
                      required={input.required}
                    />
                  </FormControl>
                )
              )}

              <Box
                textAlign="center"
                mt={4}
                className="flex flex-row justify-center gap-6"
              >
                <Button variant="contained" className="max-w-md" type="submit">
                  {submitLabel}
                </Button>
                <Button variant="contained" color="error">
                  Cancelar
                </Button>
              </Box>
            </form>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
