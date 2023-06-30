'use client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Grid,
  TextField,
  Typography,
  Input,
  InputAdornment,
  IconButton,
  Button,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          className="text-secondary mb-5"
          variant="h4"
          textAlign="center"
        >
          T&Y
        </Typography>
        <Typography
          className="text-secondary mb-7"
          variant="h5"
          textAlign="center"
        >
          "Comprometidos con el ambiente"
        </Typography>
        <form>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
          >
            <TextField
              id="standard-password-input"
              label="Usuario"
              variant="standard"
              className="text-secondary mb-14 mt-8"
            />
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                className="text-secondary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      className="text-secondary"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              className="text-white mx-12 bg-primary mt-[90px]"
            >
              Iniciar sesión
            </Button>
          </Grid>
        </form>
      </Grid>
      <Box className="rounded-e-full	w-[358px] h-48 absolute left-0 bg-primary">
        <Image
          src="/images/image_car_1.png"
          width={380}
          height={290}
          alt="Carro_numero_1"
          className="absolute left-5 border-solid"
        />
      </Box>
    </>
  )
}
