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
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function EditionPage({
  id,
  title,
  submitLabel,
  inputs,
  values,
  handleSubmit,
  handleChange,
}) {
  const pathname = usePathname()
  return (
    <Box 
    component="main"
    className="w-full h-full pt-9"
    style={{
      backgroundImage: 'url(/images/background.png)',
      backgroundSize: 'cover',
    }}>
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
              <Link href={pathname.replace('/edit', '')}>
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center mb-8"
            >
              {inputs.map(input =>
                input.type === 'text' ? (
                  <FormControl
                    key={input.name}
                    className="w-[45%] mb-[0.25rem]"
                  >
                    <TextInputListItem
                      key={input.name}
                      name={input.name}
                      label={input.label}
                      handleChange={handleChange}
                      value={values[input.name]}
                      required={input.required}
                      adornment={input.adornment}
                    />
                  </FormControl>
                ) : input.type === 'number' ? (
                  <FormControl
                    key={input.name}
                    className="w-[45%] mb-[0.25rem]"
                  >
                    <NumberInputListItem
                      key={input.name}
                      label={input.label}
                      name={input.name}
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
                ) : input.type === 'email' ? (
                  <FormControl
                    key={input.name}
                    className="w-[45%] mb-[0.25rem]"
                  >
                    <TextInputListItem
                      key={input.name}
                      label={input.label}
                      name={input.name}
                      handleChange={handleChange}
                      type={input.type}
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
                  <FormControl
                    key={input.name}
                    className="w-[45%] mb-[0.15rem]"
                  >
                    <SelectInputListItem
                      key={input.name}
                      label={input.label}
                      handleChange={handleChange}
                      options={input.options}
                      value={values[input.name]}
                      name={input.name}
                      required={input.required}
                    />
                  </FormControl>
                ) 
              )}

              <Box textAlign="center" mt={4} className="mx-auto">
                <Button variant="contained" className="max-w-md" type="submit">
                  {submitLabel}
                </Button>
              </Box>
            </form>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
