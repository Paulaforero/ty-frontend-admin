import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  Typography,
} from '@mui/material'

export default function TextInputListItem({
  label,
  placeholder,
  name,
  value,
  required,
  adornment,
  handleChange,
}) {
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
        <InputLabel htmlFor="standard-adornment-text">{placeholder}</InputLabel>
        <Input
          required={required ? required : false}
          className="text-secondary"
          name={name}
          value={value}
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
