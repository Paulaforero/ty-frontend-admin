<<<<<<< Updated upstream
import { FormControl, Input, InputAdornment, InputLabel, ListItem, Typography } from '@mui/material'
=======
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  OutlinedInput,
  Typography,
} from '@mui/material'
>>>>>>> Stashed changes

export default function NumberInputListItem({
  label,
  placeholder,
  name,
  value,
  required,
  adornment,
  inputProps,
  handleChange,
}) {
<<<<<<< Updated upstream
     const {min, max} = inputProps
  return (
    <ListItem className="flex flex-row w-full justify-center">
      <Typography
        variant="p"
        align="left"
        className="font-bold w-[15%] text-secondary"
      >
        {label}
      </Typography>
      <FormControl className="ml-5 w-[85%] flex-grow" variant="standard">
      <InputLabel htmlFor="standard-adornment-password">{placeholder}</InputLabel>
      <Input
        required={required}
        className="text-secondary"
        name={name}
        value={value}
        type='number'
        inputProps={{
            min: min,
            max: max,
          }}
        onChange={handleChange}
        startAdornment={ adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : false}
      />
=======
  const { min, max } = inputProps
  return (
    <ListItem className="flex flex-row w-full justify-center">
      <FormControl className='m-1 w-full'>
        <InputLabel htmlFor="standard-adornment-number">{placeholder}</InputLabel>
        <OutlinedInput
          required={required}
          className="text-secondary"
          name={name}
          value={value}
          label={placeholder}
          type="number"
          inputProps={{
            min: min,
            max: max,
          }}
          onChange={handleChange}
          startAdornment={
            adornment ? (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ) : (
              ' '
            )
          }
        />
>>>>>>> Stashed changes
      </FormControl>
    </ListItem>
  )
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
