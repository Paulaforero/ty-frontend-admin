'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Grid,
  TextField,
  Typography,
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Container,
  Card,
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { TyButton } from '@/components/shared/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import WaveSVG from '@/components/svgs/wave'
import BlobSVG from '@/components/svgs/blob'
import registeredUsers from '@/data/registered-users'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function LoginPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (
        registeredUsers.reduce(
          (bUser, user) =>
            bUser || JSON.stringify(user) === JSON.stringify(userData),
          false
        )
      )
        router.push('/dashboard')
      else {
        setLoading(false)
        notify({
          message: 'Usuario o contraseña inválidos.',
          severity: 'error',
        })
      }
    }, 2000)
  }

  return (
    <Container className="h-full w-full flex flex-col justify-center items-center p-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Card className="p-8 px-14 rounded-lg text-white text-lg bg-white bg-opacity-25 backdrop-filter backdrop-blur-md border border-gray-300 border-opacity-30">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="pb-14"
          >
            <Typography
              className=" text-white mb-5 mt-3"
              variant="h4"
              textAlign="center"
            >
              T&Y
            </Typography>
            <Typography
              className="text-white mb-7"
              variant="h5"
              textAlign="center"
            >
              &ldquo;Comprometidos con el ambiente&rdquo;
            </Typography>
            <form onSubmit={handleSubmit} className="text-white">
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
                  color="white"
                  name="username"
                  onChange={handleChange}
                />
                <FormControl variant="filled" color="white">
                  <InputLabel
                    htmlFor="standard-adornment-password"
                    color="white"
                    className="text-white"
                  >
                    Contraseña
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    color="white"
                    onChange={handleChange}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          color="white"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TyButton
                  type="submit"
                  className="mx-12 mt-[90px]"
                  disabled={loading === true}
                  label="Iniciar Sesión"
                  size="medium"
                  loading={loading}
                ></TyButton>
              </Grid>
            </form>
          </Grid>
        </Card>
      </motion.div>

      <motion.div
        className="w-[358px] h-48 fixed left-0 bottom-5 z-10"
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.3 }}
      >
        <Image
          src="/images/image_car_1.png"
          width={380}
          height={290}
          alt="car_1"
          className="relative left-5 border-solid"
        />
      </motion.div>

      <motion.div
        className="fixed w-full -bottom-3 p-0 m-0 -z-20"
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ bounce: false, duration: 1.3 }}
      >
        <WaveSVG />
      </motion.div>

      <motion.div className="absolute w-screen h-screen -z-30 opacity-60">
        <Image
          src="/images/background1.png"
          fill={true}
          quality={100}
          alt="background"
        />
      </motion.div>

      <motion.div
        className="fixed w-[1000px] h-[700px] top-48 -bottom-52 -mt-44 -z-10"
        initial={{ scale: 0, rotate: 100 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.3, delay: 1.3, type: 'spring' }}
      >
        <BlobSVG />
      </motion.div>
    </Container>
  )
}
