'use client'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, TextField, Typography,Input,InputAdornment,IconButton} from "@mui/material";
import { useState } from "react";

export default function LoginPage(){
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
  };
    return(
        <>
            <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
            
            <Typography className="text-secondary" variant="h2" textAlign="center">T&Y</Typography>
            <Typography className="text-secondary" variant="h4" textAlign="center">"Comprometidos con el ambiente"</Typography>
            <form>
                <TextField
                label="Usuario"
                id="standard-size-normal"
                defaultValue="Normal"
                variant="standard"
                />
                 <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
            </form>
            </Grid>
        </>

    )
}