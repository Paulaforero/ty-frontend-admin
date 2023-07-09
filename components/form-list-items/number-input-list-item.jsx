import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  Typography,
} from '@mui/material'

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
  const { min, max } = inputProps
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
        <InputLabel htmlFor="standard-adornment-password">
          {placeholder}
        </InputLabel>
        <Input
          required={required}
          className="text-secondary"
          name={name}
          value={value}
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
              false
            )
          }
        />
      </FormControl>
    </ListItem>
  )
}
