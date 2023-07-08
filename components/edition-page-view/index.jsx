'use client'

import {
  Card,
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TextInputListItem from '../form-list-items/text-input-list-item'
import SelectInputListItem from '../form-list-items/select-input-list-item'

export default function EditionPage({
  title,
  submitLabel,
  inputs,
  values,
  handleChange,
}) {
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
              {inputs.map(input =>
                input.type === 'text' ? (
                  <TextInputListItem
                    key={input.name}
                    label={input.label}
                    name={input.name}
                    placeholder={input.placeholder}
                    handleChange={handleChange}
                    value={values[input.name]}
                  />
                ) : (
                  <SelectInputListItem
                    key={input.name}
                    label={input.label}
                    placeholder={input.placeholder}
                    handleChange={handleChange}
                    options={input.options}
                    value={values[input.name]}
                    name={input.name}
                  />
                )
              )}
            </Stack>

            <Box className="mx-auto">
              <Button variant="contained" className="max-w-md">
                {submitLabel}
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
