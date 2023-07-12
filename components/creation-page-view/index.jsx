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

export default function CreationPage({
  title,
  submitLabel,
  inputs,
  values,
  handleSubmit,
  handleChange,
}) {
  const pathname = usePathname()
  return (
    <Box component="main" className="w-full h-full pt-9">
      <Container
        component="container"
        className="flex flex-col justify-center items-center h-full w-full mb-5"
      >
        <Box component="header" className="pb-4 w-full">
          <Link href={pathname.replace('/create', '')}>
            <IconButton size="large" color="secondary">
              <ChevronLeftIcon size="large" />
            </IconButton>
          </Link>
        </Box>

        <Box
          component="section"
          className="flex flex-row flex-grow gap-4 w-full"
        >
          <Card
            variant="elevation"
            className="flex flex-col gap-5 px-10 py-6 h-full mx-2 mb-10 flex-grow"
          >
            <Typography variant="h4" align="left" className="text-secondary">
              {title}
            </Typography>
            <Box className='flex border-2 border-solid border-gray-500/[10] rounded-lg  w-[35%] h-[110%] absolute left-1/2 transform -translate-x-1/2 ml-[53px] mt-9'/>
            <form onSubmit={handleSubmit} className='flex flex-col items-center relative'>
              {inputs.map(input =>
                input.type === 'text' ? (
                  <FormControl key={input.name} className='w-[35%] mb-[0.25rem]'>
                    <TextInputListItem
                      key={input.name}
                      name={input.name}
                      placeholder={input.placeholder}
                      handleChange={handleChange}
                      value={values[input.name]}
                      required={input.required}
                      adornment={input.adornment}
                    />
                  </FormControl>
                ) : input.type === 'number' ? (
                  <FormControl key={input.name} className='w-[35%] mb-[0.25rem]'>
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
                  <FormControl key={input.name} className= 'w-[35%] mb-[0.15rem]'>
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
