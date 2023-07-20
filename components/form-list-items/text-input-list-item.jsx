import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  OutlinedInput,
} from '@mui/material'

export default function TextInputListItem({
  label,
  name,
  value,
  required,
  adornment,
  type,
  handleChange,
}) {

  return (
    <ListItem className="flex flex-row w-full justify-center">
      <FormControl className='m-1 w-full'>
        <InputLabel htmlFor="outlined-adornment-text">{label}</InputLabel>
        <OutlinedInput
          required={required ? required : false}
          className="text-secondary"
          name={name}
          value={value}
          onChange={handleChange}
          type={type}
          startAdornment={
            adornment ? (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ) : (
              ' '
            )
          }
          label={label}
        />
      </FormControl>
    </ListItem>
  )
}
