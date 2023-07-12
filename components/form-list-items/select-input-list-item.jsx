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
  required,
  name,
  handleChange,
}) {
  return (
    <ListItem className="flex flex-row w-full">
      <FormControl className='w-full m-1'>
        <InputLabel
          id={`${name}-select`}
          className="items-center  w-full"
        >
          {placeholder}
        </InputLabel>
        <Select
          id={`${name}-select`}
          value={value}
          label={placeholder}
          name={name}
          required={required}
          className=" w-full text-secondary"
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
