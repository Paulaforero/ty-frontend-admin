import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material'

export default function SelectInputListItem({
  label,
  value,
  options,
  required,
  name,
  handleChange,
}) {
  return (
    <ListItem className="flex flex-row w-full">
      <FormControl className='m-1 w-full'>
        <InputLabel
          id={`${name}-select`}
          className="items-center  w-full"
        >
          {label}
        </InputLabel>
        <Select
          id={`${name}-select`}
          value={value}
          label={label}
          name={name}
          required={required}
          className=" w-full text-secondary"
          onChange={handleChange}
        >
          <MenuItem value="" className="text-secondary">
            {label}
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
