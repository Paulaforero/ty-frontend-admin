import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

export default function SelectInputListItem({ label, placeholder }) {
  return (
    <ListItem className="flex flex-row">
      <Typography variant="p" align="left" className="font-bold w-[15%]">
        {label}
      </Typography>
      <FormControl fullWidth>
        <InputLabel
          id="city-select"
          size="small"
          className="items-center ml-7 lg:ml-9 w-[95%]"
        >
          {placeholder}
        </InputLabel>
        <Select
          id="city-select"
          size="small"
          className="ml-7 lg:ml-9 w-[95%]"
          label="Seleccione una ciudad"
        >
          <MenuItem value="">{placeholder}</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  )
}
