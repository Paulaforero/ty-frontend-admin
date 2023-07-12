import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  OutlinedInput,
} from '@mui/material'

export default function TextInputListItem({
  placeholder,
  name,
  value,
  required,
  adornment,
  handleChange,
}) {
  return (
    <ListItem className="flex flex-row w-full justify-center">
      <FormControl className='m-1 w-full'>
        <InputLabel htmlFor="outlined-adornment-text">{placeholder}</InputLabel>
          <OutlinedInput
            required={required ? required : false}
            className="text-secondary"
            name={name}
            value={value}
            onChange={handleChange}
            startAdornment={
              adornment ? (
                <InputAdornment position="start">{adornment}</InputAdornment>
              ) : (
                ' '
              )
            }
            label={placeholder}
          />
      </FormControl>
    </ListItem>
  )
}
