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
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  const [user, setUser] = useState({
    user: '',
    password: '',
  })

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault
    setLoading(true)
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
          className=" text-secondary mb-5 mt-3"
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
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignContent="center"
          >
            <TextField
              id="standard-user-input"
              label="Usuario"
              variant="standard"
              className="mb-14 mt-8"
              color="secondary"
              name="user"
              onChange={handleChange}
            />
            <FormControl variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                color="secondary"
              >
                Contraseña
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                color="secondary"
                onChange={handleChange}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      color="secondary"
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
              className="mx-12 mt-[90px]  font-semibold normal-case text-[14px]"
              color="primary"
              disabled={loading === true}
            >
              {loading ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </Grid>
        </form>
      </Grid>

      <Box className="rounded-e-full	w-[358px] h-48 fixed left-0 bottom-5 bg-primary">
        <Image
          src="/images/image_car_1.png"
          width={380}
          height={290}
          alt="car_1"
          className="absolute left-5 border-solid"
        />
      </Box>
    </>
  )
}
