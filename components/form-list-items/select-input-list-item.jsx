import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

export default function SelectInputListItem({
  label,
  placeholder,
  value,
  options,
  name,
  handleChange,
}) {
  return (
    <ListItem className="flex flex-row">
      <Typography
        variant="p"
        align="left"
        className="font-bold w-[15%] text-secondary"
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <InputLabel
          id={`${name}-select`}
          size="small"
          className="items-center ml-7 lg:ml-9 w-[95%]"
        >
          {placeholder}
        </InputLabel>
        <Select
          id={`${name}-select`}
          size="small"
          value={value}
          label={placeholder}
          name={name}
          className="ml-7 lg:ml-9 w-[95%]"
          onChange={handleChange}
        >
          <MenuItem value="" className="text-secondary">
            {placeholder}
          </MenuItem>
          {options.map(option => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="text-secondary"
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  )
}
