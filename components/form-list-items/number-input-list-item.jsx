import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  OutlinedInput,
} from '@mui/material'

export default function NumberInputListItem({
  label,
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
      <FormControl className='m-1 w-full'>
        <InputLabel htmlFor="standard-adornment-number">{label}</InputLabel>
        <OutlinedInput
          required={required}
          className="text-secondary"
          name={name}
          value={value}
          label={label}
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
      </FormControl>
    </ListItem>
  )
}
